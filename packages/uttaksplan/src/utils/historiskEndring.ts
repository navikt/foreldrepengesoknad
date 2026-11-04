import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { BrukerRolleSak_fpoversikt, UttakDto, UttakPeriodeDto } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { finnAlleUttak, finnUttakForForelder } from './periodeUtils';

export type Datointervall = { fom: string; tom: string };
export type HistoriskEndringstype = 'slettet' | 'endret';

const FORELDRE = ['MOR', 'FAR_MEDMOR'] as const;
const PARTER = ['søker', 'annenPart'] as const;

const finnFørsteDagIMåneden = () => dayjs().startOf('month').format(ISO_DATE_FORMAT);

export const finnHistoriskEndringstype = (
    før: UttakPeriodeDto[],
    etter: UttakPeriodeDto[],
    søker: BrukerRolleSak_fpoversikt,
    kanVelgeArbeidsgiver: boolean,
    førsteDagIMåneden = finnFørsteDagIMåneden(),
): HistoriskEndringstype | undefined => {
    if (harHistoriskFjernetUttak(før, etter, førsteDagIMåneden)) {
        return 'slettet';
    }
    if (harHistoriskFerieEllerGraderingsendring(før, etter, søker, kanVelgeArbeidsgiver, førsteDagIMåneden)) {
        return 'endret';
    }
    return undefined;
};

// Sletting vurderes ut fra perioden brukeren valgte, ikke ved å sammenligne før og etter. Ved forskyving
// bakover fylles hullet av senere uttak, og da ville en sammenligning ikke se at historisk uttak ble slettet.
export const harHistoriskSletting = (
    perioder: UttakPeriodeDto[],
    perioderSomSlettes: Datointervall[],
    førsteDagIMåneden = finnFørsteDagIMåneden(),
): boolean =>
    perioder.some(
        (periode) =>
            finnAlleUttak(periode).length > 0 &&
            perioderSomSlettes.some(
                (slettet) =>
                    periode.fom <= slettet.tom &&
                    slettet.fom <= periode.tom &&
                    (periode.fom > slettet.fom ? periode.fom : slettet.fom) < førsteDagIMåneden,
            ),
    );

// Innholdet i planene er likt for alle dager mellom to påfølgende grenser, så det holder å sjekke første uttaksdag.
const finnHistoriskeDatoerÅSjekke = (
    før: UttakPeriodeDto[],
    etter: UttakPeriodeDto[],
    førsteDagIMåneden: string,
): string[] => {
    const grenser = [
        ...new Set([
            førsteDagIMåneden,
            ...[...før, ...etter].flatMap((p) => [p.fom, dayjs(p.tom).add(1, 'day').format(ISO_DATE_FORMAT)]),
        ]),
    ].sort((a, b) => a.localeCompare(b));

    return grenser.slice(0, -1).flatMap((grense, index) => {
        const dato = Uttaksdagen.denneEllerNeste(grense).getDato();
        return dato < grenser[index + 1]! && dato < førsteDagIMåneden ? [dato] : [];
    });
};

export const harHistoriskFjernetUttak = (
    før: UttakPeriodeDto[],
    etter: UttakPeriodeDto[],
    førsteDagIMåneden: string,
): boolean =>
    finnHistoriskeDatoerÅSjekke(før, etter, førsteDagIMåneden).some((dato) => {
        const periodeFør = finnPeriodePåDato(før, dato);
        const periodeEtter = finnPeriodePåDato(etter, dato);
        return PARTER.some((part) => periodeFør?.[part] !== undefined && periodeEtter?.[part] === undefined);
    });

export const harHistoriskFerieEllerGraderingsendring = (
    før: UttakPeriodeDto[],
    etter: UttakPeriodeDto[],
    søker: BrukerRolleSak_fpoversikt,
    kanVelgeArbeidsgiver: boolean,
    førsteDagIMåneden: string,
): boolean =>
    finnHistoriskeDatoerÅSjekke(før, etter, førsteDagIMåneden).some((dato) => {
        // Listen lagrer ferie med forelder MOR uansett søker, så ferie leses fra søker-delen uten forelderfilter.
        const varFerie = finnPeriodePåDato(før, dato)?.søker?.utsettelseÅrsak === 'FERIE';
        const erFerie = finnPeriodePåDato(etter, dato)?.søker?.utsettelseÅrsak === 'FERIE';

        return (
            varFerie !== erFerie ||
            FORELDRE.some((forelder) =>
                harGraderingsendring(
                    finnUttakPåDato(før, dato, forelder),
                    finnUttakPåDato(etter, dato, forelder),
                    forelder === søker && kanVelgeArbeidsgiver,
                ),
            )
        );
    });

const finnPeriodePåDato = (perioder: UttakPeriodeDto[], dato: string): UttakPeriodeDto | undefined =>
    perioder.find((p) => p.fom <= dato && dato <= p.tom);

const finnUttakPåDato = (
    perioder: UttakPeriodeDto[],
    dato: string,
    forelder: BrukerRolleSak_fpoversikt,
): UttakDto | undefined => {
    const periode = finnPeriodePåDato(perioder, dato);
    return periode ? finnUttakForForelder(periode, forelder) : undefined;
};

const harGraderingsendring = (
    gammeltUttak: UttakDto | undefined,
    nyttUttak: UttakDto | undefined,
    sammenlignAktivitet: boolean,
): boolean => {
    const gammel = gammeltUttak?.gradering;
    const ny = nyttUttak?.gradering;

    if (gammel === undefined || ny === undefined) {
        return gammel !== ny;
    }

    if (gammel.arbeidstidprosent !== ny.arbeidstidprosent) {
        return true;
    }

    if (!sammenlignAktivitet) {
        return false;
    }

    return (
        (gammel.aktivitet?.type ?? 'ANNET') !== (ny.aktivitet?.type ?? 'ANNET') ||
        gammel.aktivitet?.arbeidsgiver?.id !== ny.aktivitet?.arbeidsgiver?.id
    );
};
