import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        globalThis.scrollTo(0, 0);
    }, [pathname]);

    return null;
};
