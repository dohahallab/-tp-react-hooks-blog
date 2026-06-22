import React, { useState, useCallback, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

function PostSearch({
  onSearch,
  onTagSelect,
  availableTags = [],
  selectedTag = '',
}) {
  const [searchInput, setSearchInput] = useState('');
  const { theme } = useTheme();

  // useCallback pour optimiser le gestionnaire (Exercice 3)
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  }, [onSearch]);

  // Exercice 1 : Bouton pour effacer la recherche
  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    onSearch('');
  }, [onSearch]);

  // Exercice 3 : Classes CSS en fonction du thème
  const themeClasses = useMemo(() => ({
    input: theme === 'dark' ? 'form-control bg-dark text-light border-secondary' : 'form-control',
    select: theme === 'dark' ? 'form-select bg-dark text-light border-secondary' : 'form-select',
    button: theme === 'dark' ? 'btn btn-outline-light' : 'btn btn-outline-secondary',
  }), [theme]);

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6">
        <div className="input-group">
          <input
            type="text"
            className={themeClasses.input}
            placeholder="Rechercher un article..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          {/* Exercice 1 : Bouton pour effacer la recherche */}
          {searchInput && (
            <button
              className={themeClasses.button}
              type="button"
              onClick={handleClearSearch}
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="col-md-6">
        {/* Exercice 4 : Sélecteur de tags */}
        <select
          className={themeClasses.select}
          value={selectedTag}
          onChange={(e) => onTagSelect(e.target.value)}
        >
          <option value="">Tous les tags</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Exercice 3 : React.memo pour optimiser les rendus
export default React.memo(PostSearch);