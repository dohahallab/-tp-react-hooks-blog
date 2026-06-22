import { useState, useEffect, useCallback, useMemo } from 'react';

function usePosts({ searchTerm = '', tag = '', limit = 10, infinite = true } = {}) {
  // États existants
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États à ajouter pour la pagination (Exercice 1 et 4)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // Construction de l'URL
  const buildApiUrl = useCallback((skip = 0) => {
    let url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
    if (searchTerm) {
      url = `https://dummyjson.com/posts/search?q=${encodeURIComponent(searchTerm)}`;
    } else if (tag) {
      url = `https://dummyjson.com/posts/tag/${encodeURIComponent(tag)}?limit=${limit}&skip=${skip}`;
    }
    return url;
  }, [searchTerm, tag, limit]);

  // Fonction pour charger les posts (Exercice 1)
  const fetchPosts = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      const skip = reset ? 0 : (page - 1) * limit;
      const response = await fetch(buildApiUrl(skip));
      const data = await response.json();
      setPosts(prev => reset ? data.posts : [...prev, ...data.posts]);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [buildApiUrl, page, limit]);

  // useEffect pour charger les posts quand les filtres changent (Exercice 1)
  useEffect(() => {
    setPage(1);
    fetchPosts(true);
  }, [searchTerm, tag, limit, fetchPosts]);

  // Fonction pour charger plus de posts (Exercice 4)
  const loadMorePosts = useCallback(async () => {
    if (!loading && page * limit < total) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchPosts(false);
    }
  }, [fetchPosts, loading, page, limit, total]);

  // useMemo pour calculer les tags uniques (Exercice 3)
  const availableTags = useMemo(() => {
    return [...new Set(posts.flatMap(post => post.tags || []))];
  }, [posts]);

  // Fonction pour charger un post par son ID (Exercice 4)
  const loadPost = useCallback(async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      const data = await response.json();
      setSelectedPost(data);
    } catch (err) {
      console.error('Erreur lors du chargement du post:', err);
    }
  }, []);

  return {
    posts,
    loading,
    error,
    total,
    availableTags,
    selectedPost,
    setSelectedPost,
    loadPost,
    loadMorePosts,
  };
}

export default usePosts;