# Projet Formulaire API avec Next.js et MongoDB

Ce projet est une application web de base construite avec Next.js et MongoDB. Il fournit un ensemble d'API pour gérer les films et les commentaires associés, sans authentification requise.

## Installation

1. Cloner le dépôt :
    ```bash
    git clone <URL_DU_REPO>
    ```

2. Installer les dépendances :
    ```bash
    cd nom_du_projet
    npm install
    ```

3. Configurer la base de données MongoDB :
    - Assurez-vous que MongoDB est installé et en cours d'exécution sur votre système.
    - Modifiez le fichier `.env.local` pour spécifier l'URL de connexion à votre base de données MongoDB.

4. Démarrer le serveur de développement :
    ```bash
    npm run dev
    ```

5. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

## Stack Technologique

- **Next.js**: Framework React pour le rendu côté serveur et le routage.
- **MongoDB**: Base de données NoSQL pour stocker les données des films et des commentaires.
- **Swagger**: Outil pour la documentation et les tests d'API.
- **Postman**: Outil pour tester les API.

## Conception

L'application comprend les fonctionnalités suivantes :

- **GET /api/movies**: Récupère la liste de tous les films.
- **POST /api/movies**: Crée un nouveau film.
- **GET /api/movies/{id}**: Récupère un film spécifique par son ID.
- **PUT /api/movies/{id}**: Met à jour un film existant par son ID.
- **DELETE /api/movies/{id}**: Supprime un film par son ID.
- **GET /api/movies/{id}/comments**: Récupère les commentaires associés à un film spécifique.
- **POST /api/movies/{id}/comments**: Ajoute un nouveau commentaire à un film.
- **GET /api/movies/{id}/comments/{idComment}**: Récupère un commentaire spécifique par son ID.
- **PUT /api/movies/{id}/comments/{idComment}**: Met à jour un commentaire existant par son ID.
- **DELETE /api/movies/{id}/comments/{idComment}**: Supprime un commentaire par son ID.

## Documentation et Tests

### Swagger
L'API est documentée à l'aide de Swagger. Pour accéder à la documentation Swagger, lancez l'application et visitez [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

### Postman
Pour tester les API à l'aide de Postman, importez la collection de requêtes Postman fournie dans le dossier `postman_collection` et exécutez les requêtes correspondantes.
