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

- [x] 1.1 Compléter le hook usePosts pour récupérer les posts depuis l'API dummyjson.com
- [x] 1.2 Implémenter le composant PostList pour afficher les posts
- [x] 1.3 Ajouter la fonctionnalité de recherche par titre ou contenu dans PostSearch
- [x] 1.4 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_
```
Expliquez votre solution ici
### Solution

Pour cet exercice, j'ai créé un hook personnalisé `usePosts` qui récupère les données depuis l'API DummyJSON à l'aide de `fetch()` et de `useEffect()`.

Le composant `PostList` affiche la liste des posts récupérés depuis l'API en utilisant la méthode `map()`.

Le composant `PostSearch` permet à l'utilisateur de rechercher des posts. À chaque modification du champ de recherche, le terme saisi est envoyé au hook `usePosts`, qui effectue une nouvelle requête vers l'API :

`https://dummyjson.com/posts/search?q=motCle`

### Fonctionnalités réalisées

* Récupération des posts depuis l'API DummyJSON
* Affichage de la liste des posts
* Gestion du chargement des données
* Recherche de posts par titre ou contenu
* Affichage d'un message lorsqu'aucun post n'est trouvé

### Difficultés rencontrées

* Comprendre le fonctionnement du hook `useEffect`
* Manipuler les données retournées par l'API
* Faire communiquer les composants `PostSearch`, `App` et `PostList`

###Solution  

* Utilisation de `useState` pour stocker les données
* Utilisation de `useEffect` pour charger les posts
* Utilisation de `fetch` pour appeler l'API
* Utilisation des props pour transmettre les données entre composants

### Captures d'écran

#### Liste complète des posts
![Liste complète](screenshots/EX1_Scren/listPpost.png)

#### Recherche de posts
![Recherche](screenshots/EX1_Scren/ListPostFilter.png)

### Exercice 2 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

- [x] 2.1 Créer le hook useDebounce pour optimiser la recherche
- [x] 2.2 Créer le hook useLocalStorage pour persister les préférences utilisateur
- [x] 2.3 Utiliser ces hooks dans l'application
- [x] 2.4 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_
```
Expliquez votre solution ici
### Solution
### Fonctionnalités réalisées

* Création du hook `useDebounce`
* Création du hook `useLocalStorage`
* Optimisation des recherches
* Sauvegarde des préférences utilisateur

### Solution adoptée

* Utilisation de `useEffect` pour gérer le délai du debounce
* Utilisation de `localStorage.getItem()` et `localStorage.setItem()` pour la persistance des données

### Captures d'écran
![Recherche](screenshots/Ex2/optimisationRecherche.png)


```

### Exercice 3 : Optimisation et Context
#### Objectif : Gérer le thème global et optimiser les rendus

- [ ] 3.1 Créer le `ThemeContext` pour gérer le thème clair/sombre
- [ ] 3.2 Implémenter le composant `ThemeToggle`
- [ ] 3.3 Utiliser `useCallback` et `useMemo` pour optimiser les performances
- [ ] 3.4 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_
### Captures d'écran
```
Expliquez votre solution ici
### Fonctionnalités réalisées

* Gestion globale du thème avec Context API
* Persistance du thème avec localStorage
* Composant ThemeToggle
* Optimisation avec useCallback
* Optimisation avec React.memo

### capture des ecran

![Theme Light](screenshots/Ex3/clairMode.png)
![Theme Dark](screenshots/Ex3/darkMode.png)

```

### Exercice 4 : Fonctionnalités avancées
#### Objectif : Ajouter des fonctionnalités de chargement et détail

- [ ] 4.1 Implémenter le chargement infini des posts avec `useIntersectionObserver`
- [ ] 4.2 Créer le composant `PostDetails` pour afficher les détails d'un post
- [ ] 4.3 Ajouter la fonctionnalité de filtrage par tags
- [ ] 4.4 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_
```
Expliquez votre solution ici

### Fonctionnalités réalisées

* Chargement infini des posts
* Affichage détaillé d'un post
* Filtrage par tags
* Gestion des événements utilisateur

### Captures d'écran

#### Détail d'un post

![Post Details](screenshots/Ex4/detailsPost.png)

#### Filtrage par tag

![Tag Filter](screenshots/Ex4/amiracainFiltreTag.png)

[Ajoutez vos captures d'écran]
```

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
