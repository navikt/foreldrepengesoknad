import { Familiesituasjon, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { LeggTilEllerEndrePeriodeFormFormValues } from '../felles/LeggTilEllerEndrePeriodeFellesForm';
import { ForeldreInfo } from '../types/ForeldreInfo';

export type Periode = { fom: string; tom: string };

/**
 * Felles input til alle regelgrupper. Bygd opp av useFormSubmitValidator
 * fra skjemaverdier + kontekstdata.
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
 * En enkelt valideringsregel uttrykt som data.
 *
 * - `beskrivelse` er klartekst som en saksbehandler eller designer kan lese
 *   for å forstå hva regelen handler om.
 * - `erBrutt` tar imot en ferdig kontekst fra regelgruppen og avgjør om
 *   regelen er brutt.
 * - `feilmeldingId` er intl-nøkkelen som blir vist til brukeren.
 */
export type Regel<TCtx> = {
    id: string;
    beskrivelse: string;
    erBrutt: (kontekst: TCtx) => boolean;
    feilmeldingId: string;
};

/**
 * En gruppe regler med felles forutsetning og felles kontekst.
 *
 * - `byggKontekst` returnerer `null` når gruppen ikke er relevant (f.eks. når
 *   skjemaet ikke har fylt ut alt som trengs, eller når situasjonen ikke
 *   passer). Reglene i gruppen blir da hoppet over.
 * - Reglene blir evaluert i rekkefølge, og første brutte regel vinner.
 */
export type Regelgruppe<TCtx> = {
    id: string;
    beskrivelse: string;
    byggKontekst: (input: ValideringInput) => TCtx | null;
    regler: ReadonlyArray<Regel<TCtx>>;
};

/** Returnerer første regel som er brutt, eller undefined. */
export const førsteBrutteRegel = <TCtx>(
    regler: ReadonlyArray<Regel<TCtx>>,
    kontekst: TCtx,
): Regel<TCtx> | undefined => regler.find((regel) => regel.erBrutt(kontekst));

/**
 * Identitetshjelper som markerer en streng som en intl-id. Brukt for at
 * intl-testene skal oppdage at id-en faktisk er i bruk i koden.
 */
export const i18n = (id: string): string => id;
