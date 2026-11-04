import { useEffect } from 'react';

import { useBreakpoints } from '@navikt/fp-utils';

export const useMediaRemoveScrollingOnMobile = (erMinimert: boolean) => {
    // For å fjerne scrolling på bakgrunn på mobil
    const { isAtLeast768px } = useBreakpoints();
    useEffect(() => {
        document.body.style.overflow = '';
        if (!isAtLeast768px && !erMinimert) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isAtLeast768px, erMinimert]);
};

export const useMediaResetMinimering = (setErMinimert: (value: boolean) => void) => {
    const { isAtLeast768px } = useBreakpoints();

    // For å nullstille minimering når en går fra mobil til desktop
    useEffect(() => {
        if (isAtLeast768px) {
            setErMinimert(false);
        }
    }, [isAtLeast768px, setErMinimert]);
};
