# 📮 Collection Postman - Hackathon Platform API

Cette collection Postman contient tous les endpoints de votre plateforme de hackathons pour faciliter les tests et le développement.

## 📁 Fichiers inclus

- `Hackathon-Platform-Complete.postman_collection.json` - Collection principale complète
- `Local-Development.postman_environment.json` - Environnement de développement local
- `Production.postman_environment.json` - Environnement de production

## 🚀 Installation

### 1. Importer dans Postman
1. Ouvrir Postman
2. **Import** → **Upload Files**
3. Sélectionner les 3 fichiers JSON
4. Ou glisser-déposer directement dans Postman

### 2. Configurer l'environnement
- Choisir **"Local Development"** pour les tests locaux
- Choisir **"Production"** pour tester l'environnement déployé
- Les variables sont automatiquement configurées

## 📋 Endpoints disponibles

### 🏥 **Health & Monitoring**
- `GET /api/health` - Vérifier l'état de l'application
- `GET /api/test-connection` - Tester la connexion à la base de données

### 🔐 **Authentication**
- `POST /api/auth/signup` - Créer un compte utilisateur
- `POST /api/auth/callback/credentials` - Connexion avec email/password
- `GET /api/auth/session` - Récupérer la session active
- `POST /api/auth/signout` - Déconnexion

### 🎯 **Events & Organization**
- `GET /api/organize` - Récupérer les événements organisés
- `POST /api/organize` - Créer un nouvel événement/hackathon

### 🚀 **Projects**
- `GET /api/projects` - Récupérer tous les projets
- `POST /api/projects` - Créer un nouveau projet

### 🧪 **Test Endpoints**
- `GET /api/test-auth` - Tester le statut d'authentification
- `GET /api/test-db` - Tester la connexion à la base de données
- `GET /api/test-organize` - Tester les fonctionnalités d'organisation
- `GET /api/test-signin` - Tester le processus de connexion
- `GET /api/test-users` - Tester la gestion des utilisateurs

## 🔧 Variables d'environnement

### Local Development
```json
{
  "baseUrl": "http://localhost:3000",
  "apiUrl": "http://localhost:3000/api",
  "environment": "development",
  "testUserEmail": "test@localhost.com",
  "testUserPassword": "password123"
}
```

### Production
```json
{
  "baseUrl": "https://your-hackathon-platform.vercel.app",
  "apiUrl": "https://your-hackathon-platform.vercel.app/api",
  "environment": "production",
  "testUserEmail": "demo@hackathon-platform.com",
  "testUserPassword": "DemoPassword2025!"
}
```

## 🔄 Workflows recommandés

### 1. Test d'authentification complet
1. **Health Check** - Vérifier que l'API fonctionne
2. **Signup** - Créer un compte de test
3. **Signin** - Se connecter avec les identifiants
4. **Get Session** - Vérifier la session active
5. **Test Auth Status** - Confirmer l'authentification

### 2. Test de création d'événement
1. **Signin** - Se connecter d'abord
2. **Create Event** - Créer un nouvel événement
3. **Get Events** - Vérifier que l'événement a été créé

### 3. Test de gestion de projets
1. **Signin** - Authentification
2. **Create Project** - Créer un projet
3. **Get All Projects** - Vérifier la liste des projets

## 🔒 Authentification

La collection utilise les cookies de session pour l'authentification. Après une connexion réussie, les requêtes suivantes utiliseront automatiquement la session.

### Variables d'authentification
- `testUserEmail` - Email par défaut pour les tests
- `testUserPassword` - Mot de passe par défaut pour les tests

## 📝 Scripts de test intégrés

Chaque requête contient des scripts de test automatiques qui :
- Vérifient les codes de statut HTTP
- Extraient et sauvegardent les tokens d'authentification
- Affichent des messages informatifs dans la console

## 🐛 Débogage

### Console Postman
Ouvrez la console Postman (**View** → **Show Postman Console**) pour voir :
- Les logs des requêtes
- Les messages de debug
- Les erreurs détaillées

### Variables utiles pour le debug
- `{{baseUrl}}` - URL de base de l'application
- `{{environment}}` - Environnement actuel (dev/prod)

## 🔄 Mise à jour de la collection

Pour mettre à jour la collection :
1. Ré-importer le fichier JSON
2. Choisir **"Replace"** pour écraser l'ancienne version
3. Vérifier que l'environnement est toujours sélectionné

## 🆘 Problèmes courants

### Erreur CORS
- Vérifiez que l'URL de base est correcte
- Assurez-vous que le serveur local fonctionne sur le port 3000

### Authentification échouée
- Vérifiez les identifiants dans les variables d'environnement
- Créez d'abord un compte avec l'endpoint Signup
- Vérifiez que les cookies sont activés dans Postman

### Base de données inaccessible
- Vérifiez que Prisma est configuré correctement
- Testez avec l'endpoint `/api/test-connection`

## 📞 Support

Pour toute question ou problème :
1. Vérifiez d'abord la console Postman
2. Consultez les logs du serveur Next.js
3. Testez les endpoints de santé en premier

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