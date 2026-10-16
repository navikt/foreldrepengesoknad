import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { BrukerRolleSak_fpoversikt, UttakDto, UttakPeriodeDto } from '@navikt/fp-types';

import { finnAlleUttak, finnUttakForForelder } from '../../../utils/periodeUtils';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Datointervall = { fom: string; tom: string };

type Graderingssammenligning = {
    søker: BrukerRolleSak_fpoversikt;
    kanVelgeArbeidsgiver: boolean;
    erPeriodeneTilAnnenPartLåst: boolean;
    førsteDagIMåneden: string;
};

const overlapper = (a: Datointervall, b: Datointervall): boolean =>
    dayjs(a.fom).isSameOrBefore(dayjs(b.tom), 'day') && dayjs(b.fom).isSameOrBefore(dayjs(a.tom), 'day');

const harHistoriskOverlapp = (intervall: Datointervall, førsteDagIMåneden: string): boolean => {
    const intervallStart = dayjs(intervall.fom);
    return intervallStart.isBefore(dayjs(førsteDagIMåneden), 'day');
};

export const harHistoriskeDatoer = (perioder: Datointervall[], førsteDagIMåneden: string): boolean =>
    perioder.some((periode) => harHistoriskOverlapp(periode, førsteDagIMåneden));

export const harHistoriskFerieendring = (
    eksisterendePerioder: UttakPeriodeDto[],
    nyePerioder: UttakPeriodeDto[],
    søker: BrukerRolleSak_fpoversikt,
    førsteDagIMåneden: string,
): boolean => {
    for (const nyPeriode of nyePerioder) {
        let dato = dayjs(nyPeriode.fom);
        const tom = dayjs(nyPeriode.tom);

        while (dato.isBefore(tom, 'day') || dato.isSame(tom, 'day')) {
            if (dato.isBefore(dayjs(førsteDagIMåneden), 'day')) {
                const nyttUttak = finnUttakPåDato(nyePerioder, dato, søker);
                const gammeltUttak = finnUttakPåDato(eksisterendePerioder, dato, søker);

                if (nyttUttak?.utsettelseÅrsak === 'FERIE' && gammeltUttak?.utsettelseÅrsak !== 'FERIE') {
                    return true;
                }
            }

            dato = dato.add(1, 'day');
        }
    }

    return false;
};

export const harHistoriskSletting = (
    perioder: UttakPeriodeDto[],
    perioderSomSlettes: Datointervall[],
    førsteDagIMåneden: string,
): boolean =>
    perioder.some(
        (periode) =>
            finnAlleUttak(periode).length > 0 &&
            perioderSomSlettes.some(
                (slettetIntervall) =>
                    overlapper(periode, slettetIntervall) &&
                    harHistoriskOverlapp(
                        {
                            fom: dayjs(periode.fom).isAfter(dayjs(slettetIntervall.fom), 'day')
                                ? periode.fom
                                : slettetIntervall.fom,
                            tom: dayjs(periode.tom).isBefore(dayjs(slettetIntervall.tom), 'day')
                                ? periode.tom
                                : slettetIntervall.tom,
                        },
                        førsteDagIMåneden,
                    ),
            ),
    );

export const harHistoriskGraderingsendring = (
    eksisterendePerioder: UttakPeriodeDto[],
    nyePerioder: UttakPeriodeDto[],
    sammenligning: Graderingssammenligning,
): boolean =>
    harHistoriskeDatoer(
        finnPerioderMedEndretGradering(eksisterendePerioder, nyePerioder, sammenligning),
        sammenligning.førsteDagIMåneden,
    );

export const finnPerioderMedEndretGradering = (
    eksisterendePerioder: UttakPeriodeDto[],
    nyePerioder: UttakPeriodeDto[],
    sammenligning: Omit<Graderingssammenligning, 'førsteDagIMåneden'>,
): Datointervall[] => {
    const endredePerioder: Datointervall[] = [];

    for (const nyPeriode of nyePerioder) {
        let dato = dayjs(nyPeriode.fom);
        const tom = dayjs(nyPeriode.tom);
        let endretFra: string | undefined;

        while (dato.isBefore(tom, 'day') || dato.isSame(tom, 'day')) {
            const erEndret = (['MOR', 'FAR_MEDMOR'] as const).some((forelder) => {
                const gammelUttak = finnUttakPåDato(eksisterendePerioder, dato, forelder);
                const nyttUttak = finnUttakForForelder(nyPeriode, forelder);
                const erLåstAnnenPart = sammenligning.erPeriodeneTilAnnenPartLåst && forelder !== sammenligning.søker;

                if (erLåstAnnenPart && !nyttUttak) {
                    return false;
                }

                return harGraderingsendring(
                    gammelUttak,
                    nyttUttak,
                    forelder === sammenligning.søker && sammenligning.kanVelgeArbeidsgiver,
                );
            });

            if (erEndret) {
                endretFra ??= dato.format('YYYY-MM-DD');
            } else if (endretFra) {
                endredePerioder.push({ fom: endretFra, tom: dato.subtract(1, 'day').format('YYYY-MM-DD') });
                endretFra = undefined;
            }

            dato = dato.add(1, 'day');
        }

        if (endretFra) {
            endredePerioder.push({ fom: endretFra, tom: nyPeriode.tom });
        }
    }

    return endredePerioder;
};

const finnUttakPåDato = (
    perioder: UttakPeriodeDto[],
    dato: Dayjs,
    forelder: BrukerRolleSak_fpoversikt,
): UttakDto | undefined => {
    const periode = perioder.find(
        (p) => dayjs(p.fom).isSameOrBefore(dato, 'day') && dayjs(p.tom).isSameOrAfter(dato, 'day'),
    );

    return periode ? finnUttakForForelder(periode, forelder) : undefined;
};

const harGraderingsendring = (
    gammelUttak: UttakDto | undefined,
    nyttUttak: UttakDto | undefined,
    sammenlignAktivitet: boolean,
): boolean => {
    const gammelGradering = gammelUttak?.gradering;
    const nyGradering = nyttUttak?.gradering;

    if (gammelGradering === undefined || nyGradering === undefined) {
        return gammelGradering !== nyGradering;
    }

    if (gammelGradering.arbeidstidprosent !== nyGradering.arbeidstidprosent) {
        return true;
    }

    if (!sammenlignAktivitet) {
        return false;
    }

    const gammelAktivitet = gammelGradering.aktivitet;
    const nyAktivitet = nyGradering.aktivitet;

    return (
        (gammelAktivitet?.type ?? 'ANNET') !== (nyAktivitet?.type ?? 'ANNET') ||
        gammelAktivitet?.arbeidsgiver?.id !== nyAktivitet?.arbeidsgiver?.id
    );
};
