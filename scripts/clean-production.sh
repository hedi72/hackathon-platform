#!/bin/bash

# Script de nettoyage du code de production
# Utilisation: ./scripts/clean-production.sh

echo "🧹 Nettoyage du code de production..."

# Supprimer les fichiers de test s'ils existent
echo "🗑️  Suppression des fichiers de test..."
find app/api -name "test-*.ts" -delete 2>/dev/null || true

# Supprimer les logs de console en mode production (optionnel - déjà géré dynamiquement)
echo "📝 Les logs de debug sont déjà conditionnés au NODE_ENV"

# Vérifier la présence des variables d'environnement critiques
echo "🔍 Vérification de la configuration..."

if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  WARNING: DATABASE_URL n'est pas définie"
fi

if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "⚠️  WARNING: NEXTAUTH_SECRET n'est pas définie"
fi

if [ -z "$NEXTAUTH_URL" ]; then
    echo "⚠️  WARNING: NEXTAUTH_URL n'est pas définie"
fi

echo "✅ Nettoyage terminé!"
echo "🚀 Prêt pour la production!"