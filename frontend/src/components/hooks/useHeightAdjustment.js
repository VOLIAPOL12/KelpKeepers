import { useEffect } from 'react';

export default function useHeightAdjustment(heroRef) {
  useEffect(() => {
    const updateHeight = () => {
      if (heroRef.current) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const windowHeight = window.innerHeight;
        heroRef.current.style.height = `${windowHeight - navbarHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [heroRef]);
}
