import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ServicesGrid() {
    const { t } = useTranslation();

    const categories = [
        {
            id: 1,
            title: t('services.cat_home'),
            image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop",
            delay: 0 // Délais différents pour l'effet "aléatoire"
        },
        {
            id: 2,
            title: t('services.cat_office'),
            image: "https://plus.unsplash.com/premium_photo-1678297270523-8775c817d0b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWF0ZWxhc3xlbnwwfHwwfHx8MA%3D%3D",
            delay: 0.5
        },
        {
            id: 3,
            title: t('services.cat_vehicle'),
            image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGN1aXNpbmV8ZW58MHx8MHx8fDA%3D",
            delay: 0.2
        },
        {
            id: 4,
            title: t('services.cat_special'),
            image: "https://media.istockphoto.com/id/1007084506/fr/photo/coussins-jaunes-et-couverture-sur-gris-canap%C3%A9-de-salon-moderne-int%C3%A9rieur-avec-des-plantes-et.webp?a=1&b=1&s=612x612&w=0&k=20&c=_scfVKVMuXpbeJYSPEy0sqUdtSy_Csy_omGhhfdSVnE=",
            delay: 0.7
        },
        
    ];

    return (
        <section className="py-20 px-6 lg:px-24 bg-white overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-[#001f3f] uppercase italic tracking-tighter">
                    {t('services.title')}
                </h2>
                <p className="text-gray-500 mt-4 text-lg">{t('services.subtitle')}</p>
            </div>

            <Link to="/services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-center">
                {categories.map((cat, index) => (
                    
                    <motion.div
                        key={cat.id}
                        // EFFET GRAVITY FLOATING
                        animate={{
                            y: [0, -20, 0],
                            rotate: [index % 2 === 0 ? -1 : 1, index % 2 === 0 ? 1 : -1, index % 2 === 0 ? -1 : 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: cat.delay
                        }}
                        // SE FIGE ET S'ALIGNE AU SURVOL
                        whileHover={{
                            y: 0,
                            rotate: 0,
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                        className="group relative h-96 overflow-hidden rounded-[40px] shadow-xl cursor-pointer bg-[#001f3f]"
                    >
                           
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#001f3f] via-[#001f3f]/20 to-transparent"></div>

                        <div className="absolute bottom-8 left-8 right-8 text-center">
                            <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">
                                {cat.title}
                            </h3>
                            <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full transition-all duration-500 group-hover:w-full"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
            </Link>
            
        </section>
    );
}