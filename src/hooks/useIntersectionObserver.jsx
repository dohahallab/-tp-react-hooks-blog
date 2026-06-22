import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver({
  enabled = true,
  threshold = 0.1,
  rootMargin = '0px',
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [enabled, threshold, rootMargin]);

  return [ref, isIntersecting];
}

export default useIntersectionObserver;