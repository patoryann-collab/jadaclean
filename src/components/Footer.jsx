import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Imports MUI
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FacebookIcon />, href: "#", color: "hover:text-blue-500" },
        { icon: <InstagramIcon />, href: "#", color: "hover:text-pink-500" },
        { icon: <LinkedInIcon />, href: "#", color: "hover:text-blue-700" },
    ];

    return (
        <footer className="bg-[#001f3f] text-white pt-24 pb-12 px-6 lg:px-24 relative overflow-hidden">
            {/* Ligne décorative */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* LOGO & DESC */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                            Jada<span className="text-yellow-400">Clean</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed font-medium">
                            {t('footer.description')}
                        </p>
                        <div className="flex space-x-5">
                            {socialLinks.map((social, i) => (
                                <motion.a key={i} href={social.href} whileHover={{ y: -5 }} className={`text-2xl text-gray-400 transition-colors ${social.color}`}>
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* NAV */}
                    <div>
                        <h3 className="text-xl font-bold uppercase italic mb-8 border-b-2 border-yellow-400 w-fit pb-2">
                            {t('footer.links_title')}
                        </h3>
                        <ul className="space-y-4 font-medium text-gray-400">
                            {['home', 'services', 'about', 'contact'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'home' ? '/' : `/${item}`} className="hover:text-yellow-400 transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-4 h-0.5 bg-yellow-400 mr-0 group-hover:mr-2 transition-all" />
                                        {t(`nav.${item}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="text-xl font-bold uppercase italic mb-8 border-b-2 border-yellow-400 w-fit pb-2">
                            {t('footer.contact_title')}
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-yellow-400">
                                    <LocalPhoneRoundedIcon fontSize="small" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase font-bold">Phone</p>
                                    <p className="font-medium">+40 733 857 478 / +40 (773) 348 791</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-yellow-400">
                                    <EmailRoundedIcon fontSize="small" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase font-bold">Email</p>
                                    <p className="font-medium">jadaentreprise3@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NEWSLETTER */}
                    <div className="bg-white/5 p-8 rounded-[30px] border border-white/10">
                        <h3 className="text-xl font-bold uppercase italic mb-6">Newsletter</h3>
                        <div className="space-y-4">
                            <input type="email" placeholder="Email..." className="w-full bg-[#001f3f] border border-white/20 rounded-full py-3 px-6 focus:outline-none focus:border-yellow-400 text-white" />
                            <button className="w-full bg-yellow-400 text-[#001f3f] font-black uppercase py-3 rounded-full hover:bg-yellow-300 transition-all">
                                {t('footer.newsletter_btn')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* BARRE FINALE : COPYRIGHT + SIGNATURE IBRICE */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 font-medium">

                    <p className="order-2 md:order-1 text-sm">
                        © {currentYear} JadaClean. {t('footer.rights')}
                    </p>

                    {/* TA SIGNATURE */}
                    <div className="order-1 md:order-2 flex items-center gap-2 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/5">
                        <span className="text-gray-500">{t('footer.designed_by', 'Conçu par')}</span>
                        <a
                            href="https://www.linkedin.com/in/ibrice-tcheuko-8b4302397"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-300 hover:text-yellow-400 transition-all font-black uppercase italic tracking-tighter"
                        >
                            <CodeRoundedIcon sx={{ fontSize: 16 }} className="text-yellow-400" />
                            Ibrice TCHEUKO
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-yellow-400 ml-1"
                            >
                                _
                            </motion.span>
                        </a>
                    </div>

                    <div className="order-3 flex space-x-6 text-sm">
                        <Link to="/legal" className="hover:text-white transition-colors">Mentions</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}