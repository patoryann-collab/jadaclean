import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const Success = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  
  // Récupération des paramètres de l'URL avec des valeurs par défaut traduites
  const customerName = searchParams.get('name') || t('success.defaultName');
  const serviceName = searchParams.get('service') || t('success.defaultService');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>

        {/* Titre dynamique et traduit */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {t('success.title', { name: customerName })}
        </h1>
        
        {/* Description utilisant <Trans /> pour gérer le gras sur le nom du service */}
        <div className="text-lg text-gray-600 mb-8 leading-relaxed">
          <Trans i18nKey="success.description" values={{ service: serviceName }}>
            Votre réservation pour le service <span className="font-bold text-blue-600">{{service: serviceName}}</span> a été validée avec succès.
          </Trans>
          <br />
          <span className="text-sm italic">{t('success.contact')}</span>
        </div>

        <div className="p-6 bg-blue-50 rounded-2xl mb-10 flex items-start space-x-4 text-left">
          <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <p className="text-sm text-blue-800">
            <strong>{t('success.noteTitle')}:</strong> {t('success.noteText')}
          </p>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all transform hover:scale-105"
        >
          {t('success.button')}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Success;