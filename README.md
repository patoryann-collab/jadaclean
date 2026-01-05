📑 Documentation Technique : JadaClean (v1.0.0)
📝 Présentation du Projet
JadaClean est une plateforme SaaS de réservation de services de nettoyage professionnel. Elle permet aux clients de choisir un service, de fournir leurs informations de localisation et de payer en ligne de manière sécurisée. Une interface d'administration permet la gestion du catalogue et le suivi des interventions.

🛠 Stack Technique (Les Outils)
Frontend & UI
React.js : Pour une interface utilisateur dynamique et performante.

Tailwind CSS : Pour un design moderne, responsive et un stylage ultra-rapide.

Material UI (MUI) : Utilisé pour les composants interactifs complexes et l'iconographie professionnelle.

Framer Motion : Pour les animations fluides (modaux, transitions de pages) qui améliorent l'expérience utilisateur (UX).

i18next : Support multilingue complet (Français, Roumain, Anglais).

Backend & Infrastructure
Supabase : Alternative open-source à Firebase, utilisée pour :

PostgreSQL : Base de données relationnelle.

Edge Functions (Deno) : Logique serveur sans serveur pour les paiements.

Authentication : Gestion sécurisée des accès admin.

Stripe API : Gestion complète du tunnel de paiement sécurisé.

🚀 Fonctionnalités Clés
1. Home Page (Vitrine)
Design épuré et professionnel axé sur la conversion.

Présentation des catégories de services via une grille interactive.

Navigation fluide et optimisée pour mobile.

2. Système de Réservation (Booking Flow)
Formulaire de Contact Dynamique : Avant le paiement, récupération du nom, téléphone et adresse exacte de l'intervention.

Tunnel de Paiement Multi-étapes : Intégration de Stripe pour les cartes bancaires (et structure prête pour PayPal).

Gestion des Métadonnées : Transfert sécurisé des informations client du frontend vers le backend via Stripe Metadata.

3. Admin Dashboard (Gestion)
Gestion du Catalogue : Ajout, modification et suppression de services et catégories en temps réel.

Suivi des Interventions : Tableau de bord centralisant les paiements réussis avec :

Détails du client (Nom, Email, Tel).

Localisation précise (Adresse).

Montant de la transaction (en LEI).

Statut de la commande.

🏗 Architecture du Flux de Données
Le projet repose sur une architecture sécurisée en "boucle" :

Frontend : Capture les infos et appelle create-checkout-session.

Edge Function : Prépare la session Stripe avec les metadata.

Stripe : Traite le paiement de manière sécurisée.

Webhook : Reçoit la confirmation, valide la signature et insère les données dans Supabase.

Dashboard : Rafraîchissement automatique pour afficher la nouvelle commande.

🔒 Sécurité et Performance
Validation des Webhooks : Utilisation de cryptoProvider et des secrets d'environnement pour empêcher les fausses transactions.

CORS Policy : Configuration stricte des accès aux fonctions.

Optimisation des images : Utilisation d'URLs Cloud pour un chargement rapide.

📈 Évolutions futures (Roadmap)
[ ] Activation des notifications par email via Resend.

[ ] Système de facturation automatique en PDF.

[ ] Géolocalisation via Google Maps API pour valider les adresses.