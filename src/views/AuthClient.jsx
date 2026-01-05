import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AuthClient() {
    const [isSignUp, setIsSignUp] = useState(false); // Basculer entre login et inscription
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        let result;
        if (isSignUp) {
            // Inscription
            result = await supabase.auth.signUp({ email, password });
        } else {
            // Connexion
            result = await supabase.auth.signInWithPassword({ email, password });
        }

        const { data, error } = result;

        if (error) {
            alert("Erreur : " + error.message);
        } else {
            if (isSignUp) alert("Vérifiez votre boîte mail pour confirmer l'inscription !");
            else navigate('/'); // Rediriger le client vers l'accueil
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-black mb-8 uppercase italic tracking-tighter text-[#001f3f]">
                    {isSignUp ? 'Créer un' : 'Espace'} <span className="text-yellow-500">Client</span>
                </h2>

                <form onSubmit={handleAuth} className="space-y-6">
                    <input
                        type="email" placeholder="Votre Email" required
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-yellow-500"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password" placeholder="Mot de passe" required
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-yellow-500"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading} className="w-full py-5 bg-[#001f3f] text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-lg">
                        {loading ? 'Chargement...' : (isSignUp ? "S'inscrire" : "Se connecter")}
                    </button>
                </form>

                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="w-full mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-yellow-500 transition-colors"
                >
                    {isSignUp ? "Déjà un compte ? Connectez-vous" : "Pas de compte ? Créez-en un"}
                </button>
            </div>
        </div>
    );
}