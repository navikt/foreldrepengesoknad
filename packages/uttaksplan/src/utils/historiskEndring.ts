import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { BrukerRolleSak_fpoversikt, UttakDto, UttakPeriodeDto } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { finnAlleUttak, finnUttakForForelder } from './periodeUtils';

type Datointervall = { fom: string; tom: string };

const FORELDRE = ['MOR', 'FAR_MEDMOR'] as const;

export const harHistoriskSletting = (
    perioder: UttakPeriodeDto[],
    perioderSomSlettes: Datointervall[],
    førsteDagIMåneden: string,
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
export const harHistoriskFerieEllerGraderingsendring = (
    før: UttakPeriodeDto[],
    etter: UttakPeriodeDto[],
    søker: BrukerRolleSak_fpoversikt,
    kanVelgeArbeidsgiver: boolean,
    førsteDagIMåneden: string,
): boolean => {
    const grenser = [
        ...new Set([
            førsteDagIMåneden,
            ...[...før, ...etter].flatMap((p) => [p.fom, dayjs(p.tom).add(1, 'day').format(ISO_DATE_FORMAT)]),
        ]),
    ].sort((a, b) => a.localeCompare(b));

    return grenser.slice(0, -1).some((grense, index) => {
        const dato = Uttaksdagen.denneEllerNeste(grense).getDato();
        if (dato >= grenser[index + 1]! || dato >= førsteDagIMåneden) {
            return false;
        }

        const varFerie = finnUttakPåDato(før, dato, søker)?.utsettelseÅrsak === 'FERIE';
        const erFerie = finnUttakPåDato(etter, dato, søker)?.utsettelseÅrsak === 'FERIE';

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
};

const finnUttakPåDato = (
    perioder: UttakPeriodeDto[],
    dato: string,
    forelder: BrukerRolleSak_fpoversikt,
): UttakDto | undefined => {
    const periode = perioder.find((p) => p.fom <= dato && dato <= p.tom);
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
