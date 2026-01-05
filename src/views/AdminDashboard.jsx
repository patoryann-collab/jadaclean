import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useTranslation } from 'react-i18next';

// Icônes
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('catalogue');

    // États avec support complet du Roumain
    const [newService, setNewService] = useState({
        title_i18n: { fr: '', en: '', ro: '' },
        price: '', category_id: '', image_url: '', discount: '', rating: 5
    });
    const [newCat, setNewCat] = useState({ fr: '', en: '', ro: '' });

    useEffect(() => {
        checkAuth();
        fetchData();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || session.user.email !== 'patoryann@gmail.com') navigate('/login');
    };

    const fetchData = async () => {
        const { data: s } = await supabase.from('services').select('*').order('created_at', { ascending: false });
        const { data: c } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
        const { data: u } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

        setServices(s || []);
        setCategories(c || []);
        setUsers(u || []);
        setOrders(o || []);
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('categories').insert([{
            name_i18n: { fr: newCat.fr, en: newCat.en, ro: newCat.ro }
        }]);
        if (error) alert(error.message);
        else { setNewCat({ fr: '', en: '', ro: '' }); fetchData(); }
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from('services').insert([{
            title: newService.title_i18n,
            price: parseFloat(newService.price),
            category_id: newService.category_id,
            image_url: newService.image_url,
            discount: newService.discount ? parseInt(newService.discount) : null,
            rating: newService.rating
        }]);
        if (error) alert(error.message);
        else {
            setNewService({ title_i18n: { fr: '', en: '', ro: '' }, price: '', category_id: '', image_url: '', discount: '', rating: 5 });
            fetchData();
        }
        setLoading(false);
    };

    const handleDelete = async (table, id) => {
        if (window.confirm("🚨 Confirmer la suppression ?")) {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (error) alert(error.message);
            else fetchData();
        }
    };

    return (
        <div className="min-h-screen bg-[#fafaf5] pt-28 pb-20 px-6 text-[#001f3f]">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter">Admin <span className="text-yellow-500">JadaClean</span></h1>
                    <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                        <button onClick={() => setActiveTab('catalogue')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'catalogue' ? 'bg-[#001f3f] text-white shadow-lg' : 'text-gray-400'}`}>Catalogue</button>
                        <button onClick={() => setActiveTab('users')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'users' ? 'bg-[#001f3f] text-white shadow-lg' : 'text-gray-400'}`}>Clients ({users.length})</button>
                        <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${activeTab === 'orders' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400'}`}>Commandes ({orders.length})</button>
                    </div>
                </header>

                {activeTab === 'catalogue' && (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* AJOUT CATÉGORIE (3 LANGUES) */}
                            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
                                <h2 className="text-xs font-black uppercase mb-6 flex items-center gap-2 text-yellow-500 tracking-widest"><AddCircleOutlineIcon /> Catégorie</h2>
                                <form onSubmit={handleAddCategory} className="space-y-4">
                                    <input required className="w-full p-4 bg-gray-50 rounded-2xl border-none text-xs font-bold" placeholder="Français" value={newCat.fr} onChange={e => setNewCat({ ...newCat, fr: e.target.value })} />
                                    <input required className="w-full p-4 bg-gray-50 rounded-2xl border-none text-xs font-bold" placeholder="English" value={newCat.en} onChange={e => setNewCat({ ...newCat, en: e.target.value })} />
                                    <input required className="w-full p-4 bg-gray-50 rounded-2xl border-none text-xs font-bold" placeholder="Română" value={newCat.ro} onChange={e => setNewCat({ ...newCat, ro: e.target.value })} />
                                    <button type="submit" className="w-full py-4 bg-[#001f3f] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-yellow-500 transition-all">Créer</button>
                                </form>
                                <div className="mt-8 border-t pt-6">
                                    <h3 className="text-[10px] font-black uppercase text-gray-300 mb-4">Catégories Existantes</h3>
                                    <div className="space-y-2">
                                        {categories.map(c => (
                                            <div key={c.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                                                <span className="text-[10px] font-bold">{c.name_i18n?.fr} | {c.name_i18n?.ro}</span>
                                                <button onClick={() => handleDelete('categories', c.id)} className="text-red-400 hover:text-red-600 transition-colors"><DeleteSweepIcon sx={{ fontSize: 16 }} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* AJOUT SERVICE (3 LANGUES) */}
                            <section className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                <h2 className="text-lg font-black uppercase mb-8 flex items-center gap-2 text-yellow-500 tracking-tighter"><CloudUploadIcon /> Nouveau Service</h2>
                                <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input required className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm" placeholder="Titre (FR)" value={newService.title_i18n.fr} onChange={e => setNewService({ ...newService, title_i18n: { ...newService.title_i18n, fr: e.target.value } })} />
                                    <input required className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm" placeholder="Title (EN)" value={newService.title_i18n.en} onChange={e => setNewService({ ...newService, title_i18n: { ...newService.title_i18n, en: e.target.value } })} />
                                    <input required className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm md:col-span-2" placeholder="Titlu (RO)" value={newService.title_i18n.ro} onChange={e => setNewService({ ...newService, title_i18n: { ...newService.title_i18n, ro: e.target.value } })} />
                                    <input required type="number" step="0.01" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm" placeholder="Prix (Lie)" value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} />
                                    <select required className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sm" value={newService.category_id} onChange={e => setNewService({ ...newService, category_id: e.target.value })}>
                                        <option value="">Sélectionner Catégorie...</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name_i18n?.fr || c.name_i18n?.ro}</option>)}
                                    </select>
                                    <input required className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold md:col-span-2 text-xs" placeholder="URL Image" value={newService.image_url} onChange={e => setNewService({ ...newService, image_url: e.target.value })} />
                                    <button type="submit" disabled={loading} className="md:col-span-2 py-5 bg-[#001f3f] text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl">{loading ? 'Envoi...' : 'Publier'}</button>
                                </form>
                            </section>
                        </div>

                        {/* LISTE SERVICES */}
                        <section className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3 font-black uppercase italic"><ListAltIcon className="text-yellow-500" /> Catalogue des Services</div>
                            <table className="w-full text-left">
                                <tbody>
                                    {services.map(s => (
                                        <tr key={s.id} className="hover:bg-gray-50">
                                            <td className="p-8 flex items-center gap-4"><img src={s.image_url} className="w-12 h-12 rounded-xl object-cover" /><span className="font-bold text-sm">{s.title?.fr || s.title?.ro}</span></td>
                                            <td className="p-8 font-black">{s.price} Lie</td>
                                            <td className="p-8 text-right"><button onClick={() => handleDelete('services', s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><DeleteSweepIcon /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </div>
                )}

                {/* ... Autres onglets (Users, Orders) ... */}
                {activeTab === 'users' && (
                    <section className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 bg-[#001f3f] text-white flex items-center gap-3 font-black uppercase italic"><PeopleIcon className="text-yellow-500" /> Clients</div>
                        <table className="w-full text-left">
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} className="hover:bg-gray-50 border-b">
                                        <td className="p-8 text-xs font-bold text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                                        <td className="p-8 font-black text-sm">{u.email}</td>
                                        <td className="p-8 text-right"><button onClick={() => handleDelete('profiles', u.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><DeleteSweepIcon /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {activeTab === 'orders' && (
                    <section className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 bg-green-600 text-white flex items-center gap-3 font-black uppercase italic">
                            <ShoppingCartIcon /> Interventions
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase text-gray-400 border-b">
                                    <th className="p-8">Service</th>
                                    <th className="p-8">Client</th>
                                    <th className="p-8">Prix</th> {/* Nouvelle colonne */}
                                    <th className="p-8">Adresse & Tel</th>
                                    <th className="p-8">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.id} className="hover:bg-gray-50 border-b">
                                        <td className="p-8 font-bold">{o.service_name}</td>
                                        <td className="p-8 text-xs font-black">{o.client_email}</td>
                                        {/* Affichage du prix récupéré de la base de données */}
                                        <td className="p-8 font-black text-blue-600">
                                            {o.amount ? `${o.amount} LEI` : 'N/A'}
                                        </td>
                                        <td className="p-8 text-[11px] text-gray-500">
                                            <p className="font-bold text-green-600">{o.phone}</p>
                                            <p>{o.address}</p>
                                        </td>
                                        <td className="p-8">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </div>
        </div>
    );
}