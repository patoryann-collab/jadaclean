import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

// Indispensable pour l'environnement Edge Functions de Supabase
const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) return new Response("Signature manquante", { status: 400 });

  const body = await req.text();
  
  try {
    const event = await stripe.webhooks.constructEventAsync(
      body, 
      signature, 
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      cryptoProvider
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );

      // RÉCUPÉRATION DES DONNÉES DEPUIS LES METADATA (Formulaire JadaClean)
      // On récupère les infos que tu as envoyées via PaymentFlow.jsx
      const { serviceName, phone, address, customerName } = session.metadata || {};
      
      const amountPaid = session.amount_total ? session.amount_total / 100 : 0;

      const { error } = await supabase.from('orders').insert({
        service_name: serviceName || 'Service inconnu',
        client_email: session.customer_details?.email,
        amount: session.amount_total / 100,
        status: 'Payé',
        stripe_session_id: session.id,
        phone: phone || 'Non renseigné',
        address: address || 'Adresse non spécifiée',
        customer_name: customerName // Ajoute cette ligne pour enregistrer le nom !
      });

      if (error) {
        console.error("Erreur insertion base de données :", error.message);
        throw error;
      }
      
      console.log(`Succès : Commande de ${amountPaid} LEI pour ${serviceName} enregistrée.`);
    }

    return new Response(JSON.stringify({ received: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error(`Erreur Webhook: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
})