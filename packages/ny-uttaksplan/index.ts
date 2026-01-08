import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const nyUttaksplanMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

// TODO (TOR) Desse to burde truleg ikkje bli eksportert
export { andreAugust2022ReglerGjelder } from './src/utils/dateUtils';

export { UttaksplanDataProvider } from './src/context/UttaksplanDataContext';
export { UttaksplanRedigeringProvider } from './src/context/UttaksplanRedigeringContext';

export { UttaksplanNy } from './src/Uttaksplan';
export { KvoteOppsummering } from './src/KvoteOppsummering';
export { UttaksplanKalender } from './src/kalender/UttaksplanKalender';

export { FjernAltIUttaksplanModal } from './src/components/FjernAltIUttaksplanModal';
