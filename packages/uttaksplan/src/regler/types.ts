import { Familiesituasjon, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { LeggTilEllerEndrePeriodeFormFormValues } from '../felles/LeggTilEllerEndrePeriodeFellesForm';
import { ForeldreInfo } from '../types/ForeldreInfo';

export type Periode = { fom: string; tom: string };

/**
 * Felles input til alle regelgrupper. Bygd opp av useFormSubmitValidator
 * frå skjemaverdiar + kontekstdata.
 */
export type ValideringInput = {
    formValues: LeggTilEllerEndrePeriodeFormFormValues;
    perioder: Periode[];
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    familiehendelsedato: string;
    familiesituasjon: Familiesituasjon;
    termindato: string | undefined;
    foreldreInfo: ForeldreInfo;
    erEndringssøknad: boolean;
};

/**
 * Ein einskild valideringsregel uttrykt som data.
 *
 * - `beskrivelse` er klartekst som ein saksbehandlar eller designar kan lese
 *   for å forstå kva regelen handlar om.
 * - `erBrote` tek imot ein førebudd kontekst frå regelgruppa og avgjer om
 *   regelen er brote.
 * - `feilmeldingId` er intl-nøkkelen som blir vist til brukaren.
 */
export type Regel<TCtx> = {
    id: string;
    beskrivelse: string;
    erBrote: (kontekst: TCtx) => boolean;
    feilmeldingId: string;
};

/**
 * Ei gruppe reglar med felles forutsetning og felles kontekst.
 *
 * - `byggKontekst` returnerer `null` når gruppa ikkje er relevant (t.d. når
 *   skjemaet ikkje har fylt ut alt som trengst, eller når situasjonen ikkje
 *   passar). Reglane i gruppa blir då hoppa over.
 * - Reglane blir evaluert i rekkjefølgje, og første brote regel vinn.
 */
export type Regelgruppe<TCtx> = {
    id: string;
    beskrivelse: string;
    byggKontekst: (input: ValideringInput) => TCtx | null;
    regler: ReadonlyArray<Regel<TCtx>>;
};

/** Returnerer første regel som er brote, eller undefined. */
export const førsteBroteRegel = <TCtx>(
    regler: ReadonlyArray<Regel<TCtx>>,
    kontekst: TCtx,
): Regel<TCtx> | undefined => regler.find((regel) => regel.erBrote(kontekst));

/**
 * Identitetshjelpar som markerer ein streng som ein intl-id. Brukt for at
 * intl-testane skal oppdage at id-en faktisk er i bruk i koden.
 */
export const i18n = (id: string): string => id;
