/**
 * ⚠️ Denne barrelen drar med seg HELE pakken (kalender, lister, forslagsmotor)
 * inn i hovedbunten hvis noe eagerly-lastet (ikke-lazy) kode importerer fra
 * den – selv én liten funksjon er nok. Uttaksplan-steget er lazy-lastet
 * nettopp for å unngå dette.
 *
 * Trenger kode utenfor steps/uttaksplan/** en util herfra: legg til en egen
 * subpath i package.json sitt "exports"-kart (se ./validators, ./intl,
 * ./delt-uttak osv.) i stedet for å importere fra denne barrelen eller fra
 * /src/-stier direkte.
 */
export { nyUttaksplanMessages } from './src/intl/nyUttaksplanMessages';

export { UttaksplanDataProvider } from './src/context/UttaksplanDataContext';
export { UttaksplanRedigeringProvider } from './src/context/UttaksplanRedigeringContext';

export { UttaksplanListe } from './src/liste/UttaksplanListe';
export { KvoteOppsummering } from './src/KvoteOppsummering';
export { UttaksplanKalender } from './src/kalender/UttaksplanKalender';

export { HvaErMulig } from './src/infobokser/hva-er-mulig/HvaErMulig';
export { UforutsetteEndringer } from './src/infobokser/uforutsette-endringer/UforutsetteEndringer';

export { FjernAltIUttaksplanModal } from './src/FjernAltIUttaksplanModal';
export { TilbakestillPlanModal } from './src/TilbakestillPlanModal';
export { useErAntallDagerOvertrukketIUttaksplan } from './src/utils/kvoteOppsummeringUtils';
export { UttaksperiodeValidatorer } from './src/utils/UttaksperiodeValidatorer';
export { skalBesvareFlerbarnsdager } from './src/utils/flerbarnsdager';
export {
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
    finnAntallTidelerÅTrekke,
    erPerioderEkslFomTomLike,
} from './src/utils/periodeUtils';
export { prosesserPerioderForVisning } from './src/utils/prosesserPerioderForVisning';
export { deltUttak } from './src/utils/forslag/deltUttak';
export { ikkeDeltUttak } from './src/utils/forslag/ikkeDeltUttak';
