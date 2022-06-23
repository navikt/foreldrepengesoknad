import { TidsperiodeDate } from '@navikt/fp-common';
import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import { Periodene, sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { getTidsperiode, isValidTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { andreAugust2022ReglerGjelder, førsteOktober2021ReglerGjelder } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import {
    isHull,
    isPeriodeUtenUttak,
    isPeriodeUtenUttakUtsettelse,
    isUttakAnnenPart,
    isUttaksperiode,
    Periode,
    PeriodeHull,
    Periodetype,
    PeriodeUtenUttak,
    UttakAnnenPartInfoPeriode,
} from 'uttaksplan/types/Periode';
import { PeriodeHullÅrsak } from 'uttaksplan/types/PeriodeHullÅrsak';

export const resetTidsperioder = (perioder: Periode[], familiehendelsesdato: Date): Periode[] => {
    let forrigePeriode: Periode;
    const sammenslåttePerioder = slåSammenLikePerioder(perioder.sort(sorterPerioder), familiehendelsesdato);
    const resattePerioder = sammenslåttePerioder.map((periode) => {
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return periode;
        }
        forrigePeriode = {
            ...periode,
            tidsperiode: getTidsperiode(
                Uttaksdagen(forrigePeriode.tidsperiode.tom).neste(),
                Tidsperioden(periode.tidsperiode).getAntallUttaksdager()
            ),
        };
        return {
            ...periode,
            tidsperiode: { ...forrigePeriode.tidsperiode },
        };
    });

    return resattePerioder;
};

export const slåSammenLikePerioder = (perioder: Periode[], familiehendelsesdato: Date): Periode[] => {
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
        if (Perioden(forrigePeriode).erLik(periode) && Perioden(forrigePeriode).erSammenhengende(periode)) {
            if (
                dayjs(forrigePeriode.tidsperiode.tom).isBefore(familiehendelsesdato) &&
                dayjs(periode.tidsperiode.fom).isSame(Uttaksdagen(familiehendelsesdato).denneEllerNeste())
            ) {
                nyePerioder.push(forrigePeriode);
                forrigePeriode = periode;
                return;
            }
            forrigePeriode.tidsperiode.tom = periode.tidsperiode.tom;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
            forrigePeriode = undefined;
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
            dayjs(tidsperiode.fom).isBefore(førsteUttaksdagEtterSeksUker) &&
            !erAdopsjon &&
            ((bareFarHarRett && førsteOktober2021ReglerGjelder(familiehendelsesdato)) ||
                (erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato)));

        if (harAktivitetskravIPeriodeUtenUttak && !farMedmorBeholderDagerIkkeTattUtDeFørsteSeksUkene) {
            return [getPeriodeHull(tidsperiode, årsak)];
        }

        if (dayjs(tidsperiode.fom).isBefore(familiehendelsesdato)) {
            return [getNyPeriodeUtenUttak(tidsperiode)];
        }

        if (tidsperiodeErInnenFørsteSeksUker && !erAdopsjon) {
            if (dayjs(tidsperiode.tom).isBefore(førsteUttaksdagEtterSeksUker)) {
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

export const fjernHullPåSlutten = (perioder: Periode[]) => {
    return perioder.reduce((res, periode, index) => {
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

export const settInnAnnenPartsUttakOmNødvendig = (
    perioder: Periode[],
    annenPartsUttak: Periode[],
    familiehendelsesdato: Date
) => {
    if (annenPartsUttak.length === 0) {
        return perioder;
    }

    const result = perioder.reduce((res, p) => {
        if (isPeriodeUtenUttak(p) || isPeriodeUtenUttakUtsettelse(p) || isHull(p)) {
            const opprinneligePerioderAnnenPart = Periodene(annenPartsUttak).finnOverlappendePerioder(p);

            if (opprinneligePerioderAnnenPart.length === 0) {
                res.push(p);

                return res;
            } else {
                opprinneligePerioderAnnenPart.forEach((opprinneligPeriode) => {
                    const op: Periode = {
                        ...opprinneligPeriode,
                        id: guid(),
                        tidsperiode: {
                            fom: dayjs
                                .max([dayjs(p.tidsperiode.fom), dayjs(opprinneligPeriode.tidsperiode.fom)])
                                .toDate(),
                            tom: dayjs
                                .min([dayjs(p.tidsperiode.tom), dayjs(opprinneligPeriode.tidsperiode.tom)])
                                .toDate(),
                        },
                    };

                    if (isUttakAnnenPart(op) && op.ønskerSamtidigUttak) {
                        const infoPeriode: UttakAnnenPartInfoPeriode = { ...op, visPeriodeIPlan: true };
                        res.push(infoPeriode);
                    } else {
                        res.push(op);
                    }
                });

                return res;
            }
        }

        if (isUttaksperiode(p) && p.ønskerSamtidigUttak) {
            const opprinneligePerioderAnnenPart = Periodene(annenPartsUttak).finnOverlappendePerioder(p);

            if (opprinneligePerioderAnnenPart.length === 0) {
                res.push(p);

                return res;
            } else {
                const førsteOpprinneligePeriode = opprinneligePerioderAnnenPart[0];
                const sisteOpprinneligePeriode =
                    opprinneligePerioderAnnenPart.length > 1
                        ? opprinneligePerioderAnnenPart[opprinneligePerioderAnnenPart.length - 1]
                        : undefined;

                if (dayjs(p.tidsperiode.fom).isBefore(førsteOpprinneligePeriode.tidsperiode.fom)) {
                    const nyPeriode: Periode = {
                        ...p,
                        id: guid(),
                        tidsperiode: {
                            fom: p.tidsperiode.fom,
                            tom: Uttaksdagen(førsteOpprinneligePeriode.tidsperiode.tom).forrige(),
                        },
                    };

                    res.push(nyPeriode);
                }

                opprinneligePerioderAnnenPart.forEach((opprinneligPeriode, index) => {
                    const op = {
                        ...opprinneligPeriode,
                        id: guid(),
                        tidsperiode: {
                            fom: dayjs
                                .max([dayjs(p.tidsperiode.fom), dayjs(opprinneligPeriode.tidsperiode.fom)])
                                .toDate(),
                            tom: dayjs
                                .min([dayjs(p.tidsperiode.tom), dayjs(opprinneligPeriode.tidsperiode.tom)])
                                .toDate(),
                        },
                        visPeriodeIPlan: false,
                        ønskerSamtidigUttak: true,
                    };

                    const nyPeriode: Periode = {
                        ...p,
                        id: index === 0 ? p.id : guid(),
                        tidsperiode: {
                            ...op.tidsperiode,
                        },
                    };

                    res.push(nyPeriode);
                    res.push(op);
                });

                if (
                    sisteOpprinneligePeriode &&
                    dayjs(p.tidsperiode.tom).isAfter(sisteOpprinneligePeriode.tidsperiode.tom)
                ) {
                    const nyPeriode: Periode = {
                        ...p,
                        id: guid(),
                        tidsperiode: {
                            fom: Uttaksdagen(sisteOpprinneligePeriode.tidsperiode.fom).neste(),
                            tom: p.tidsperiode.tom,
                        },
                    };

                    res.push(nyPeriode);
                }

                return res;
            }
        } else {
            res.push(p);

            return res;
        }
    }, [] as Periode[]);

    return slåSammenLikePerioder(result, familiehendelsesdato);
};
