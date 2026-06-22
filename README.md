# TP React Hooks - Application de Blog

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useCallback, useMemo) ainsi que la création de Hooks personnalisés à travers une application de blog simple.

## Installation et configuration initiale

1. Cloner le dépôt :
```bash
git clone https://github.com/pr-daaif/tp-react-hooks-blog.git
cd tp-react-hooks-blog
```

2. Créer votre propre dépôt sur Github et changer le remote :
```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks-blog.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :
```bash
npm install
```

4. Lancer l'application :
```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :
1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets 
#### Objectif : Implémenter l'affichage et la recherche de posts

- [X] 1.1 Compléter le hook `usePosts` pour récupérer les posts depuis l'API dummyjson.com
- [X] 1.2 Implémenter le composant `PostList` pour afficher les posts
- [X] 1.3 Ajouter la fonctionnalité de recherche par titre ou contenu dans `PostSearch`
- [X] 1.4 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_

**Solution** :

Pour cet exercice, j'ai créé un hook personnalisé `usePosts` (dans `src/hooks/usePosts.jsx`) qui gère l'état des `posts`, du `loading`, de l'`error` et du terme de recherche. Il utilise `useEffect` pour appeler l'API DummyJSON avec les paramètres de recherche.

Le composant `PostList` (dans `src/components/PostList.jsx`) reçoit les données et les affiche sous forme de cartes avec le titre, un extrait du corps et les tags. Il gère les cas de chargement, d'erreur et d'absence de résultat.

Le composant `PostSearch` (dans `src/components/PostSearch.jsx`) contient une barre de recherche qui remonte la saisie vers le parent via la prop `onSearch`.

**Fonctionnalités réalisées** :
- Récupération des posts via `https://dummyjson.com/posts` avec pagination (limite de 10 par défaut)
- Recherche via `https://dummyjson.com/posts/search?q=...`
- Affichage des tags sous chaque post avec un style distinctif
- Gestion des erreurs réseau (affichage d'un message d'erreur)

**Difficultés rencontrées** :
- Comprendre le fonctionnement du hook `useEffect` et ses dépendances
- Manipuler les données retournées par l'API (format des tags)
- Faire communiquer les composants `PostSearch`, `App` et `PostList` via les props

**Solution adoptée** :
- Utilisation de `useState` pour stocker les données
- Utilisation de `useEffect` pour charger les posts
- Utilisation de `fetch` pour appeler l'API
- Utilisation des props pour transmettre les données entre composants

**Captures d'écran** :

![Liste complète des posts](screenshots/exercice1/home.png)

![Recherche de posts](screenshots/exercice1/search.png)

### Exercice 2 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

- [X] 2.1 Créer le hook `useDebounce` pour optimiser la recherche
- [X] 2.2 Créer le hook `useLocalStorage` pour persister les préférences utilisateur
- [X] 2.3 Utiliser ces hooks dans l'application
- [X] 2.4 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_

**Solution** :

J'ai implémenté deux hooks personnalisés :

- **`useDebounce`** (`src/hooks/useDebounce.jsx`) : il prend une valeur et un délai (500ms par défaut) et retourne une version « retardée » de cette valeur. Il utilise un `setTimeout` et le nettoie avec `clearTimeout` dans le `useEffect`.  
  *Utilisation :* Dans `usePosts`, j'utilise `useDebounce` sur le `searchTerm` avant de l'utiliser dans l'appel API. Cela évite d'envoyer une requête à chaque frappe et réduit la charge sur l'API.

- **`useLocalStorage`** (`src/hooks/useLocalStorage.jsx`) : il prend une clé et une valeur initiale, lit la valeur stockée dans `localStorage` (si elle existe) et la retourne avec une fonction de mise à jour qui écrit automatiquement dans `localStorage`.  
  *Utilisation :* Dans `App.js`, j'utilise `useLocalStorage` pour persister le thème (`theme`) et le mode de défilement (`infiniteScroll`). Dans `ThemeContext`, le thème est également stocké via ce hook.

**Fonctionnalités réalisées** :
- Création du hook `useDebounce` pour optimiser la recherche
- Création du hook `useLocalStorage` pour persister les préférences
- Optimisation des recherches (requêtes espacées de 500ms)
- Sauvegarde des préférences utilisateur dans le navigateur

**Solution adoptée** :
- Utilisation de `useEffect` pour gérer le délai du debounce
- Utilisation de `localStorage.getItem()` et `localStorage.setItem()` pour la persistance des données

**Captures d'écran** :

![Optimisation de la recherche](screenshots/exercice2/optimisationrecherche.png)

### Exercice 3 : Optimisation et Context
#### Objectif : Gérer le thème global et optimiser les rendus

- [X] 3.1 Créer le `ThemeContext` pour gérer le thème clair/sombre
- [X] 3.2 Implémenter le composant `ThemeToggle`
- [X] 3.3 Utiliser `useCallback` et `useMemo` pour optimiser les performances
- [X] 3.4 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_

**Solution** :

- **ThemeContext** (`src/context/ThemeContext.jsx`) : j'ai créé un contexte avec `createContext` et un `ThemeProvider` qui expose `theme` et `toggleTheme`. Le thème est stocké via `useLocalStorage` pour persistance. Le `useTheme` hook personnalisé permet d'accéder facilement au contexte dans les composants.

- **ThemeToggle** (`src/components/ThemeToggle.jsx`) : un bouton simple qui utilise `useTheme()` pour afficher l'icône (🌙 / ☀️) et basculer le thème.

- **Optimisations** :
  - **`React.memo`** : j'ai enveloppé `PostList`, `PostSearch` et `PostDetails` pour éviter les re-rendus inutiles lorsque leurs props ne changent pas.
  - **`useCallback`** : toutes les fonctions passées comme props (ex: `handleSearchChange`, `handleTagSelect`, `handlePostClick`, `loadMorePosts`) sont mémorisées pour avoir une référence stable entre les rendus.
  - **`useMemo`** : j'ai calculé la liste des tags disponibles (`availableTags`) à partir des posts chargés, pour ne recalculer que lorsque les posts changent.

**Fonctionnalités réalisées** :
- Gestion globale du thème avec Context API
- Persistance du thème avec localStorage
- Composant ThemeToggle
- Optimisation avec useCallback et React.memo

**Difficultés** :
- Comprendre la différence entre `useCallback` et `useMemo`
- S'assurer que les dépendances des `useCallback` sont correctes
- Appliquer `React.memo` avec des props fonctions (nécessite useCallback)

**Captures d'écran** :

![Mode clair](screenshots/exercice3/clairemode.png)

![Mode sombre](screenshots/exercice3/darkmode.png)

### Exercice 4 : Fonctionnalités avancées
#### Objectif : Ajouter des fonctionnalités de chargement et détail

- [X] 4.1 Implémenter le chargement infini des posts avec `useIntersectionObserver`
- [X] 4.2 Créer le composant `PostDetails` pour afficher les détails d'un post
- [X] 4.3 Ajouter la fonctionnalité de filtrage par tags
- [X] 4.4 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_

**Solution** :

- **`useIntersectionObserver`** (`src/hooks/useIntersectionObserver.jsx`) : ce hook utilise l'API `IntersectionObserver` pour détecter quand l'élément référencé entre dans le viewport. Il retourne une ref à attacher à un élément (généralement un div de garde en bas de la liste) et un booléen `isIntersecting`.  
  *Utilisation :* Dans `PostList`, j'utilise ce hook pour appeler `onLoadMore` lorsque `isIntersecting` devient `true`, ce qui déclenche le chargement des posts suivants.

- **`PostDetails`** (`src/components/PostDetails.jsx`) : ce composant s'affiche en modal lorsque l'utilisateur clique sur une carte. Il appelle l'API `https://dummyjson.com/posts/{id}` pour récupérer le contenu complet et affiche le titre, le corps, les tags et le nombre de réactions. Il dispose d'un bouton de fermeture et d'un clic sur le fond pour fermer.

- **Filtrage par tags** : j'ai ajouté un `<select>` dans `PostSearch` qui liste tous les tags uniques extraits des posts chargés (via `availableTags`). Lorsque l'utilisateur sélectionne un tag, `usePosts` appelle l'API `/posts/tag/{tag}` pour afficher les posts correspondants.  
  *Note :* J'ai choisi de prioriser le tag sur la recherche si les deux sont présents (car l'API ne permet pas de combiner les deux endpoints).

- **Mode de défilement** : j'ai utilisé `useLocalStorage` pour persister un booléen `infiniteScroll`. Si activé, le défilement infini est utilisé ; sinon, un bouton "Charger plus" apparaît pour charger la page suivante.

**Fonctionnalités réalisées** :
- Chargement infini fluide avec l'Intersection Observer
- Modal de détails avec informations complètes
- Filtrage par tag avec sélecteur dédié
- Choix entre défilement infini et pagination par bouton

**Difficultés** :
- Éviter les appels multiples lors du défilement infini (condition `!loading`)
- Gérer la combinaison recherche + tag (priorité au tag)
- La fermeture de la modal (clic sur l'overlay avec `stopPropagation`)
- Extraire les tags uniques de manière performante avec `useMemo`

**Captures d'écran** :
![Filtrage par tag](screenshots/exercice4/tag-filter.png)
![Détail d'un post](screenshots/exercice4/details.png)



## Structure détaillée du projet

```
📁 ./
├─ 📄 README.md
├─ 📄 package.json
├─ 📁 public/
│  └─ 📄 index.html
└─ 📁 src/
   ├─ 📄 App.js               # Composant principal de l'application
   ├─ 📄 App.css              # Styles CSS de l'application
   ├─ 📁 components/
   │  ├─ 📄 PostList.js       # Liste des posts
   │  ├─ 📄 PostSearch.js     # Barre de recherche
   │  ├─ 📄 PostDetails.js    # Détails d'un post
   │  ├─ 📄 ThemeToggle.js    # Bouton pour changer de thème
   │  └─ 📄 LoadingSpinner.js # Indicateur de chargement
   ├─ 📁 hooks/
   │  ├─ 📄 usePosts.js       # Hook pour gérer les posts
   │  ├─ 📄 useDebounce.js    # Hook pour débouncer les valeurs
   │  ├─ 📄 useLocalStorage.js # Hook pour gérer le localStorage
   │  └─ 📄 useIntersectionObserver.js # Hook pour le chargement infini
   ├─ 📁 context/
   │  └─ 📄 ThemeContext.js   # Contexte pour le thème
   ├─ 📄 index.css
   └─ 📄 index.js
```

## Ressources utiles

- Documentation de l'API: [https://dummyjson.com/docs/posts](https://dummyjson.com/docs/posts)
- Documentation React Hooks: [https://fr.reactjs.org/docs/hooks-intro.html](https://fr.reactjs.org/docs/hooks-intro.html)
- Guide sur les hooks personnalisés: [https://fr.reactjs.org/docs/hooks-custom.html](https://fr.reactjs.org/docs/hooks-custom.html)

## Rendu

- Ajoutez l'URL de votre dépôt Github dans **Classroom** et envoyez la réponse dès le démarrage de votre projet.
- Les push doivent se faire au fur et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran.
- Chaque exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.

---

# Documentation de l'API dummyjson - Posts

Pour réaliser ce TP, vous utiliserez l'API dummyjson.com qui fournit des données fictives de posts de blog. Voici les points d'entrée que vous utiliserez :

## Points d'entrée API

### Récupérer tous les posts
```
GET https://dummyjson.com/posts
```

Paramètres de requête optionnels :
- `limit` : nombre de posts à récupérer (défaut: 30)
- `skip` : nombre de posts à sauter (pour la pagination)

Exemple : `https://dummyjson.com/posts?limit=10&skip=10`

### Récupérer un post spécifique
```
GET https://dummyjson.com/posts/{id}
```

Exemple : `https://dummyjson.com/posts/1`

### Rechercher des posts
```
GET https://dummyjson.com/posts/search?q={terme}
```

Exemple : `https://dummyjson.com/posts/search?q=love`

### Récupérer les posts par tag
```
GET https://dummyjson.com/posts/tag/{tag}
```

Exemple : `https://dummyjson.com/posts/tag/history`

## Format de réponse

### Liste de posts

```json
{
  "posts": [
    {
      "id": 1,
      "title": "His mother had always taught him",
      "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or whose decisions had led them astray.",
      "userId": 9,
      "tags": ["history", "american", "crime"],
      "reactions": 2
    },
    ...
  ],
  "total": 150,
  "skip": 0,
  "limit": 30
}
```

### Post unique

```json
{
  "id": 1,
  "title": "His mother had always taught him",
  "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or whose decisions had led them astray.",
  "userId": 9,
  "tags": ["history", "american", "crime"],
  "reactions": 2
}
```

## Conseils d'utilisation

- Pour la pagination, utilisez les paramètres `limit` et `skip`
- Pour calculer le nombre total de pages, utilisez la formule : `Math.ceil(total / limit)`
- Pour implémenter le défilement infini, chargez plus de posts quand l'utilisateur atteint le bas de la page
- Pour la recherche, utilisez le point d'entrée `/posts/search` avec le paramètre `q`
- Vous pouvez combiner les paramètres de recherche avec les paramètres de pagination
