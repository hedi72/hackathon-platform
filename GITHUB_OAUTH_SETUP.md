# Configuration GitHub OAuth

Ce guide explique comment configurer l'authentification GitHub pour votre application.

## Étapes de configuration

### 1. Créer une application OAuth sur GitHub

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Cliquez sur "New OAuth App"
3. Remplissez les informations :
   - **Application name**: Nom de votre application
   - **Homepage URL**: `http://localhost:3000` (pour le développement)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

### 2. Récupérer les credentials

Après avoir créé l'application :
1. Notez le **Client ID**
2. Générez un **Client Secret** et notez-le

### 3. Configurer les variables d'environnement

1. Copiez le fichier `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```

2. Remplissez les variables dans `.env.local` :
   ```env
   GITHUB_ID="votre_client_id_github"
   GITHUB_SECRET="votre_client_secret_github"
   NEXTAUTH_SECRET="votre_secret_nextauth"
   NEXT_PUBLIC_GITHUB_ENABLED="true"
   ```

### 4. Générer NEXTAUTH_SECRET

Générez un secret sécurisé :
```bash
openssl rand -base64 32
```

### 5. Mettre à jour la base de données

Après avoir modifié le schéma Prisma (champ `password` maintenant optionnel), mettez à jour votre base de données :

```bash
npx prisma db push
# ou
npx prisma migrate dev
```

### 6. Redémarrer le serveur de développement

```bash
npm run dev
```

## Configuration pour la production

Pour la production, mettez à jour :

1. **Homepage URL**: `https://votre-domaine.com`
2. **Authorization callback URL**: `https://votre-domaine.com/api/auth/callback/github`
3. **NEXTAUTH_URL**: `https://votre-domaine.com`

## Résolution des problèmes courants

### Erreur "GitHub authentication is not configured"
- Vérifiez que `GITHUB_ID` et `GITHUB_SECRET` sont définis dans votre `.env.local`
- Vérifiez que `NEXT_PUBLIC_GITHUB_ENABLED="true"`

### Erreur "Access denied"
- Assurez-vous que votre email GitHub est public ou accessible
- Vérifiez que l'URL de callback est correcte

### Erreur "OAuthCallback"
- Vérifiez que les credentials GitHub sont corrects
- Vérifiez que l'URL de callback correspond exactement

### Erreur de base de données
- Assurez-vous d'avoir exécuté `npx prisma db push` après la modification du schéma
- Vérifiez que `DATABASE_URL` est correct