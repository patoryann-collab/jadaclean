import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function About() {
    const { t } = useTranslation();

    const images = {
        hero: "https://plus.unsplash.com/premium_photo-1667520405114-47d3677f966e?q=80&w=870&auto=format&fit=crop",
        equipment: "https://images.unsplash.com/photo-1765970101654-337b573142fb?q=80&w=870&auto=format&fit=crop",
        team: "https://images.unsplash.com/photo-1556911223-e1534ff6f922?q=80&w=2070&auto=format&fit=crop",
        office: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    };

    // Configuration des animations réutilisables
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow bg-[#fafaf5] pt-32 pb-20 px-6 text-[#001f3f] overflow-hidden">
                <div className="max-w-6xl mx-auto">

                    {/* SECTION 1: HERO - Entrée Dramatique */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-32"
                    >
                        <motion.span variants={fadeInUp} className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500 mb-4 block italic">
                            {t('nav.about')}
                        </motion.span>
                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-12 leading-none">
                            {t('about.title')}
                        </motion.h1>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.p variants={fadeInUp} className="text-xl font-bold text-gray-500 leading-relaxed text-left border-l-4 border-yellow-500 pl-6">
                                {t('about.description')}
                            </motion.p>
                            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} className="relative">
                                <img src={images.hero} alt="Quality" className="rounded-[3rem] shadow-2xl h-96 w-full object-cover" />
                                <div className="absolute inset-0 rounded-[3rem] ring-1 ring-black/5" />
                            </motion.div>
                        </div>
                    </motion.section>

                    {/* SECTION 2: TECH - Apparition Latérale */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="mb-32 bg-white p-8 md:p-16 rounded-[4rem] shadow-sm border border-gray-100"
                    >
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <motion.div 
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="order-2 md:order-1"
                            >
                                <img src={images.equipment} alt="Equipment" className="rounded-[2.5rem] shadow-lg h-80 w-full object-cover" />
                            </motion.div>
                            <div className="order-1 md:order-2 space-y-8">
                                <motion.h2 variants={fadeInUp} className="text-4xl font-black italic uppercase">{t('about.tech.title')}</motion.h2>
                                <motion.p variants={fadeInUp} className="font-bold text-gray-600 text-lg leading-relaxed">{t('about.tech.content')}</motion.p>
                                <motion.ul variants={staggerContainer} className="space-y-4">
                                    {[t('about.tech.karcher'), t('about.tech.hepa'), t('about.tech.eco')].map((item, i) => (
                                        <motion.li key={i} variants={fadeInUp} className="flex items-center text-sm font-black uppercase text-yellow-600 italic bg-yellow-50 p-3 rounded-xl">
                                            <span className="mr-3">✦</span> {item}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* SECTION 3: SÉCURITÉ - Effet de zoom */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-32 grid md:grid-cols-3 gap-8"
                    >
                        <motion.div variants={fadeInUp} className="md:col-span-2 bg-white p-12 rounded-[3rem] border border-gray-100 flex flex-col justify-center">
                            <h2 className="text-4xl font-black italic uppercase mb-6">{t('about.safety.title')}</h2>
                            <p className="font-bold text-gray-600 text-lg">{t('about.safety.content')}</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -10, rotate: -2 }}
                            className="bg-yellow-500 p-12 rounded-[3rem] flex flex-col justify-center items-center text-white italic shadow-xl"
                        >
                            <motion.h3 initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", stiffness: 100 }} className="text-7xl font-black mb-2">100%</motion.h3>
                            <p className="text-xs font-black uppercase tracking-widest text-center">{t('about.stats.trust')}</p>
                        </motion.div>
                    </motion.section>

                    {/* SECTION 4: SERVICES - Reveal au scroll */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-32 grid md:grid-cols-2 gap-16 items-center"
                    >
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                            <img src={images.office} alt="Office" className="rounded-[3.5rem] shadow-2xl h-[500px] w-full object-cover" />
                        </motion.div>
                        <motion.div variants={staggerContainer} className="space-y-8">
                            <motion.h2 variants={fadeInUp} className="text-4xl font-black italic uppercase">{t('about.services_detail.title')}</motion.h2>
                            <motion.p variants={fadeInUp} className="font-bold text-gray-600 text-lg leading-relaxed">{t('about.services_detail.content')}</motion.p>
                            <div className="grid grid-cols-2 gap-6">
                                <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm italic text-center">
                                    <span className="block text-4xl font-black text-yellow-500 mb-2">RES</span>
                                    <span className="text-[10px] font-black uppercase text-gray-400">{t('about.services_detail.res')}</span>
                                </motion.div>
                                <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm italic text-center">
                                    <span className="block text-4xl font-black text-yellow-500 mb-2">COM</span>
                                    <span className="text-[10px] font-black uppercase text-gray-400">{t('about.services_detail.com')}</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.section>

                    {/* SECTION 5: AWARD - Final Épique */}
                    <motion.section 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center p-20 bg-[#001f3f] rounded-[4rem] text-white relative overflow-hidden"
                    >
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"
                        />
                        <h2 className="text-5xl font-black italic uppercase mb-8 relative z-10">{t('about.award.title')}</h2>
                        <p className="text-xl font-bold mb-12 text-blue-100 opacity-80 max-w-2xl mx-auto relative z-10">
                            {t('about.award.content')}
                        </p>
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="inline-block border-2 border-yellow-500 px-10 py-5 rounded-full font-black italic tracking-[0.2em] text-yellow-500 uppercase relative z-10"
                        >
                            {t('about.stats.recognition')}
                        </motion.div>
                    </motion.section>

                </div>
            </main>
            <Footer />
        </div>
    );
}