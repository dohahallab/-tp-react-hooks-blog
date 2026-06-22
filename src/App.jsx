import React, { useState, useCallback } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostSearch from "./components/PostSearch";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";
import PostDetails from "./components/PostDetails";
import usePosts from "./hooks/usePosts";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { theme } = useTheme();

  // États pour la recherche et le tag
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Hook usePosts
  const {
    posts,
    loading,
    error,
    total,
    availableTags,
    selectedPost,
    setSelectedPost,
    loadPost,
    loadMorePosts,
  } = usePosts({
    searchTerm,
    tag: selectedTag,
  });

  // Stockage local pour le mode de défilement
  const [infiniteScroll, setInfiniteScroll] = useLocalStorage(
    "infiniteScroll",
    true
  );

  // Gestionnaires optimisés
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleTagSelect = useCallback((tag) => {
    setSelectedTag(tag);
  }, []);

  const handlePostClick = useCallback((post) => {
    loadPost(post.id);
  }, [loadPost]);

  const handleInfiniteScrollChange = useCallback((e) => {
    setInfiniteScroll(e.target.checked);
  }, [setInfiniteScroll]);

  return (
    <div className={`container ${theme}`}>
      <header className="py-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1>📝 Blog</h1>
          <div className="d-flex align-items-center gap-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="infiniteScroll"
                checked={infiniteScroll}
                onChange={handleInfiniteScrollChange}
              />
              <label className="form-check-label" htmlFor="infiniteScroll">
                Défilement infini
              </label>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <PostSearch
        onSearch={handleSearchChange}
        onTagSelect={handleTagSelect}
        availableTags={availableTags}
        selectedTag={selectedTag}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <PostList
        posts={posts}
        loading={loading}
        hasMore={posts.length < total}
        onLoadMore={loadMorePosts}
        onPostClick={handlePostClick}
        onTagClick={handleTagSelect}
        infiniteScroll={infiniteScroll}
      />

      {selectedPost && (
        <PostDetails
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onTagClick={handleTagSelect}
        />
      )}

      <footer className="text-center mt-5 py-3 border-top">
        TP React Hooks - Blog · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;