import { useEffect } from 'react';

import { useMedia } from '@navikt/fp-utils';

export const useErDesktop = () => useMedia('screen and (min-width: 768px)');

export const useMediaRemoveScrollingOnMobile = (erMinimert: boolean) => {
    // For å fjerne scrolling på bakgrunn på mobil
    const isDesktop = useErDesktop();
    useEffect(() => {
        document.body.style.overflow = '';
        if (!isDesktop && !erMinimert) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isDesktop, erMinimert]);
};

export const useMediaResetMinimering = (setErMinimert: (value: boolean) => void) => {
    const isDesktop = useMedia('screen and (min-width: 768px)');

    // For å nullstille minimering når en går fra mobil til desktop
    useEffect(() => {
        if (isDesktop) {
            setErMinimert(false);
        }
    }, [isDesktop, setErMinimert]);
};
