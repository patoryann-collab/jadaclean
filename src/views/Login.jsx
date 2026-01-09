import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false); // Mode Inscription ou Connexion
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        let result;
        if (isSignUp) {
            result = await supabase.auth.signUp({ email, password });
        } else {
            result = await supabase.auth.signInWithPassword({ email, password });
        }

        if (result.error) {
            alert("Erreur : " + result.error.message);
        } else {
            if (isSignUp) {
                alert("Compte créé avec succès !");
                setIsSignUp(false);
            } else {
                // Redirection : Admin vers dashboard, Client vers accueil
                if (email === 'patoryann@gmail.com') navigate('/admin');
                else navigate('/');
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-black mb-8 uppercase italic tracking-tighter text-[#001f3f] text-center">
                    {isSignUp ? 'Créer un' : 'Space'} <span className="text-yellow-500">{isSignUp ? 'Compte' : 'Admin'}</span>
                </h2>

                <form onSubmit={handleAuth} className="space-y-6">
                    <input
                        type="email" required placeholder="Email"
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-yellow-500"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password" required placeholder="Mot de passe"
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-yellow-500"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading} className="w-full py-5 bg-[#001f3f] text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-lg">
                        {loading ? 'Chargement...' : (isSignUp ? "S'inscrire" : "Connexion")}
                    </button>
                </form>

                <button onClick={() => setIsSignUp(!isSignUp)} className="w-full mt-6 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-yellow-600">
                    {isSignUp ? "Déjà un compte ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
                </button>
            </div>
        </div>
    );
}