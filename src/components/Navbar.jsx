import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { LayoutDashboard, LogOut, UserCircle } from 'lucide-react';

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const languages = [
    { code: 'ro', label: 'RO' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' }
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="relative z-50 bg-white border-b border-gray-100 py-4 px-8 rounded-t-3xl shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo - Section Gauche */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="bg-[#001f3f] p-2 rounded-lg group-hover:rotate-6 transition-transform">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 italic">Jada<span className="text-yellow-400 uppercase">Clean</span></span>
        </Link>

        {/* Menu Central + Langues - Section Droite Groupée */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* Liens de Navigation */}
          <div className="flex items-center space-x-6">
            {['home', 'services', 'about', 'contact'].map((item) => (
              <NavLink
                key={item}
                to={item === 'home' ? '/' : `/${item}`}
                className={({ isActive }) => `font-semibold text-sm transition-colors hover:text-yellow-500 whitespace-nowrap ${isActive ? 'text-[#001f3f] border-b-2 border-yellow-400' : 'text-gray-500'}`}
              >
                {t(`nav.${item}`)}
              </NavLink>
            ))}
          </div>

          {/* Boutons de Langues Individuels */}
          <div className="flex items-center gap-2 border-l pl-8 border-gray-100">
            {languages.map((lang) => {
              const isActive = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black transition-all duration-300 transform active:scale-95 ${
                    isActive
                      ? 'bg-[#001f3f] text-yellow-400 shadow-md scale-105'
                      : 'bg-white text-gray-600 shadow-lg border border-gray-50 hover:bg-gray-50'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          {/* Espace Admin / Login */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-full pr-4 border border-gray-100">
                <Link
                  to="/admin"
                  className="flex items-center gap-2 bg-[#001f3f] text-yellow-400 px-4 py-2 rounded-full text-[10px] font-bold hover:bg-[#002a54] transition-all shadow-md"
                >
                  <LayoutDashboard size={12} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 font-bold text-[9px] uppercase transition-colors px-1"
                >
                  <LogOut size={12} />
                  Se déconnecter
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-[#001f3f] font-bold text-xs hover:text-yellow-500 transition-all group italic"
              >
                <UserCircle size={18} className="group-hover:scale-110 transition-transform" />
                Espace Pro
              </Link>
            )}
          </div>
        </div>

        {/* Bouton Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#001f3f] p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-6 space-y-6 rounded-b-3xl shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-2 gap-4">
            {['home', 'services', 'about', 'contact'].map((item) => (
              <Link key={item} to={item === 'home' ? '/' : `/${item}`} onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-semibold p-3 bg-gray-50 rounded-xl text-center">
                {t(`nav.${item}`)}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => (
              <button 
                key={lang.code} 
                onClick={() => { i18n.changeLanguage(lang.code); setIsMenuOpen(false); }}
                className={`py-3 rounded-xl font-black text-xs transition-all ${
                  i18n.language === lang.code 
                    ? 'bg-[#001f3f] text-yellow-400 shadow-md' 
                    : 'bg-white text-gray-400 border border-gray-100 shadow-sm'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {user ? (
            <div className="space-y-3">
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-[#001f3f] text-yellow-400 py-4 rounded-2xl font-bold">
                <LayoutDashboard size={20} />
                Mon Dashboard
              </Link>
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full text-red-500 font-black py-2 uppercase text-[10px] tracking-widest italic">
                <LogOut size={16} />
                Se déconnecter
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-yellow-400 text-[#001f3f] py-4 rounded-2xl font-bold uppercase shadow-lg">
              Espace Pro
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}