import { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';

/**
 * Avgjør om brukeren skal få spørsmål om flerbarnsdager for en gitt periode.
 *
 * Flerbarnsdager er ekstra dager som tilkommer ved flere barn — men de
 * tilfaller bare den forelderen som ikke har mødrekvote/aktivitetsfri kvote.
 * Mor svarer normalt ikke på flerbarnsdager (hun har dem automatisk), med
 * mindre hun har valgt en periode med samtidig uttak i stedet for en periode
 * der hun er alene hjemme med barnet — da skal hun også besvare spørsmålet.
 *
 * Brukt både av selve uttaksplanen og av oppsummeringssteget i
 * foreldrepengesoknad-appen — derfor lever den i et nøytralt util-modul
 * og re-eksporteres fra pakkens public API.
 */
export const skalBesvareFlerbarnsdager = (
    antallBarn: number,
    forelder: BrukerRolleSak_fpoversikt | 'BEGGE' | undefined,
    kontotype: KontoTypeUttak | undefined,
    samtidigUttak: number | undefined,
): boolean =>
    antallBarn > 1 &&
    kontotype !== 'MØDREKVOTE' &&
    kontotype !== 'AKTIVITETSFRI_KVOTE' &&
    (forelder !== 'MOR' || samtidigUttak !== undefined);
