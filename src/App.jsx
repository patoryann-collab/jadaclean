import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Services from './views/Services';
import AdminDashboard from './views/AdminDashboard';
import Login from './views/Login';
import Success from './views/Success';

// Import des nouvelles pages
import About from './views/About';
import Contact from './views/Contact';

const NotFound = () => <div className="p-10 text-gray-800 text-center font-bold">404 - Page non trouvée</div>;

// Protection stricte : Seul l'admin peut passer
const AdminRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  // Vérification de l'email admin
  const isAdmin = session?.user?.email === 'patoryann@gmail.com';
  return isAdmin ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200 flex flex-col items-center p-0 sm:p-8">
        <div className="relative w-full max-w-7xl min-h-screen sm:min-h-[90vh] bg-white rounded-none sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
          <Navbar />
          <main className="flex-grow relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />

              {/* Nouvelles Routes */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/success" element={<Success />} />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;