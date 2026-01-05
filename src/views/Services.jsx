import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import des Icônes
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Footer from '../components/Footer';
import PaymentFlow from '../components/PaymentFlow';

export default function Services() {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    // État pour gérer l'ouverture du modal de paiement
    const [bookingService, setBookingService] = useState(null);

    useEffect(() => { 
        fetchData(); 
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const { data: s } = await supabase.from('services').select('*');
        const { data: c } = await supabase.from('categories').select('*');
        setServices(s || []);
        setCategories(c || []);
        setLoading(false);
    };

    const handleBookingClick = async (service) => {
        //const { data: { session } } = await supabase.auth.getSession();
        
        // Vérification de connexion avant de proposer le paiement
        //if (!session) { 
        //    navigate('/login'); 
        //    return; 
        //}

        // Au lieu d'appeler l'Edge Function immédiatement, on ouvre le modal de choix
        setBookingService(service);
    };

    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(s => s.category_id === selectedCategory);

    return (
        <div className="flex flex-col min-h-screen bg-[#fafaf5]">
            <main className="flex-grow pt-28 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    
                    {/* FILTRES DE CATÉGORIES */}
                    <div className="flex flex-wrap gap-4 mb-12 items-center overflow-x-auto pb-4">
                        <button 
                            onClick={() => setSelectedCategory('all')} 
                            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === 'all' ? 'bg-[#001f3f] text-white' : 'bg-white text-gray-400'}`}
                        >
                            {t('services.all', 'Tous')}
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-[#001f3f] text-white' : 'bg-white text-gray-400'}`}
                            >
                                {cat.name_i18n?.[i18n.language] || cat.name_i18n?.ro || cat.name_i18n?.fr}
                            </button>
                        ))}
                    </div>

                    {/* GRILLE DES SERVICES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredServices.map((service) => (
                                <motion.div 
                                    layout 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={service.id} 
                                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col group"
                                >
                                    {/* Image et Bouton Réserver au survol */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img 
                                            src={service.image_url} 
                                            alt="service"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                        <button
                                            onClick={() => handleBookingClick(service)}
                                            className="absolute bottom-4 right-4 bg-yellow-500 text-[#001f3f] px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center gap-2 hover:bg-[#001f3f] hover:text-white transition-all scale-0 group-hover:scale-100"
                                        >
                                            <ShoppingCartIcon sx={{ fontSize: 16 }} /> {t('footer.booking_cta', 'Réserver')}
                                        </button>
                                    </div>

                                    {/* Infos du Service */}
                                    <div className="p-8">
                                        <h3 className="text-xl font-black text-[#001f3f] uppercase italic leading-tight mb-4">
                                            {service.title?.[i18n.language] || service.title?.ro || service.title?.fr}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <p className="text-lg font-black text-[#001f3f] tracking-tighter">
                                                {service.price} {i18n.language === 'ro' ? 'Lei' : '€'}
                                            </p>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} className="text-yellow-400" sx={{ fontSize: 12 }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* MODAL DE PAIEMENT (STRIPE / PAYPAL) */}
            <AnimatePresence>
                {bookingService && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setBookingService(null)}
                            className="absolute inset-0 bg-[#001f3f]/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }} 
                            animate={{ scale: 1, y: 0, opacity: 1 }} 
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="relative w-full max-w-lg"
                        >
                            <PaymentFlow 
                                amount={bookingService.price} 
                                serviceId={bookingService.id}
                                serviceName={bookingService.title?.[i18n.language] || bookingService.title?.fr}
                                onClose={() => setBookingService(null)}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}