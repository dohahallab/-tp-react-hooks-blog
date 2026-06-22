import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

function PostDetails({ post, onClose, onTagClick }) {
  const { theme } = useTheme();

  const themeClasses = useMemo(() => ({
    card: theme === 'dark'
      ? 'card mb-4 bg-dark text-light border-secondary'
      : 'card mb-4',
    button: theme === 'dark'
      ? 'btn btn-sm btn-outline-light'
      : 'btn btn-sm btn-outline-secondary',
  }), [theme]);

  if (!post) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className={themeClasses.card}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{post.title}</h5>
            <button className={themeClasses.button} onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="card-body">
            <p>{post.body}</p>
            <div className="mt-3">
              <small className="text-muted">
                Par {post.userId} - {post.reactions} réactions
              </small>
            </div>
            <div className="mt-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="badge bg-info me-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onTagClick && onTagClick(tag)}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostDetails);