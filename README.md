# Rami Portfolio - Angular Scaffold

Ce dépôt contient une version minimaliste d'une application Angular qui reprend le contenu du `index.html` original.

## Prérequis
- Node.js v18+ (ou compatible)
- npm
- Angular CLI (optionnel : `npm i -g @angular/cli`)

## Installation
Ouvrez PowerShell et exécutez :

```powershell
cd c:\Users\15143\source\repos\RamiPortfelio
npm install
```

Si vous voyez toujours des erreurs de résolution des peerDependencies avec npm 7/8, exécutez :

```powershell
npm install --legacy-peer-deps
```

Cela force npm à ignorer temporairement les conflits de peer deps et convient pour un environnement de développement local.

## Développement
Pour lancer le serveur en mode développement :

```powershell
npm start
# ou
npx ng serve --open
```

L'application ouvre automatiquement `http://localhost:4200`.

Si vous rencontrez des erreurs après une tentative d'installation échouée, essayez :

```powershell
rmdir /s /q node_modules
del package-lock.json
npm cache verify
npm install
```

Si les erreurs de peer deps persistent, utilisez :

```powershell
npm install --legacy-peer-deps
```

## Notes
- Les styles originaux sont copiés dans `src/styles.css`.
- Les scripts JS originaux ont été migrés dans `src/app/app.component.ts` (ngAfterViewInit).
- Vous pouvez convertir les sections statiques en composants Angular individuels (ex: hero, about, skills) pour une meilleure maintenabilité.

Si vous souhaitez que je complète les sections restantes dans `app.component.html` (toute la page) et crée des composants séparés, dites-le et je m'en occupe.