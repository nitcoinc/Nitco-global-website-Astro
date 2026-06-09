import { useState, useEffect } from 'react';

/**
 * Scroll-to-top button island.
 * Appears when user scrolls past 100px; hidden at top.
 */
export default function GoTop() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 100) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 100) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  });

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="go-top"
      onClick={scrollTop}
      style={{ display: showScroll ? 'block' : 'none' }}
      aria-hidden="true"
    >
      <i className="bx bx-up-arrow-alt"></i>
    </div>
  );
}
