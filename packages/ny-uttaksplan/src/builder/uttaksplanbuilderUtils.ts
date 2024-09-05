import dayjs from 'dayjs';

import {
    Periode,
    PeriodeHull,
    PeriodeHullÅrsak,
    PeriodeUtenUttak,
    Periodetype,
    TidsperiodeDate,
    isHull,
    isPeriodeUtenUttak,
    isPeriodeUtenUttakUtsettelse,
    isUtsettelseAnnenPart,
    isUttaksperiode,
} from '@navikt/fp-common';
import { SaksperiodeNy } from '@navikt/fp-types';
import { Tidsperioden, Uttaksdagen, isValidTidsperiode } from '@navikt/fp-utils';

import { Perioden } from '../utils/Perioden';
import { Periodene, sorterPerioder } from '../utils/Periodene';
import {
    andreAugust2022ReglerGjelder,
    førsteOktober2021ReglerGjelder,
    tidperiodeOverlapperDato,
} from '../utils/dateUtils';
import { guid } from './guid';
import { splittPeriodePåDato } from './leggTilPeriode';

export const slåSammenLikePerioder = (
    perioder: SaksperiodeNy[],
    familiehendelsesdato: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    annenPartsUttak?: SaksperiodeNy[],
): SaksperiodeNy[] => {
    if (perioder.length <= 1) {
        return perioder;
    }
    const nyePerioder: SaksperiodeNy[] = [];
    let forrigePeriode: SaksperiodeNy | undefined = { ...perioder[0] };
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
                periode.samtidigUttak &&
                isUttaksperiode(forrigePeriode) &&
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
                    dayjs(periode.tom).isSameOrAfter(Uttaksdagen(familiehendelsesdato).denneEllerNeste())) ||
                (førsteUttaksdagNesteBarnsSak !== undefined &&
                    dayjs(forrigePeriode.tom).isBefore(førsteUttaksdagNesteBarnsSak, 'day') &&
                    dayjs(periode.fom).isSameOrAfter(
                        Uttaksdagen(førsteUttaksdagNesteBarnsSak).denneEllerNeste(),
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
    nyHullPeriode: PeriodeHull | PeriodeUtenUttak,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
): Array<PeriodeHull | PeriodeUtenUttak> => {
    if (
        førsteUttaksdagNesteBarnsSak !== undefined &&
        tidperiodeOverlapperDato(nyHullPeriode.tidsperiode, førsteUttaksdagNesteBarnsSak)
    ) {
        return splittPeriodePåDato(nyHullPeriode, førsteUttaksdagNesteBarnsSak) as Array<
            PeriodeHull | PeriodeUtenUttak
        >;
    }
    return [nyHullPeriode];
};

export const getPeriodeHullEllerPeriodeUtenUttak = (
    tidsperiode: TidsperiodeDate,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    årsak: PeriodeHullÅrsak = PeriodeHullÅrsak.fridag,
): Array<PeriodeHull | PeriodeUtenUttak> => {
    const skalLeggeInnPerioderUtenUttak = førsteOktober2021ReglerGjelder(familiehendelsesdato);

    if (skalLeggeInnPerioderUtenUttak) {
        const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;
        const førsteUttaksdagFamiliehendelsesdato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
        const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdagFamiliehendelsesdato).leggTil(
            ANTALL_UTTAKSDAGER_SEKS_UKER,
        );
        const tidsperiodeErInnenFørsteSeksUker =
            Tidsperioden(tidsperiode).erInnenforFørsteSeksUker(familiehendelsesdato);

        const farMedmorBeholderDagerIkkeTattUtDeFørsteSeksUkene =
            dayjs(tidsperiode.fom).isBefore(førsteUttaksdagEtterSeksUker, 'day') &&
            !erAdopsjon &&
            ((bareFarHarRett && førsteOktober2021ReglerGjelder(familiehendelsesdato)) ||
                (erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato)));

        if (harAktivitetskravIPeriodeUtenUttak && !farMedmorBeholderDagerIkkeTattUtDeFørsteSeksUkene) {
            return getSplittetPeriodeOmNødvendig(getPeriodeHull(tidsperiode, årsak), førsteUttaksdagNesteBarnsSak);
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
                return [getPeriodeHull(tidsperiode, årsak)];
            }

            const antallDagerFraFomTilFørsteUttaksdagSeksUker =
                Tidsperioden({ fom: tidsperiode.fom, tom: førsteUttaksdagEtterSeksUker }).getAntallUttaksdager() - 2;

            const nyPeriodeUtenUttakTidsperiodeLengde =
                Tidsperioden(tidsperiode).getAntallUttaksdager() - antallDagerFraFomTilFørsteUttaksdagSeksUker;

            const førsteSeksUkerTidsperiode: TidsperiodeDate = {
                fom: tidsperiode.fom,
                tom: Uttaksdagen(førsteUttaksdagEtterSeksUker).leggTil(-1),
            };

            const etterFørsteSeksUkerTidsperiode: TidsperiodeDate = {
                fom: førsteUttaksdagEtterSeksUker,
                tom: Uttaksdagen(førsteUttaksdagEtterSeksUker).leggTil(nyPeriodeUtenUttakTidsperiodeLengde - 2),
            };

            if (
                (bareFarHarRett && førsteOktober2021ReglerGjelder(familiehendelsesdato)) ||
                (erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato))
            ) {
                if (erFarEllerMedmor && !bareFarHarRett) {
                    return [getNyPeriodeUtenUttak(tidsperiode)];
                }

                const periodeUtenUttak = getNyPeriodeUtenUttak(førsteSeksUkerTidsperiode);
                const periodeHull = getPeriodeHull(etterFørsteSeksUkerTidsperiode, årsak);
                return [periodeUtenUttak, periodeHull];
            }

            const periodeHull = getPeriodeHull(førsteSeksUkerTidsperiode, årsak);
            const periodeUtenUttak = getNyPeriodeUtenUttak(etterFørsteSeksUkerTidsperiode);

            return [periodeHull, periodeUtenUttak];
        }

        return getSplittetPeriodeOmNødvendig(getNyPeriodeUtenUttak(tidsperiode), førsteUttaksdagNesteBarnsSak);
    }

    return getSplittetPeriodeOmNødvendig(getPeriodeHull(tidsperiode, årsak), førsteUttaksdagNesteBarnsSak);
};

export const getPeriodeHull = (tidsperiode: TidsperiodeDate, årsak?: PeriodeHullÅrsak): PeriodeHull => ({
    id: guid(),
    type: Periodetype.Hull,
    tidsperiode,
    årsak,
});

export const getNyPeriodeUtenUttak = (tidsperiode: TidsperiodeDate): PeriodeUtenUttak => ({
    id: guid(),
    type: Periodetype.PeriodeUtenUttak,
    tidsperiode,
});

export const getTidsperiodeMellomPerioder = (
    tidsperiode1: TidsperiodeDate,
    tidsperiode2: TidsperiodeDate,
): TidsperiodeDate | undefined => {
    const tidsperiodeMellomPerioder: TidsperiodeDate = {
        fom: Uttaksdagen(tidsperiode1.tom).neste(),
        tom: Uttaksdagen(tidsperiode2.fom).forrige(),
    };

    const antallDagerIMellomrom = Tidsperioden(tidsperiodeMellomPerioder).getAntallUttaksdager();

    if (isValidTidsperiode(tidsperiodeMellomPerioder) && antallDagerIMellomrom > 0) {
        return tidsperiodeMellomPerioder;
    }

    return undefined;
};

export const fjernUnødvendigeHull = (perioder: Periode[]) => {
    return perioder.reduce((res, periode, index) => {
        if (index === 0) {
            if (isPeriodeUtenUttak(periode)) {
                return res;
            }
        }

        if (index === perioder.length - 1) {
            if (isHull(periode) || isPeriodeUtenUttak(periode)) {
                return res;
            }

            res.push(periode);
            return res;
        }

        res.push(periode);
        return res;
    }, [] as Periode[]);
};

export const finnOgSettInnHull = (
    perioder: Periode[],
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
) => {
    if (perioder.length === 0) {
        return perioder;
    }

    const result = perioder.reduce((res, periode, index) => {
        if (index === 0 && erFarEllerMedmor) {
            const førsteUttaksdagFamiliehendelsesdato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
            if (dayjs(førsteUttaksdagFamiliehendelsesdato).isBefore(periode.tidsperiode.fom)) {
                const tidsperiodeMellom6ukerEtterFødselOgPerioden: TidsperiodeDate = {
                    fom: førsteUttaksdagFamiliehendelsesdato,
                    tom: Uttaksdagen(periode.tidsperiode.fom).forrige(),
                };
                const uttaksdagerITidsperiode = Tidsperioden(
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

        const nestePeriode = perioder[index + 1];

        const tidsperiodeMellomPerioder: TidsperiodeDate = {
            fom: Uttaksdagen(periode.tidsperiode.tom).neste(),
            tom: Uttaksdagen(nestePeriode.tidsperiode.fom).forrige(),
        };

        if (dayjs(tidsperiodeMellomPerioder.tom).isBefore(tidsperiodeMellomPerioder.fom, 'day')) {
            return res;
        }

        if (!erFarEllerMedmor && dayjs(tidsperiodeMellomPerioder.tom).isBefore(familiehendelsesdato, 'day')) {
            return res;
        }

        const uttaksdagerITidsperiode = Tidsperioden(tidsperiodeMellomPerioder).getAntallUttaksdager();

        if (uttaksdagerITidsperiode > 0) {
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

        return res;
    }, [] as Periode[]);

    return result;
};

interface SplittetDatoType {
    dato: Date;
    erFom: boolean;
}

const splittPeriodePåDatoer = (periode: SaksperiodeNy, alleDatoer: SplittetDatoType[]): SaksperiodeNy[] => {
    const datoerIPerioden = alleDatoer.filter((datoWrapper) =>
        Tidsperioden(getTidsperiodeDate(periode)).inneholderDato(datoWrapper.dato),
    );
    const oppsplittetPeriode: SaksperiodeNy[] = [];

    if (datoerIPerioden.length === 2) {
        return [periode];
    }

    datoerIPerioden.forEach((datoWrapper, index) => {
        if (index === 0) {
            oppsplittetPeriode.push({
                ...periode,
                fom: dateToISOString(datoWrapper.dato),
                tom: undefined!,
            });
            return;
        }

        oppsplittetPeriode[index - 1].tom = datoWrapper.erFom
            ? dateToISOString(Uttaksdagen(datoWrapper.dato).forrige())
            : dateToISOString(datoWrapper.dato);

        if (index < datoerIPerioden.length - 1) {
            oppsplittetPeriode.push({
                ...periode,
                fom: datoWrapper.erFom
                    ? dateToISOString(datoWrapper.dato)
                    : dateToISOString(Uttaksdagen(datoWrapper.dato).neste()),
                tom: undefined!,
            });
        }
    });

    return oppsplittetPeriode.filter((p) => isValidTidsperiode(getTidsperiodeDate(p)));
};

// Funksjon som gjør at alle perioder overlapper 1 til 1
export const normaliserPerioder = (perioder: SaksperiodeNy[], annenPartsUttak: SaksperiodeNy[]) => {
    const perioderTidsperioder: SplittetDatoType[] = perioder
        .filter((per) => {
            const tidsperiode = getTidsperiodeDate(per);
            return isValidTidsperiode(tidsperiode);
        })
        .reduce((res, p) => {
            res.push({ dato: ISOStringToDate(p.fom)!, erFom: true });
            res.push({ dato: ISOStringToDate(p.tom)!, erFom: false });
            return res;
        }, [] as SplittetDatoType[]);
    const annenPartsUttakTidsperioder = annenPartsUttak.reduce((res, p) => {
        res.push({ dato: ISOStringToDate(p.fom)!, erFom: true });
        res.push({ dato: ISOStringToDate(p.tom)!, erFom: false });
        return res;
    }, [] as SplittetDatoType[]);

    const alleDatoer = perioderTidsperioder.concat(annenPartsUttakTidsperioder).sort((d1, d2) => {
        if (d1.dato.getTime() - d2.dato.getTime() === 0) {
            if (!d1.erFom) {
                return 1;
            }

            if (!d2.erFom) {
                return -1;
            }
        }

        return d1.dato.getTime() - d2.dato.getTime();
    });

    const alleUnikeDatoer = alleDatoer.filter(
        (date, i, self) =>
            self.findIndex((d) => d.dato.getTime() === date.dato.getTime() && d.erFom === date.erFom) === i,
    );

    const normaliserteEgnePerioder: SaksperiodeNy[] = [];
    const normaliserteAnnenPartsPerioder: SaksperiodeNy[] = [];

    perioder.forEach((p) => {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleUnikeDatoer);
        normaliserteEgnePerioder.push(...oppsplittetPeriode);
    });

    annenPartsUttak.forEach((p) => {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleUnikeDatoer);
        normaliserteAnnenPartsPerioder.push(...oppsplittetPeriode);
    });

    return {
        normaliserteEgnePerioder,
        normaliserteAnnenPartsPerioder,
    };
};

export const settInnAnnenPartsUttak = (
    perioder: SaksperiodeNy[],
    annenPartsUttak: SaksperiodeNy[],
    familiehendelsesdato: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    initiellMappingFraSaksperioder = false,
) => {
    if (annenPartsUttak.length === 0) {
        return perioder;
    }

    if (perioder.length === 0) {
        return annenPartsUttak;
    }

    const { normaliserteEgnePerioder, normaliserteAnnenPartsPerioder } = normaliserPerioder(perioder, annenPartsUttak);

    const result = normaliserteEgnePerioder.reduce((res, p) => {
        const overlappendePerioderAnnenPart = Periodene(normaliserteAnnenPartsPerioder).finnOverlappendePerioder(p);

        if (overlappendePerioderAnnenPart.length === 0) {
            if (isUttaksperiode(p) && p.samtidigUttak && initiellMappingFraSaksperioder) {
                res.push({
                    ...p,
                    ønskerSamtidigUttak: false,
                });

                return res;
            }

            res.push(p);

            return res;
        }

        if (isPeriodeUtenUttak(p) || isPeriodeUtenUttakUtsettelse(p) || isHull(p)) {
            const overlappendePeriode = overlappendePerioderAnnenPart[0];

            res.push({ ...overlappendePeriode, visPeriodeIPlan: true } as Periode);
            return res;
        }

        if (isUttaksperiode(p) && p.ønskerSamtidigUttak) {
            const overlappendePeriode = overlappendePerioderAnnenPart[0];
            res.push(p);

            if (!isUtsettelseAnnenPart(overlappendePeriode)) {
                res.push({ ...overlappendePeriode, visPeriodeIPlan: false, ønskerSamtidigUttak: true } as Periode);
            }

            return res;
        } else {
            res.push(p);
            return res;
        }
    }, [] as Periode[]);

    result.sort(sorterPerioder);

    const førstePeriodeStartdato = perioder[0].tidsperiode.fom;
    const annenPartsUttakSomSlutterFørFørstePeriode = normaliserteAnnenPartsPerioder.filter((ap) =>
        dayjs(ap.tidsperiode.tom).isBefore(førstePeriodeStartdato, 'day'),
    );

    const sistePeriodeSluttdato = perioder[perioder.length - 1].tidsperiode.tom;
    const annenPartsUttakSomStarterEtterSistePeriode = normaliserteAnnenPartsPerioder.filter((ap) =>
        dayjs(ap.tidsperiode.fom).isAfter(sistePeriodeSluttdato, 'day'),
    );

    return slåSammenLikePerioder(
        [...annenPartsUttakSomSlutterFørFørstePeriode, ...result, ...annenPartsUttakSomStarterEtterSistePeriode],
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak,
        annenPartsUttak,
    );
};
