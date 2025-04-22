import { useEffect, useState } from 'react';

export default function useOrientation() {
    const getOrientation = () =>
        window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';

    const [orientation, setOrientation] = useState(getOrientation());

    useEffect(() => {
        const handler = () => setOrientation(getOrientation());

        window.addEventListener('resize', handler);
        window.addEventListener('orientationchange', handler);

        return () => {
        window.removeEventListener('resize', handler);
        window.removeEventListener('orientationchange', handler);
        };
    }, []);

  return orientation;
}
