import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ServicesGrid from '../components/ServicesGrid';
import Footer from '../components/Footer';
import heroImage from '../assets/hero-bg.jfif';

export default function Home() {
  const { t } = useTranslation();

  // REFS POUR LES ANIMATIONS DE SCROLL
  const processRef = useRef(null);
  const featuresRef = useRef(null);

  // CONFIGURATION DU SCROLL (Correction hydratation)
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  const scaleX = useSpring(processScroll, { stiffness: 100, damping: 30 });

  const { scrollYProgress: featuresScroll } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(featuresScroll, [0, 0.35], [90, 0]);
  const opacity = useTransform(featuresScroll, [0, 0.3], [0, 1]);

  const teamMembers = [
    { id: 1, name: "Marc Dupont", role: "team.role_expert", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" },
    { id: 2, name: "Sophie Martin", role: "team.role_supervisor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
    { id: 3, name: "Jean Morel", role: "team.role_glass", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400" },
    { id: 4, name: "Léa Bernard", role: "team.role_client", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" },
    { id: 5, name: "Thomas Klein", role: "team.role_agent", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-[#fafaf5]">

      {/* SECTION 1 : HERO */}
      <section className="relative h-[85vh] flex items-center px-6 lg:px-24 bg-[#001f3f]">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001f3f] via-[#001f3f]/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-3xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
          >
            {t('home.hero.title_part1')} <br />
            <span className="text-yellow-400">{t('home.hero.title_part2')}</span>
          </motion.h1>
          <p className="mt-8 text-xl text-gray-200 max-w-lg font-medium">{t('home.hero.subtitle')}</p>
          <Link to="/services" className="mt-10 inline-block bg-yellow-400 text-[#001f3f] px-12 py-5 rounded-full font-black uppercase shadow-2xl hover:scale-105 transition-transform">
            {t('home.hero.cta')}
          </Link>
        </div>
      </section>

      {/* SECTION 2 : SERVICES */}
      <ServicesGrid />

      {/* SECTION 3 : TEAM (STYLE PANORAMIQUE) */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="text-center mb-20 px-6">
          <h2 className="text-4xl md:text-6xl font-black text-[#001f3f] uppercase italic">{t('team.title')}</h2>
          <p className="text-yellow-600 font-bold uppercase tracking-widest mt-2">{t('team.subtitle')}</p>
        </div>
        <div className="flex">
          <motion.div
            className="flex gap-8 px-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...teamMembers, ...teamMembers].map((member, idx) => (
              <div key={idx} className="flex-shrink-0 w-[280px]">
                <div className="h-[400px] rounded-[50px] overflow-hidden shadow-2xl relative group">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001f3f] to-transparent opacity-60"></div>
                </div>
                <div className="mt-6 text-center">
                  <h4 className="text-xl font-black text-[#001f3f] uppercase italic">{member.name}</h4>
                  <p className="text-yellow-500 font-bold text-sm uppercase">{t(member.role)}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 : COMMENT ÇA MARCHE ? (RÉTABLIE ET CORRIGÉE) */}
      <section ref={processRef} className="relative py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-[#001f3f] uppercase italic">
              {t('process.title', 'Comment ça marche ?')}
            </h2>
            <div className="flex justify-center mt-6">
              <motion.div style={{ scaleX }} className="h-2 w-48 bg-yellow-400 rounded-full origin-left" />
            </div>
          </div>
          <Link to="/services">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
            {/* Ligne Desktop */}
            <div className="absolute top-24 left-0 w-full h-1 bg-gray-200 hidden lg:block -z-0">
              <motion.div style={{ scaleX }} className="h-full bg-yellow-400 origin-left" />
            </div>

            {[
              { id: 1, title: 'process.step1_title', text: 'process.step1_text', img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=400" },
              { id: 2, title: 'process.step2_title', text: 'process.step2_text', img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=400" },
              { id: 3, title: 'process.step3_title', text: 'process.step3_text', img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400" }
            ].map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-400 group-hover:rotate-180 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-2 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                    <img src={step.img} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-[#001f3f] font-black shadow-lg border-4 border-white">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#001f3f] uppercase italic mb-4">{t(step.title)}</h3>
                <p className="text-gray-500 font-medium max-w-xs">{t(step.text)}</p>
              </motion.div>
            ))}
          </div>
          </Link>
        </div>
      </section>

      {/* SECTION 5 : FEATURES (3D LIFT) */}
      <div style={{ perspective: "2000px" }} className="bg-white">
        <motion.section
          ref={featuresRef}
          style={{ rotateX, opacity }}
          className="relative py-24 px-6 lg:px-24 bg-[#001f3f] text-white rounded-t-[60px] z-20 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-md">
                <div className="text-5xl text-yellow-400 font-black mb-6">0{i}</div>
                <h3 className="text-2xl font-bold uppercase mb-4">{t(`features.f${i}_title`)}</h3>
                <p className="text-gray-400 font-medium">{t(`features.f${i}_text`)}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}