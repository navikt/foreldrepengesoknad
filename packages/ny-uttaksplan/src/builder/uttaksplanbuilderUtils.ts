import dayjs from 'dayjs';

import { Tidsperiode } from '@navikt/fp-types';
import { TidsperiodenString, UttaksdagenString } from '@navikt/fp-utils';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { Perioden } from '../utils/Perioden';
import { Periodene, sorterPerioder } from '../utils/Periodene';
import {
    andreAugust2022ReglerGjelder,
    førsteOktober2021ReglerGjelder,
    tidperiodeOverlapperDato,
} from '../utils/dateUtils';
import {
    isHull,
    isPeriodeUtenUttak,
    isUtsettelsesperiodeAnnenPart,
    isUttaksperiode,
    normaliserPerioder,
} from '../utils/periodeUtils';

// TODO (TOR) Flytt desse funksjonane til utils-folder, evt ei ny folder for massering av periodar før visning. Er ikkje relatert til builder

const splittPeriodePåDato = (periode: Planperiode, dato: string): Planperiode[] => {
    const periodeFørDato: Planperiode = {
        ...periode,
        fom: periode.fom,
        tom: UttaksdagenString(dato).forrige(),
    };

    const periodeFraOgMedDato: Planperiode = {
        ...periode,
        fom: UttaksdagenString(periodeFørDato.tom).neste(),
        tom: periode.tom,
    };

    return [periodeFørDato, periodeFraOgMedDato];
};

export const slåSammenLikePerioder = (
    perioder: Planperiode[],
    familiehendelsesdato: string,
    førsteUttaksdagNesteBarnsSak: string | undefined,
    annenPartsUttak?: Planperiode[],
): Planperiode[] => {
    if (perioder.length <= 1) {
        return perioder;
    }
    const nyePerioder: Planperiode[] = [];
    let forrigePeriode: Planperiode | undefined = { ...perioder[0]! };
    perioder.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }
        if (
            Perioden(forrigePeriode).erLik(periode, false, true) &&
            Perioden(forrigePeriode).erSammenhengende(periode)
        ) {
            if (
                annenPartsUttak &&
                isUttaksperiode(periode) &&
                !periode.erAnnenPartEøs &&
                periode.samtidigUttak &&
                isUttaksperiode(forrigePeriode) &&
                !forrigePeriode.erAnnenPartEøs &&
                forrigePeriode.samtidigUttak
            ) {
                const overlappendePerioderAnnenPartForrigePeriode =
                    Periodene(annenPartsUttak).finnOverlappendePerioder(forrigePeriode);
                const overlappendePerioderAnnenPart = Periodene(annenPartsUttak).finnOverlappendePerioder(periode);

                if (
                    (overlappendePerioderAnnenPart.length === 0 &&
                        overlappendePerioderAnnenPartForrigePeriode.length > 0) ||
                    (overlappendePerioderAnnenPart.length > 0 &&
                        overlappendePerioderAnnenPartForrigePeriode.length === 0)
                ) {
                    nyePerioder.push(forrigePeriode);
                    forrigePeriode = periode;
                    return;
                }
            }

            if (
                (dayjs(forrigePeriode.tom).isBefore(familiehendelsesdato, 'day') &&
                    dayjs(periode.tom).isSameOrAfter(UttaksdagenString(familiehendelsesdato).denneEllerNeste())) ||
                (førsteUttaksdagNesteBarnsSak !== undefined &&
                    dayjs(forrigePeriode.tom).isBefore(førsteUttaksdagNesteBarnsSak, 'day') &&
                    dayjs(periode.fom).isSameOrAfter(
                        UttaksdagenString(førsteUttaksdagNesteBarnsSak).denneEllerNeste(),
                        'day',
                    ))
            ) {
                nyePerioder.push(forrigePeriode);
                forrigePeriode = periode;
                return;
            }

            const nyTidsperiode = {
                fom: forrigePeriode.fom,
                tom: periode.tom,
            };

            forrigePeriode = {
                ...forrigePeriode,
                fom: nyTidsperiode.fom,
                tom: nyTidsperiode.tom,
            };

            return;
        } else {
            nyePerioder.push(forrigePeriode);
        }
        forrigePeriode = periode;
    });
    nyePerioder.push(forrigePeriode);

    return nyePerioder;
};

const getSplittetPeriodeOmNødvendig = (
    nyHullPeriode: Planperiode,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
    const hullTidsperiode = { fom: nyHullPeriode.fom, tom: nyHullPeriode.tom };

    if (
        førsteUttaksdagNesteBarnsSak !== undefined &&
        tidperiodeOverlapperDato(hullTidsperiode, førsteUttaksdagNesteBarnsSak)
    ) {
        return splittPeriodePåDato(nyHullPeriode, førsteUttaksdagNesteBarnsSak);
    }
    return [nyHullPeriode];
};

export const getPeriodeHullEllerPeriodeUtenUttak = (
    tidsperiode: Tidsperiode,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: string,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
    const skalLeggeInnPerioderUtenUttak = førsteOktober2021ReglerGjelder(familiehendelsesdato);

    if (skalLeggeInnPerioderUtenUttak) {
        const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;
        const førsteUttaksdagFamiliehendelsesdato = UttaksdagenString(familiehendelsesdato).denneEllerNeste();
        const førsteUttaksdagEtterSeksUker = UttaksdagenString(førsteUttaksdagFamiliehendelsesdato).leggTil(
            ANTALL_UTTAKSDAGER_SEKS_UKER,
        );
        const tidsperiodeErInnenFørsteSeksUker =
            TidsperiodenString(tidsperiode).erInnenforFørsteSeksUker(familiehendelsesdato);

        const farMedmorBeholderDagerIkkeTattUtDeFørsteSeksUkene =
            dayjs(tidsperiode.fom).isBefore(førsteUttaksdagEtterSeksUker, 'day') &&
            !erAdopsjon &&
            ((bareFarHarRett && førsteOktober2021ReglerGjelder(familiehendelsesdato)) ||
                (erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato)));

        if (harAktivitetskravIPeriodeUtenUttak && !farMedmorBeholderDagerIkkeTattUtDeFørsteSeksUkene) {
            return getSplittetPeriodeOmNødvendig(getPeriodeHull(tidsperiode, false), førsteUttaksdagNesteBarnsSak);
        }

        if (dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'day')) {
            return getSplittetPeriodeOmNødvendig(getNyPeriodeUtenUttak(tidsperiode), førsteUttaksdagNesteBarnsSak);
        }

        if (tidsperiodeErInnenFørsteSeksUker && !erAdopsjon) {
            if (dayjs(tidsperiode.tom).isBefore(førsteUttaksdagEtterSeksUker, 'day')) {
                if (
                    (bareFarHarRett && førsteOktober2021ReglerGjelder(familiehendelsesdato)) ||
                    (erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato))
                ) {
                    return [getNyPeriodeUtenUttak(tidsperiode)];
                }
                return [getPeriodeHull(tidsperiode, true)];
            }

            const antallDagerFraFomTilFørsteUttaksdagSeksUker =
                TidsperiodenString({ fom: tidsperiode.fom, tom: førsteUttaksdagEtterSeksUker }).getAntallUttaksdager() -
                2;

            const nyPeriodeUtenUttakTidsperiodeLengde =
                TidsperiodenString(tidsperiode).getAntallUttaksdager() - antallDagerFraFomTilFørsteUttaksdagSeksUker;

            const førsteSeksUkerTidsperiode: Tidsperiode = {
                fom: tidsperiode.fom,
                tom: UttaksdagenString(førsteUttaksdagEtterSeksUker).leggTil(-1),
            };

            const etterFørsteSeksUkerTidsperiode: Tidsperiode = {
                fom: førsteUttaksdagEtterSeksUker,
                tom: UttaksdagenString(førsteUttaksdagEtterSeksUker).leggTil(nyPeriodeUtenUttakTidsperiodeLengde - 2),
            };

            if (
                (bareFarHarRett && førsteOktober2021ReglerGjelder(familiehendelsesdato)) ||
                (erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato))
            ) {
                if (erFarEllerMedmor && !bareFarHarRett) {
                    return [getNyPeriodeUtenUttak(tidsperiode)];
                }

                const periodeUtenUttak = getNyPeriodeUtenUttak(førsteSeksUkerTidsperiode);
                const periodeHull = getPeriodeHull(etterFørsteSeksUkerTidsperiode, false);
                return [periodeUtenUttak, periodeHull];
            }

            const periodeHull = getPeriodeHull(førsteSeksUkerTidsperiode, true);
            const periodeUtenUttak = getNyPeriodeUtenUttak(etterFørsteSeksUkerTidsperiode);

            return [periodeHull, periodeUtenUttak];
        }

        return getSplittetPeriodeOmNødvendig(getNyPeriodeUtenUttak(tidsperiode), førsteUttaksdagNesteBarnsSak);
    }

    return getSplittetPeriodeOmNødvendig(getPeriodeHull(tidsperiode, !erFarEllerMedmor), førsteUttaksdagNesteBarnsSak);
};

const getPeriodeHull = (tidsperiode: Tidsperiode, erMor: boolean): Planperiode => ({
    erAnnenPartEøs: false,
    fom: tidsperiode.fom,
    tom: tidsperiode.tom,
    periodeHullÅrsak: PeriodeHullType.TAPTE_DAGER,
    forelder: erMor ? 'MOR' : 'FAR_MEDMOR',
});

const getNyPeriodeUtenUttak = (tidsperiode: Tidsperiode): Planperiode => ({
    erAnnenPartEøs: false,
    fom: tidsperiode.fom,
    tom: tidsperiode.tom,
    periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
});

export const finnOgSettInnHull = (
    perioder: Planperiode[],
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: string,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    førsteUttaksdagNesteBarnsSak: string | undefined,
) => {
    if (perioder.length === 0) {
        return perioder;
    }

    const result = perioder.reduce<Planperiode[]>((res, periode, index) => {
        if (index === 0 && erFarEllerMedmor) {
            const førsteUttaksdagFamiliehendelsesdato = UttaksdagenString(familiehendelsesdato).denneEllerNeste();
            if (dayjs(førsteUttaksdagFamiliehendelsesdato).isBefore(periode.fom)) {
                const tidsperiodeMellom6ukerEtterFødselOgPerioden: Tidsperiode = {
                    fom: førsteUttaksdagFamiliehendelsesdato,
                    tom: UttaksdagenString(periode.fom).forrige(),
                };
                const uttaksdagerITidsperiode = TidsperiodenString(
                    tidsperiodeMellom6ukerEtterFødselOgPerioden,
                ).getAntallUttaksdager();

                if (uttaksdagerITidsperiode > 0) {
                    res.push(
                        ...getPeriodeHullEllerPeriodeUtenUttak(
                            tidsperiodeMellom6ukerEtterFødselOgPerioden,
                            harAktivitetskravIPeriodeUtenUttak,
                            familiehendelsesdato,
                            erAdopsjon,
                            bareFarHarRett,
                            erFarEllerMedmor,
                            førsteUttaksdagNesteBarnsSak,
                        ),
                    );
                }
            }
        }

        res.push(periode);

        if (index === perioder.length - 1) {
            return res;
        }

        const nestePeriode = perioder[index + 1]!;

        const tidsperiodeMellomPerioder: Tidsperiode = {
            fom: UttaksdagenString(periode.tom).neste(),
            tom: UttaksdagenString(nestePeriode.fom).forrige(),
        };

        if (dayjs(tidsperiodeMellomPerioder.tom).isBefore(tidsperiodeMellomPerioder.fom, 'day')) {
            return res;
        }

        if (!erFarEllerMedmor && dayjs(tidsperiodeMellomPerioder.tom).isBefore(familiehendelsesdato, 'day')) {
            return res;
        }

        const uttaksdagerITidsperiode = TidsperiodenString(tidsperiodeMellomPerioder).getAntallUttaksdager();

        if (uttaksdagerITidsperiode > 0) {
            const fom = dayjs(tidsperiodeMellomPerioder.fom);
            const tom = dayjs(tidsperiodeMellomPerioder.tom);
            const familiehendelse = dayjs(familiehendelsesdato);

            // Sjekk om perioden går over familiehendelsesdato
            if (fom.isBefore(familiehendelse, 'day') && tom.isAfter(familiehendelse, 'day')) {
                // Periode før familiehendelsesdato
                const periodeFørFamiliehendelse: Tidsperiode = {
                    fom: tidsperiodeMellomPerioder.fom,
                    tom: UttaksdagenString(familiehendelsesdato).forrige(),
                };

                res.push(
                    ...getPeriodeHullEllerPeriodeUtenUttak(
                        periodeFørFamiliehendelse,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsesdato,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        førsteUttaksdagNesteBarnsSak,
                    ),
                );

                // Periode fra og med familiehendelsesdato
                const periodeEtterFamiliehendelse: Tidsperiode = {
                    fom: UttaksdagenString(familiehendelsesdato).denneEllerNeste(),
                    tom: tidsperiodeMellomPerioder.tom,
                };

                res.push(
                    ...getPeriodeHullEllerPeriodeUtenUttak(
                        periodeEtterFamiliehendelse,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsesdato,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        førsteUttaksdagNesteBarnsSak,
                    ),
                );
            } else {
                // Perioden går ikke over familiehendelsesdato, håndter normalt
                res.push(
                    ...getPeriodeHullEllerPeriodeUtenUttak(
                        tidsperiodeMellomPerioder,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsesdato,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        førsteUttaksdagNesteBarnsSak,
                    ),
                );
            }
        }

        return res;
    }, []);

    return result;
};

const beregnSamtidiguttaksprosent = (overlappendePeriode: Planperiode) => {
    /*
     Når man lager planen ønsker vi å automatisk endre på den andre parten sin uttaksprosent så man slipper gjøre to sett med endringer.
     Men den må utledes utifra maks tillat prosent. Dette avhenger av hvilke kontoer som benyttes, eller om det er flerbarnsdager osv.
     For nå gjør vi det enkelt slik at det blir rett i innsyn for eksisterende planer.
    */
    if (overlappendePeriode.erAnnenPartEøs) {
        return 100;
    }

    return overlappendePeriode.samtidigUttak ?? 100;
};

export const settInnAnnenPartsUttak = (
    perioder: Planperiode[],
    annenPartsUttak: Planperiode[],
    familiehendelsesdato: string,
    førsteUttaksdagNesteBarnsSak: string | undefined,
    initiellMappingFraSaksperioder = false,
) => {
    if (annenPartsUttak.length === 0) {
        return perioder;
    }

    if (perioder.length === 0) {
        return annenPartsUttak;
    }

    const { normaliserteEgnePerioder, normaliserteAnnenPartsPerioder } = normaliserPerioder(perioder, annenPartsUttak);

    const result = normaliserteEgnePerioder.reduce<Planperiode[]>((res, p) => {
        const overlappendePerioderAnnenPart = Periodene(normaliserteAnnenPartsPerioder).finnOverlappendePerioder(p);

        if (overlappendePerioderAnnenPart.length === 0) {
            if (
                isUttaksperiode(p) &&
                !p.erAnnenPartEøs &&
                p.samtidigUttak !== undefined &&
                initiellMappingFraSaksperioder
            ) {
                res.push({
                    ...p,
                });

                return res;
            }

            res.push(p);

            return res;
        }

        if (isPeriodeUtenUttak(p) || isHull(p)) {
            const overlappendePeriode = overlappendePerioderAnnenPart[0]!;

            res.push({ ...overlappendePeriode });
            return res;
        }

        if (isUttaksperiode(p) && !p.erAnnenPartEøs && p.samtidigUttak) {
            const overlappendePeriode = overlappendePerioderAnnenPart[0]!;
            res.push(p);

            if (!isUtsettelsesperiodeAnnenPart(overlappendePeriode) && !overlappendePeriode.erAnnenPartEøs) {
                res.push({
                    ...overlappendePeriode,
                    samtidigUttak: beregnSamtidiguttaksprosent(overlappendePeriode),
                });
            }

            return res;
        } else {
            res.push(p);
            return res;
        }
    }, []);

    result.sort(sorterPerioder);

    const førstePeriodeStartdato = perioder[0]!.fom;
    const annenPartsUttakSomSlutterFørFørstePeriode = normaliserteAnnenPartsPerioder.filter((ap) =>
        dayjs(ap.tom).isBefore(førstePeriodeStartdato, 'day'),
    );

    const sistePeriodeSluttdato = perioder.at(-1)!.tom;
    const annenPartsUttakSomStarterEtterSistePeriode = normaliserteAnnenPartsPerioder.filter((ap) =>
        dayjs(ap.fom).isAfter(sistePeriodeSluttdato, 'day'),
    );

    return slåSammenLikePerioder(
        [...annenPartsUttakSomSlutterFørFørstePeriode, ...result, ...annenPartsUttakSomStarterEtterSistePeriode],
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak,
        annenPartsUttak,
    );
};
