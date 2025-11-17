import { useEffect } from 'react';

import { useMedia } from '@navikt/fp-utils';

import { useKalenderRedigeringContext } from '../context/KalenderRedigeringContext';

export const useMediaActions = () => {
    const { erMinimert, erIRedigeringsmodus, setErMinimert } = useKalenderRedigeringContext();

    // For å fjerne scrolling på bakgrunn på mobil
    const isDesktop = useMedia('screen and (min-width: 768px)');
    useEffect(() => {
        document.body.style.overflow = '';
        if (!isDesktop && !erMinimert && erIRedigeringsmodus) {
            document.body.style.overflow = 'hidden';
        }
    }, [isDesktop, erMinimert]);

    // For å nullstille minimering når en går fra mobil til desktop
    useEffect(() => {
        if (isDesktop) {
            setErMinimert(false);
        }
    }, [isDesktop]);
};
