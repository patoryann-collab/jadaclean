import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

export default function PaymentFlow({ amount, serviceName, serviceId, onClose }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: ''
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStripe = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          serviceId, 
          serviceName, 
          price: amount,
          customerName: formData.customerName,
          phone: formData.phone,
          address: formData.address
        }
      });

      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.error('Erreur Stripe:', err);
      alert(t('payment.error_message') || "Erreur lors de l'initialisation du paiement.");
    } finally {
      setLoading(false);
    }
  };
  const handlePhoneChange = (e) => {
  // 1. On récupère la valeur saisie
  let value = e.target.value;

  // 2. On autorise le '+' uniquement s'il est au début, et on garde les chiffres
  // Cette règle supprime tout ce qui n'est pas chiffre ou '+'
  value = value.replace(/[^\d+]/g, "");

  // 3. Sécurité : On s'assure que le '+' ne peut être qu'à l'index 0
  if (value.indexOf('+') > 0) {
    value = value.substring(0, value.indexOf('+')) + value.substring(value.indexOf('+') + 1).replace(/\+/g, "");
  }

  setFormData({ ...formData, phone: value });
};

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl relative border border-gray-100 overflow-hidden">
      {/* Bouton Fermer */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#001f3f] transition-colors"
      >
        <CloseIcon />
      </button>

      {/* État de progression */}
      <div className="flex justify-center gap-2 mb-10">
        <div className={`h-1.5 w-12 rounded-full ${step >= 1 ? 'bg-yellow-400' : 'bg-gray-100'}`} />
        <div className={`h-1.5 w-12 rounded-full ${step >= 2 ? 'bg-yellow-400' : 'bg-gray-100'}`} />
      </div>

      {step === 1 ? (
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="w-full"
        >
          <h2 className="text-3xl font-black text-[#001f3f] mb-2 uppercase italic tracking-tighter text-center">
            {t('payment.info_title')}
          </h2>
          <p className="text-gray-400 text-sm font-medium mb-8 text-center uppercase tracking-widest">
            {serviceName} • {amount} RON
          </p>
          
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="relative">
              <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 !text-xl" />
              <input
                type="text" required placeholder={t('contact.name')}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-yellow-500"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
            </div>
            
            <div className="relative">
              <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 !text-xl" />
              <input
                type="text" 
                required 
                placeholder="Phone (ex: +40...)"
                inputMode='tel'
                pattern="[\+0-9]*"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-yellow-500"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="relative">
              <LocationOnIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 !text-xl" />
              <input
                type="text" required placeholder="Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-yellow-500"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            
            <button type="submit" className="w-full py-5 bg-[#001f3f] text-white rounded-[1.5rem] font-black uppercase italic tracking-widest hover:bg-yellow-500 transition-all shadow-lg mt-4">
              {t('payment.continue')}
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center text-center w-full"
        >
          <h2 className="text-3xl font-black text-[#001f3f] mb-8 uppercase italic tracking-tighter">
            {t('payment.pay_title', { amount: amount })}
          </h2>
          
          <div className="w-full max-w-sm mb-10">
            <button 
              onClick={() => setPaymentMethod('stripe')} 
              className={`w-full p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${paymentMethod === 'stripe' ? 'border-yellow-500 bg-yellow-50 shadow-inner' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <CreditCardIcon sx={{ fontSize: 48, color: paymentMethod === 'stripe' ? '#eab308' : '#001f3f' }} />
              <span className="font-black uppercase text-xs tracking-widest text-[#001f3f]">
                {t('payment.method_card')}
              </span>
            </button>
          </div>

          <div className="w-full">
            <button 
              onClick={handleStripe} 
              disabled={!paymentMethod || loading}
              className={`w-full py-5 rounded-[1.5rem] font-black uppercase italic tracking-widest transition-all shadow-xl ${paymentMethod ? 'bg-[#001f3f] text-white hover:bg-yellow-500' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
            >
              {loading ? t('login.loading') : t('payment.pay_now')}
            </button>
            
            <button 
              onClick={() => setStep(1)}
              className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#001f3f] transition-colors"
            >
              ← {t('payment.back_to_info') || 'Înapoi'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}