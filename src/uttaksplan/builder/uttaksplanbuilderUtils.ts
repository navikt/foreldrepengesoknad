import { TidsperiodeDate } from '@navikt/fp-common';
import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import { Periodene, sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { isValidTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { andreAugust2022ReglerGjelder, førsteOktober2021ReglerGjelder } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import {
    isHull,
    isPeriodeUtenUttak,
    isPeriodeUtenUttakUtsettelse,
    isUtsettelseAnnenPart,
    isUttaksperiode,
    Periode,
    PeriodeHull,
    Periodetype,
    PeriodeUtenUttak,
} from 'uttaksplan/types/Periode';
import { PeriodeHullÅrsak } from 'uttaksplan/types/PeriodeHullÅrsak';

export const slåSammenLikePerioder = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    annenPartsUttak?: Periode[]
): Periode[] => {
    if (perioder.length <= 1) {
        return perioder;
    }
    const nyePerioder: Periode[] = [];
    let forrigePeriode: Periode | undefined = { ...perioder[0] };
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
                periode.ønskerSamtidigUttak &&
                isUttaksperiode(forrigePeriode) &&
                forrigePeriode.ønskerSamtidigUttak
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
                (dayjs(forrigePeriode.tidsperiode.tom).isBefore(familiehendelsesdato, 'day') &&
                    dayjs(periode.tidsperiode.tom).isSameOrAfter(
                        Uttaksdagen(familiehendelsesdato).denneEllerNeste()
                    )) ||
                (førsteUttaksdagNesteBarnsSak !== undefined &&
                    dayjs(forrigePeriode.tidsperiode.tom).isBefore(førsteUttaksdagNesteBarnsSak, 'day') &&
                    dayjs(periode.tidsperiode.fom).isSameOrAfter(
                        Uttaksdagen(førsteUttaksdagNesteBarnsSak).denneEllerNeste(),
                        'day'
                    ))
            ) {
                nyePerioder.push(forrigePeriode);
                forrigePeriode = periode;
                return;
            }

            const nyTidsperiode = {
                fom: forrigePeriode.tidsperiode.fom,
                tom: periode.tidsperiode.tom,
            };

            forrigePeriode.tidsperiode = { ...nyTidsperiode };
            return;
        } else {
            nyePerioder.push(forrigePeriode);
        }
        forrigePeriode = periode;
    });
    nyePerioder.push(forrigePeriode);

    return nyePerioder;
};

export const getPeriodeHullEllerPeriodeUtenUttak = (
    tidsperiode: TidsperiodeDate,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    bareFarHarRett: boolean,
    erFarEllerMedmor: boolean,
    årsak: PeriodeHullÅrsak = PeriodeHullÅrsak.fridag
): Array<PeriodeHull | PeriodeUtenUttak> => {
    const skalLeggeInnPerioderUtenUttak = førsteOktober2021ReglerGjelder(familiehendelsesdato);

    if (skalLeggeInnPerioderUtenUttak) {
        const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;
        const førsteUttaksdagFamiliehendelsesdato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
        const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdagFamiliehendelsesdato).leggTil(
            ANTALL_UTTAKSDAGER_SEKS_UKER
        );
        const tidsperiodeErInnenFørsteSeksUker =
            Tidsperioden(tidsperiode).erInnenforFørsteSeksUker(familiehendelsesdato);

        const farMedmorBeholderDagerIkkeTattUtDeFørsteSeksUkene =
            dayjs(tidsperiode.fom).isBefore(førsteUttaksdagEtterSeksUker, 'day') &&
            !erAdopsjon &&
            ((bareFarHarRett && førsteOktober2021ReglerGjelder(familiehendelsesdato)) ||
                (erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato)));

        if (harAktivitetskravIPeriodeUtenUttak && !farMedmorBeholderDagerIkkeTattUtDeFørsteSeksUkene) {
            return [getPeriodeHull(tidsperiode, årsak)];
        }

        if (dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'day')) {
            return [getNyPeriodeUtenUttak(tidsperiode)];
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

        return [getNyPeriodeUtenUttak(tidsperiode)];
    }

    return [getPeriodeHull(tidsperiode, årsak)];
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
    tidsperiode2: TidsperiodeDate
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
    erFarEllerMedmor: boolean
) => {
    if (perioder.length === 0) {
        return perioder;
    }

    const result = perioder.reduce((res, periode, index) => {
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

        const uttaksdagerITidsperiode = Tidsperioden(tidsperiodeMellomPerioder).getAntallUttaksdager();

        if (uttaksdagerITidsperiode > 0) {
            res.push(
                ...getPeriodeHullEllerPeriodeUtenUttak(
                    tidsperiodeMellomPerioder,
                    harAktivitetskravIPeriodeUtenUttak,
                    familiehendelsesdato,
                    erAdopsjon,
                    bareFarHarRett,
                    erFarEllerMedmor
                )
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

const splittPeriodePåDatoer = (periode: Periode, alleDatoer: SplittetDatoType[]) => {
    const datoerIPerioden = alleDatoer.filter((datoWrapper) =>
        Tidsperioden(periode.tidsperiode).inneholderDato(datoWrapper.dato)
    );
    const oppsplittetPeriode: Periode[] = [];

    if (datoerIPerioden.length === 2) {
        return [periode];
    }

    datoerIPerioden.forEach((datoWrapper, index) => {
        if (index === 0) {
            oppsplittetPeriode.push({
                ...periode,
                tidsperiode: { fom: datoWrapper.dato, tom: undefined! },
            });
            return;
        }

        oppsplittetPeriode[index - 1].tidsperiode.tom = datoWrapper.erFom
            ? Uttaksdagen(datoWrapper.dato).forrige()
            : datoWrapper.dato;

        if (index < datoerIPerioden.length - 1) {
            oppsplittetPeriode.push({
                ...periode,
                id: guid(),
                tidsperiode: {
                    fom: datoWrapper.erFom ? datoWrapper.dato : Uttaksdagen(datoWrapper.dato).neste(),
                    tom: undefined!,
                },
            });
        }
    });

    return oppsplittetPeriode.filter((p) => isValidTidsperiode(p.tidsperiode));
};

// Funksjon som gjør at alle perioder overlapper 1 til 1
export const normaliserPerioder = (perioder: Periode[], annenPartsUttak: Periode[]) => {
    const perioderTidsperioder: SplittetDatoType[] = perioder
        .filter((per) => isValidTidsperiode(per.tidsperiode))
        .reduce((res, p) => {
            res.push({ dato: p.tidsperiode.fom, erFom: true });
            res.push({ dato: p.tidsperiode.tom, erFom: false });
            return res;
        }, [] as SplittetDatoType[]);
    const annenPartsUttakTidsperioder = annenPartsUttak.reduce((res, p) => {
        res.push({ dato: p.tidsperiode.fom, erFom: true });
        res.push({ dato: p.tidsperiode.tom, erFom: false });
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

    const normaliserteEgnePerioder: Periode[] = [];
    const normaliserteAnnenPartsPerioder: Periode[] = [];

    perioder.forEach((p) => {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleDatoer);
        normaliserteEgnePerioder.push(...oppsplittetPeriode);
    });

    annenPartsUttak.forEach((p) => {
        const oppsplittetPeriode = splittPeriodePåDatoer(p, alleDatoer);
        normaliserteAnnenPartsPerioder.push(...oppsplittetPeriode);
    });

    return {
        normaliserteEgnePerioder,
        normaliserteAnnenPartsPerioder,
    };
};

export const settInnAnnenPartsUttak = (
    perioder: Periode[],
    annenPartsUttak: Periode[],
    familiehendelsesdato: Date,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    initiellMappingFraSaksperioder = false
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
            if (isUttaksperiode(p) && p.ønskerSamtidigUttak && initiellMappingFraSaksperioder) {
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
        dayjs(ap.tidsperiode.tom).isBefore(førstePeriodeStartdato, 'day')
    );

    const sistePeriodeSluttdato = perioder[perioder.length - 1].tidsperiode.tom;
    const annenPartsUttakSomStarterEtterSistePeriode = normaliserteAnnenPartsPerioder.filter((ap) =>
        dayjs(ap.tidsperiode.fom).isAfter(sistePeriodeSluttdato, 'day')
    );

    return slåSammenLikePerioder(
        [...annenPartsUttakSomSlutterFørFørstePeriode, ...result, ...annenPartsUttakSomStarterEtterSistePeriode],
        familiehendelsesdato,
        førsteUttaksdagNesteBarnsSak,
        annenPartsUttak
    );
};
