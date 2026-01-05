import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Gestion des requêtes CORS (indispensable pour React)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error("Clé STRIPE_SECRET_KEY manquante");

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // RÉCUPÉRATION : On récupère maintenant TOUS les champs envoyés par PaymentFlow.jsx
    const { 
      serviceId, 
      serviceName, 
      price, 
      customerName, 
      phone, 
      address 
    } = await req.json();

    // 2. Création de la session Stripe avec les Metadata complètes
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
          price_data: {
            currency: 'ron',
            product_data: { name: serviceName },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
      }],
      mode: 'payment',
      // CES METADATA SONT ESSENTIELLES : Elles seront lues par le webhook plus tard
      metadata: {
        serviceName: serviceName,
        serviceId: serviceId,
        customerName: customerName, // Nom du client
        phone: phone,               // Téléphone du formulaire
        address: address            // Adresse du formulaire
      },
      success_url: `${req.headers.get('origin')}/success?service=${encodeURIComponent(serviceName)}&name=${encodeURIComponent(customerName)}`,
      cancel_url: `${req.headers.get('origin')}/services?canceled=true`,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 200 
      }
    )

  } catch (error) {
    console.error("Erreur Checkout Session:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      }
    )
  }
})