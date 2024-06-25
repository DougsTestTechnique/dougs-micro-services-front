# DOUGS - Microservices Frontend

## Introduction

Ce projet est une application frontend développée avec le framework Quasar. Il s'agit d'un projet pour gérer les opérations de validation des fichiers JSON scrappés et des relevés bancaires.

## Prérequis

- Node.js ^20 || ^18 || ^16
- npm >= 6.13.4
- yarn >= 1.21.1

## Installation

Clonez le dépôt et installez les dépendances :

bash

git clone <URL_DU_DEPOT>

cd dougs-micro-servicesfront

yarn install


## Scripts

Voici les scripts disponibles pour gérer le projet :

- lint: Lint le code source en utilisant ESLint.
- format: Formatte le code source en utilisant Prettier.
- dev: Démarre l'application en mode développement.
- build: Compile l'application pour la production.

yarn lint
yarn format
yarn dev
yarn build

## Fonctionnalités ajoutées

### Route `operations-checker`

Une nouvelle route a été ajoutée pour gérer la page de validation des opérations.

### Page `OperationsChecker`

La page `OperationsChecker` permet de téléverser des fichiers JSON pour les opérations scrappées et les relevés bancaires, et de valider leur contenu.

## Composant `AnomalyCard`

Le composant ÀnomalyCard` est utilisé pour afficher les anomalies détectées lors de la validation des fichiers. Il affiche les informations telles que la date, le montant attendu, le montant réel, et la différence.

### Fichier de typages `types.ts`

Le fichier `types.ts` contient les interfaces TypeScript utilisées dans le projet pour typage fort.

### Fichier utils `envService.ts`

Le fichier `envService.ts` gère les variables d'environnement pour le projet.

### Fichier utils `databaseService.ts`

Le fichier `databaseService.ts` contient les fonctions pour interagir avec l'API backend.

## Utilisation

Pour développer localement, utilisez le script dev :

Copy code

yarn dev

Accédez à l'application via votre navigateur à l'adresse `http://localhost:8080`.

Naviguez vers la route /operations-checker pour accéder à la page de validation des opérations.

## Auteur

NICOLAS MAZZOLENI mazzoleni.nicolas@gmail.com

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.