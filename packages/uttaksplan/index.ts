import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const nyUttaksplanMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { UttaksplanDataProvider } from './src/context/UttaksplanDataContext';
export { UttaksplanRedigeringProvider } from './src/context/UttaksplanRedigeringContext';

export { UttaksplanListe } from './src/liste/UttaksplanListe';
export { KvoteOppsummering } from './src/KvoteOppsummering';
export { UttaksplanKalender } from './src/kalender/UttaksplanKalender';

export { HvaErMulig } from './src/infobokser/hva-er-mulig/HvaErMulig';
export { UforutsetteEndringer } from './src/infobokser/uforutsette-endringer/UforutsetteEndringer';

export { FjernAltIUttaksplanModal } from './src/FjernAltIUttaksplanModal';
export { useErAntallDagerOvertrukketIUttaksplan } from './src/utils/kvoteOppsummeringUtils';
export { UttaksperiodeValidatorer } from './src/utils/UttaksperiodeValidatorer';
export { skalBesvareFlerbarnsdager } from './src/felles/LeggTilEllerEndrePeriodeFellesForm';
export { deltUttak, getTidsperiodeString, sorterPerioder } from './src/utils/forslag/deltUttak';
export { ikkeDeltUttak } from './src/utils/forslag/ikkeDeltUttak';
export type { IkkeDeltUttakParams } from './src/utils/forslag/ikkeDeltUttak';
