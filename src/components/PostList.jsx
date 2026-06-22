import React, { useCallback, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import LoadingSpinner from './LoadingSpinner';

function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true,
}) {
  const { theme } = useTheme();

  // useIntersectionObserver pour le défilement infini (Exercice 4)
  const [ref, inView] = useIntersectionObserver({
    enabled: infiniteScroll && hasMore && !loading,
  });

  useEffect(() => {
    if (inView && infiniteScroll && hasMore && !loading && onLoadMore) {
      onLoadMore();
    }
  }, [inView, infiniteScroll, hasMore, loading, onLoadMore]);

  // useCallback pour les gestionnaires (Exercice 3)
  const handlePostClick = useCallback((post) => {
    if (onPostClick) onPostClick(post);
  }, [onPostClick]);

  const handleTagClick = useCallback((e, tag) => {
    e.stopPropagation();
    if (onTagClick) onTagClick(tag);
  }, [onTagClick]);

  // Exercice 1 : Gérer le cas où il n'y a pas de posts
  if (posts.length === 0 && !loading) {
    return <div className="text-center py-5">Aucun post trouvé.</div>;
  }

  return (
    <div className="post-list">
      {/* Exercice 1 : Afficher la liste des posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className={`card mb-4 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
          onClick={() => handlePostClick(post)}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-body">
            <h4 className="card-title">{post.title}</h4>
            <p className="card-text">{post.body}</p>
            <div>
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="badge bg-primary me-2"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleTagClick(e, tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Spinner de chargement */}
      {loading && <LoadingSpinner />}

      {/* Exercice 4 : Référence pour le défilement infini */}
      {infiniteScroll && hasMore && <div ref={ref} style={{ height: '20px' }} />}

      {/* Exercice 1 : Bouton "Charger plus" pour le mode non-infini */}
      {!infiniteScroll && hasMore && (
        <div className="text-center my-4">
          <button className="btn btn-primary" onClick={onLoadMore}>
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
}

// Exercice 3 : React.memo pour optimiser les rendus
export default React.memo(PostList);