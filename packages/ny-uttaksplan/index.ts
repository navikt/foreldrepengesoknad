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

export { FjernAltIUttaksplanModal } from './src/FjernAltIUttaksplanModal';
export { useErAntallDagerOvertrukketIUttaksplan } from './src/utils/kvoteOppsummeringUtils';

export { erEøsUttakPeriode } from './src/types/UttaksplanPeriode';

export { erPeriodeIMellomToUkerFørFamdatoOgSeksUkerEtter } from './src/utils/periodeUtils';
export { loggExpansionCardOpen } from './src/utils/umamiUtils';

export {
    utledHvemSomHarRett,
    harKunMedmorEllerFarSøker2Rett,
    harKunFarSøker1Rett,
    harMorRett,
    harKunMorRett,
    utledRettighet,
} from './src/utils/hvemHarRettUtils';
export { erBarnetFødt, erBarnetAdoptert, erBarnetUFødt } from './src/utils/barnetUtils';
export {
    erAlenesøker,
    erFarDelAvSøknaden,
    erFarOgFar,
    erMorDelAvSøknaden,
    erMedmorDelAvSøknaden,
    erFarSøker2,
    getNavnPåSøker1,
    getNavnPåSøker2,
    getNavnPåForeldre,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    erFlereSøkere,
    getErFarEllerMedmor,
    finnSøker1Tekst,
    finnSøker2Tekst,
} from './src/utils/HvemPlanleggerUtils';
export { UforutsetteEndringer } from './src/bokser/uforutsette-endringer/UforutsetteEndringer';
export type { Fordeling } from './src/types/Fordeling';
export type { Arbeidssituasjon } from './src/types/Arbeidssituasjon';
export { Arbeidsstatus } from './src/types/Arbeidssituasjon';
export type { OmBarnet, BarnetErAdoptert, BarnetErFødt, BarnetErIkkeFødt } from './src/types/Barnet';
export type { HvemPlanlegger } from './src/types/HvemPlanlegger';
export type { HvorMye } from './src/types/HvorMye';
export type { HvorLangPeriode } from './src/types/HvorLangPeriode';
export type { PlanForslag } from './src/types/PlanForslag';
export type { HvemHarRett } from './src/utils/hvemHarRettUtils';
export { HvaErMulig } from './src/bokser/hva-er-mulig/HvaErMulig';
