/**
 * ⚠️ VIKTIG – LES FØR DU LEGGER TIL NOE HER ⚠️
 *
 * Denne barrelen re-eksporterer BÅDE tunge UI-komponenter/algoritmer
 * (UttaksplanKalender, UttaksplanListe, KvoteOppsummering, forslagsmotoren
 * i src/utils/forslag, modaler osv.) OG noen få små, lette util-funksjoner
 * (UttaksperiodeValidatorer, skalBesvareFlerbarnsdager,
 * finnAntallTidelerÅTrekke, nyUttaksplanMessages).
 *
 * Uttaksplan-steget i foreldrepengesoknad er lazy-lastet (React.lazy) nettopp
 * fordi @navikt/fp-uttaksplan er den klart tyngste pakken i appen. Men flere
 * steder ELLERS i foreldrepengesoknad (bl.a. AppContainer.tsx og
 * useStepConfig-kjeden, som brukes av absolutt alle steg) trenger noen av de
 * lette util-funksjonene, og importerer dem IKKE via denne barrelen, men via
 * egne subpaths i package.json sitt "exports"-kart:
 *
 *   @navikt/fp-uttaksplan/validators       (UttaksperiodeValidatorer)
 *   @navikt/fp-uttaksplan/flerbarnsdager   (skalBesvareFlerbarnsdager)
 *   @navikt/fp-uttaksplan/periode-utils    (finnAntallTidelerÅTrekke m.fl.)
 *   @navikt/fp-uttaksplan/intl             (nyUttaksplanMessages)
 *
 * Dette er IKKE kosmetikk. Det er empirisk bekreftet (via faktiske
 * produksjonsbygg) at Rollup drar HELE modulgrafen bak denne barrelen inn i
 * appens hovedbunt så snart ÉN eneste eagerly-lastet (ikke-lazy) fil et sted
 * i appen importerer NOE som helst fra '@navikt/fp-uttaksplan' direkte – selv
 * om det bare er én liten funksjon. Tree-shaking hjelper ikke her, fordi hele
 * barrel-modulen likevel evalueres/inkluderes i den eagerly-lastede chunken.
 * Resultat forrige gang dette skjedde: hele Uttaksplan-lazy-splittingen ble
 * i praksis nullet ut, og hovedbunten var ~236 kB gzip større enn den trengte
 * å være.
 *
 * Derfor:
 * 1. IKKE legg til nye eager (ikke-lazy) importer av '@navikt/fp-uttaksplan'
 *    (denne barrelen) noe sted i foreldrepengesoknad utenfor det
 *    lazy-lastede Uttaksplan-steget (steps/uttaksplan/**).
 * 2. Trenger du en ny liten, lett util-funksjon herfra utenfor det lazy-lastede
 *    steget – legg den til som en EGEN, navngitt subpath i
 *    packages/uttaksplan/package.json sitt "exports"-kart (samme mønster som
 *    ./validators, ./flerbarnsdager osv.), IKKE bare i denne barrelen.
 * 3. Bruk aldri rå "@navikt/fp-uttaksplan/src/..."-importer for å omgå dette –
 *    det er eksplisitt forbudt av no-restricted-imports-regelen i
 *    packages/config-eslint/eslint.config.mjs.
 * 4. Endrer du noe her, bygg appen (pnpm --filter foreldrepengesoknad build)
 *    og sjekk at UttaksplanSteg-chunken fortsatt er stor (~900 kB / ~240 kB
 *    gzip) og at hovedbunten ikke har vokst tilbake.
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
