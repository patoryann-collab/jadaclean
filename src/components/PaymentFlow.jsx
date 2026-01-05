import { useState } from 'react';
import { useTranslation } from 'react-i18next'; //
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { supabase } from '../supabaseClient';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

export default function PaymentFlow({ amount, serviceName, serviceId, onClose }) {
  const { t } = useTranslation(); //
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  
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
      alert(t('payment.error_redirect')); // Utilisation de la traduction
    }
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative max-w-lg w-full">
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 z-10">
        <CloseIcon />
      </button>

      {step === 1 ? (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-2xl font-black text-[#001f3f] mb-2 italic uppercase">{t('payment.info_title')}</h2>
          <p className="text-gray-400 text-xs mb-8 font-bold uppercase tracking-widest">{t('payment.info_subtitle')}</p>
          
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="relative">
              <PersonIcon className="absolute left-4 top-4 text-yellow-500" sx={{ fontSize: 20 }} />
              <input 
                required 
                className="w-full pl-12 p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm" 
                placeholder={t('payment.fullname')} 
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              />
            </div>
            <div className="relative">
              <PhoneIcon className="absolute left-4 top-4 text-yellow-500" sx={{ fontSize: 20 }} />
              <input 
                required 
                className="w-full pl-12 p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm" 
                placeholder={t('payment.phone')} 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="relative">
              <LocationOnIcon className="absolute left-4 top-4 text-yellow-500" sx={{ fontSize: 20 }} />
              <textarea 
                required 
                className="w-full pl-12 p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm h-24" 
                placeholder={t('payment.address')} 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            
            <button type="submit" className="w-full py-5 bg-[#001f3f] text-white rounded-2xl font-black uppercase italic tracking-widest hover:bg-yellow-500 transition-all shadow-xl mt-4">
              {t('payment.continue')}
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="animate-in fade-in duration-500 text-center">
          <h2 className="text-2xl font-black text-[#001f3f] mb-6 italic uppercase">
            {t('payment.pay_title', { amount: amount })}
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button onClick={() => setPaymentMethod('stripe')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'stripe' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-100'}`}>
              <CreditCardIcon sx={{ fontSize: 32 }} />
              <span className="font-black uppercase text-[10px]">{t('payment.method_card')}</span>
            </button>
            <button onClick={() => setPaymentMethod('paypal')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'paypal' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-100'}`}>
              <span className="font-black text-blue-600 uppercase text-[10px]">{t('payment.method_paypal')}</span>
            </button>
          </div>

          {paymentMethod === 'stripe' && (
            <button onClick={handleStripe} className="w-full py-4 bg-[#001f3f] text-white rounded-2xl font-black uppercase italic">
              {t('payment.proceed')}
            </button>
          )}

          {/* PayPal Buttons... */}
          
          <button onClick={() => setStep(1)} className="w-full mt-4 text-[10px] font-black uppercase text-gray-400 hover:text-[#001f3f]">
            {t('payment.back')}
          </button>
        </div>
      )}
    </div>
  );
}