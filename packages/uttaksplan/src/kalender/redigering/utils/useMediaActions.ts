import { useEffect } from 'react';

import { useBreakpoints } from '@navikt/fp-utils';

export const useMediaRemoveScrollingOnMobile = (erMinimert: boolean) => {
    // For å fjerne scrolling på bakgrunn på mobil
    const { isMinWidth768 } = useBreakpoints();
    useEffect(() => {
        document.body.style.overflow = '';
        if (!isMinWidth768 && !erMinimert) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMinWidth768, erMinimert]);
};

export const useMediaResetMinimering = (setErMinimert: (value: boolean) => void) => {
    const { isMinWidth768 } = useBreakpoints();

    // For å nullstille minimering når en går fra mobil til desktop
    useEffect(() => {
        if (isMinWidth768) {
            setErMinimert(false);
        }
    }, [isMinWidth768, setErMinimert]);
};
