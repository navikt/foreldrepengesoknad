import { Familiesituasjon, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { LeggTilEllerEndrePeriodeFormFormValues } from '../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { ForeldreInfo } from '../../types/ForeldreInfo';
import { Periode } from '../types';

export { type Periode } from '../types';

/**
 * Felles input til alle valideringsområder. Bygd opp av useFormSubmitValidator
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
 * - `erBrutt` tar imot en ferdig kontekst fra regelområdet og avgjør om
 *   regelen er brutt.
 * - `feilmelding` er ferdig formatert tekst som blir vist til brukeren.
 */
export type Valideringsregel<TCtx> = {
    id: string;
    beskrivelse: string;
    erBrutt: (kontekst: TCtx) => boolean;
    feilmelding: string;
};

/**
 * Et område med valideringsregler som deler en felles forutsetning og en felles
 * kontekst. Følger samme mønster som de andre regelkatalogene (alert, synlighet,
 * felt, kvotetype), med tillegg av `byggKontekst` som er spesifikk for validering.
 *
 * - `byggKontekst` returnerer `null` når området ikke er relevant (f.eks. når
 *   skjemaet ikke har fylt ut alt som trengs, eller når situasjonen ikke
 *   passer). Reglene i området blir da hoppet over.
 * - Reglene blir evaluert i rekkefølge, og første brutte regel vinner.
 */
export type Valideringsområde<TCtx> = {
    id: string;
    område: string;
    beskrivelse: string;
    byggKontekst: (input: ValideringInput) => TCtx | null;
    regler: ReadonlyArray<Valideringsregel<TCtx>>;
};

/** Returnerer første regel som er brutt, eller undefined. */
export const førsteBrutteValideringsregel = <TCtx>(
    regler: ReadonlyArray<Valideringsregel<TCtx>>,
    kontekst: TCtx,
): Valideringsregel<TCtx> | undefined => regler.find((regel) => regel.erBrutt(kontekst));
