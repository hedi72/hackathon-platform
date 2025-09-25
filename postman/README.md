# 📮 Collection Postman - Hackathon Platform API

Cette collection Postman contient tous les endpoints de votre plateforme de hackathons pour faciliter les tests et le développement.

## 📁 Fichiers inclus

- `Hackathon-Platform-API.postman_collection.json` - Collection principale
- `Production.postman_environment.json` - Environnement de production
- `Local.postman_environment.json` - Environnement local

## 🚀 Installation

### 1. Importer dans Postman
1. Ouvrir Postman
2. **Import** → **Upload Files**
3. Sélectionner les 3 fichiers JSON

### 2. Configurer l'environnement
- Choisir **"Production"** ou **"Local"** selon vos besoins
- Les variables sont automatiquement configurées

## 📋 Endpoints disponibles

### 🏥 **Health & Test**
- `GET /api/health` - Vérifier l'état de l'application
- `GET /api/test-connection` - Tester la connexion à la base de données

### 🔐 **Authentication**
- `POST /api/auth/signup` - Créer un compte utilisateur
- `GET /api/auth/session` - Récupérer la session active
- `POST /api/auth/callback/credentials` - Connexion avec email/password
- `POST /api/auth/signout` - Déconnexion

### 🎯 **Events & Organization**
- `GET /api/organize` - Récupérer les événements organisés
- `POST /api/organize` - Créer un nouvel événement/hackathon

### 🚀 **Projects**
- `GET /api/projects` - Récupérer tous les projets
- `POST /api/projects` - Créer un nouveau projet

### 📄 **Pages Static**
- `GET /` - Page d'accueil
- `GET /dashboard` - Tableau de bord (authentification requise)
- `GET /events` - Page des événements
- `GET /auth/signin` - Page de connexion
- `GET /auth/signup` - Page d'inscription

## 🔧 Variables d'environnement

### Production
```json
{
  "BASE_URL": "https://hackathon-platform-sigma.vercel.app",
  "test_user_email": "test@example.com",
  "test_user_password": "password123"
}
```

### Local
```json
{
  "BASE_URL": "http://localhost:3000",
  "test_user_email": "test@localhost.com",
  "test_user_password": "password123"
}
```

## 🎯 Utilisation recommandée

### 1. **Tests d'authentification**
```
1. POST /api/auth/signup (créer un compte)
2. GET /api/auth/session (vérifier la session)
3. Utiliser les cookies retournés pour les autres requêtes
```

### 2. **Workflow organisateur**
```
1. S'authentifier comme ORGANIZER
2. POST /api/organize (créer un événement)
3. GET /api/organize (voir ses événements)
```

### 3. **Tests de santé**
```
1. GET /api/health (vérifier l'app)
2. GET /api/test-connection (vérifier la DB)
```

## 🔒 **Authentification**

### Cookies automatiques
- La collection capture automatiquement les cookies de session
- Variable `{{session_cookie}}` mise à jour automatiquement
- Réutilisation pour les requêtes authentifiées

### Tests personnalisés
- Vérification automatique des codes de statut
- Capture des cookies de session
- Scripts de pré-requête disponibles

## 🚨 **Dépannage**

### Erreurs communes
- **401 Unauthorized** : Session expirée, se reconnecter
- **403 Forbidden** : Permissions insuffisantes (vérifier le rôle)
- **500 Internal Error** : Vérifier la configuration de la DB

### Variables manquantes
- Vérifier que l'environnement est sélectionné
- `{{BASE_URL}}` doit pointer vers la bonne URL
- `{{session_cookie}}` se remplit automatiquement

## 💡 **Conseils**

1. **Commencer par** `/api/health` pour vérifier que tout fonctionne
2. **Utiliser l'environnement Local** pour le développement
3. **Basculer vers Production** pour les tests finaux
4. **Vérifier les logs** dans la console Postman pour le debug

Bon testing ! 🚀