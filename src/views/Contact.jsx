import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

// Import des Icônes Material UI
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Contact() {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('contact.success'));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-[#fafaf5] pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Section Infos avec Icônes MUI */}
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500 mb-4 block italic"
            >
              {t('contact.getInTouch')}
            </motion.span>
            
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-6xl font-black text-[#001f3f] uppercase italic tracking-tighter mb-8 leading-none"
            >
              {t('contact.title')}
            </motion.h1>

            <div className="space-y-8 text-[#001f3f] mt-12 font-black italic">
              {/* Adresse */}
              <div className="flex items-center gap-5 group">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:bg-yellow-400 transition-colors">
                  <LocationOnIcon className="text-[#001f3f]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Location</p>
                  <p className="text-xl">123 Rue de la Propreté, Paris</p>
                </div>
              </div>
              
              {/* Téléphone */}
              <div className="flex items-center gap-5 group">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:bg-yellow-400 transition-colors">
                  <PhoneInTalkIcon className="text-[#001f3f]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Phone</p>
                  <p className="text-xl text-yellow-500">+33 1 23 45 67 89</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-5 group">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:bg-yellow-400 transition-colors">
                  <AlternateEmailIcon className="text-[#001f3f]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Email</p>
                  <p className="text-xl underline">contact@jadaclean.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">{t('contact.name')}</label>
                <input required type="text" className="w-full p-5 bg-gray-50 rounded-2xl border-none font-bold text-[#001f3f] focus:ring-2 focus:ring-yellow-500 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">{t('contact.email')}</label>
                <input required type="email" className="w-full p-5 bg-gray-50 rounded-2xl border-none font-bold text-[#001f3f] focus:ring-2 focus:ring-yellow-500 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">{t('contact.message')}</label>
                <textarea required rows="4" className="w-full p-5 bg-gray-50 rounded-2xl border-none font-bold text-[#001f3f] focus:ring-2 focus:ring-yellow-500 outline-none resize-none transition-all"></textarea>
              </div>

              <button type="submit" className="w-full py-6 bg-[#001f3f] text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-[#001f3f] transition-all flex items-center justify-center gap-3 shadow-lg">
                <SendIcon sx={{ fontSize: 18 }} /> {t('contact.send')}
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}