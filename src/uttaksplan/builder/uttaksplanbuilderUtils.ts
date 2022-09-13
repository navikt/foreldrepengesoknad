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
    isUttakAnnenPart,
    isUttaksperiode,
    Periode,
    PeriodeHull,
    Periodetype,
    PeriodeUtenUttak,
    UttakAnnenPartInfoPeriode,
} from 'uttaksplan/types/Periode';
import { PeriodeHullÅrsak } from 'uttaksplan/types/PeriodeHullÅrsak';

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
                dayjs(forrigePeriode.tidsperiode.tom).isBefore(familiehendelsesdato, 'day') &&
                dayjs(periode.tidsperiode.tom).isSameOrAfter(Uttaksdagen(familiehendelsesdato).denneEllerNeste())
            ) {
                nyePerioder.push(forrigePeriode);
                forrigePeriode = periode;
                return;
            }
            forrigePeriode.tidsperiode.tom = periode.tidsperiode.tom;
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

const pushPeriodeHvisIkkeDuplikat = (perioder: Periode[], nyPeriode: Periode) => {
    const duplikatPeriode = perioder.find((p) => Perioden(p).erLik(nyPeriode, true));
    if (duplikatPeriode === undefined) {
        perioder.push(nyPeriode);
    }
    return perioder;
};

export const settInnAnnenPartsUttak = (perioder: Periode[], annenPartsUttak: Periode[], familiehendelsesdato: Date) => {
    if (annenPartsUttak.length === 0) {
        return perioder;
    }

    if (perioder.length === 0) {
        return annenPartsUttak;
    }

    const result = perioder.reduce((res, p, currentIndex) => {
        const overlappendePerioderAnnenPart = Periodene(annenPartsUttak).finnOverlappendePerioder(p);

        if (overlappendePerioderAnnenPart.length === 0) {
            pushPeriodeHvisIkkeDuplikat(res, p);

            return res;
        }

        if (isPeriodeUtenUttak(p) || isPeriodeUtenUttakUtsettelse(p) || isHull(p)) {
            overlappendePerioderAnnenPart.forEach((annenPartsPeriode) => {
                const op: Periode = {
                    ...annenPartsPeriode,
                    id: guid(),
                    tidsperiode: {
                        fom: dayjs.max([dayjs(p.tidsperiode.fom), dayjs(annenPartsPeriode.tidsperiode.fom)]).toDate(),
                        tom: dayjs.min([dayjs(p.tidsperiode.tom), dayjs(annenPartsPeriode.tidsperiode.tom)]).toDate(),
                    },
                };

                if (currentIndex === 0 && dayjs(annenPartsPeriode.tidsperiode.fom).isBefore(p.tidsperiode.fom, 'day')) {
                    const annenPartsPeriodeSomStarterUttaksplanen = {
                        ...annenPartsPeriode,
                        id: guid(),
                        tidsperiode: {
                            fom: annenPartsPeriode.tidsperiode.fom,
                            tom: Uttaksdagen(op.tidsperiode.fom).forrige(),
                        },
                        visPeriodeIPlan: true,
                    };
                    pushPeriodeHvisIkkeDuplikat(res, annenPartsPeriodeSomStarterUttaksplanen);
                }

                if (isUttakAnnenPart(op) && op.ønskerSamtidigUttak) {
                    const infoPeriode: UttakAnnenPartInfoPeriode = { ...op, visPeriodeIPlan: true };
                    pushPeriodeHvisIkkeDuplikat(res, infoPeriode);
                } else {
                    pushPeriodeHvisIkkeDuplikat(res, op);
                }

                if (
                    currentIndex === perioder.length - 1 &&
                    dayjs(annenPartsPeriode.tidsperiode.tom).isAfter(p.tidsperiode.tom, 'day')
                ) {
                    const annenPartsPeriodeSomAvslutterUttaksplanen = {
                        ...annenPartsPeriode,
                        id: guid(),
                        tidsperiode: {
                            fom: Uttaksdagen(op.tidsperiode.tom).neste(),
                            tom: annenPartsPeriode.tidsperiode.tom,
                        },
                        visPeriodeIPlan: true,
                    };

                    pushPeriodeHvisIkkeDuplikat(res, annenPartsPeriodeSomAvslutterUttaksplanen);
                }
            });

            return res;
        }

        if (isUttaksperiode(p) && p.ønskerSamtidigUttak) {
            const førsteOverlappendePeriodeAnnenPart = overlappendePerioderAnnenPart[0];
            const sisteOverlappendePeriodeAnnenPart =
                overlappendePerioderAnnenPart.length > 1
                    ? overlappendePerioderAnnenPart[overlappendePerioderAnnenPart.length - 1]
                    : førsteOverlappendePeriodeAnnenPart;

            if (dayjs(p.tidsperiode.fom).isBefore(førsteOverlappendePeriodeAnnenPart.tidsperiode.fom, 'day')) {
                const nyPeriode: Periode = {
                    ...p,
                    id: guid(),
                    tidsperiode: {
                        fom: p.tidsperiode.fom,
                        tom: Uttaksdagen(førsteOverlappendePeriodeAnnenPart.tidsperiode.fom).forrige(),
                    },
                };
                pushPeriodeHvisIkkeDuplikat(res, nyPeriode);
            }

            overlappendePerioderAnnenPart.forEach((annenPartsPeriode, index) => {
                const op = {
                    ...annenPartsPeriode,
                    id: guid(),
                    tidsperiode: {
                        fom: dayjs.max([dayjs(p.tidsperiode.fom), dayjs(annenPartsPeriode.tidsperiode.fom)]).toDate(),
                        tom: dayjs.min([dayjs(p.tidsperiode.tom), dayjs(annenPartsPeriode.tidsperiode.tom)]).toDate(),
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

                if (currentIndex === 0 && dayjs(annenPartsPeriode.tidsperiode.fom).isBefore(p.tidsperiode.fom, 'day')) {
                    const annenPartsPeriodeSomStarterUttaksplanen = {
                        ...annenPartsPeriode,
                        id: guid(),
                        tidsperiode: {
                            fom: annenPartsPeriode.tidsperiode.fom,
                            tom: Uttaksdagen(op.tidsperiode.fom).forrige(),
                        },
                        visPeriodeIPlan: true,
                    };
                    pushPeriodeHvisIkkeDuplikat(res, annenPartsPeriodeSomStarterUttaksplanen);
                }

                pushPeriodeHvisIkkeDuplikat(res, nyPeriode);
                if (!isUtsettelseAnnenPart(op)) {
                    pushPeriodeHvisIkkeDuplikat(res, op);
                }

                if (
                    currentIndex === perioder.length - 1 &&
                    dayjs(annenPartsPeriode.tidsperiode.tom).isAfter(p.tidsperiode.tom, 'day')
                ) {
                    const annenPartsPeriodeSomAvslutterUttaksplanen = {
                        ...annenPartsPeriode,
                        id: guid(),
                        tidsperiode: {
                            fom: Uttaksdagen(op.tidsperiode.tom).neste(),
                            tom: annenPartsPeriode.tidsperiode.tom,
                        },
                        visPeriodeIPlan: true,
                    };
                    pushPeriodeHvisIkkeDuplikat(res, annenPartsPeriodeSomAvslutterUttaksplanen);
                }
            });

            if (
                sisteOverlappendePeriodeAnnenPart &&
                dayjs(p.tidsperiode.tom).isAfter(sisteOverlappendePeriodeAnnenPart.tidsperiode.tom, 'day')
            ) {
                const nyPeriode: Periode = {
                    ...p,
                    id: guid(),
                    tidsperiode: {
                        fom: Uttaksdagen(sisteOverlappendePeriodeAnnenPart.tidsperiode.tom).neste(),
                        tom: p.tidsperiode.tom,
                    },
                };
                pushPeriodeHvisIkkeDuplikat(res, nyPeriode);
            }

            return res;
        } else {
            // Bli kvitt overlappende annen parts uttak
            overlappendePerioderAnnenPart.forEach((opprinneligPeriode) => {
                if (dayjs(opprinneligPeriode.tidsperiode.fom).isBefore(p.tidsperiode.fom)) {
                    const op: Periode = {
                        ...opprinneligPeriode,
                        id: guid(),
                        tidsperiode: {
                            fom: opprinneligPeriode.tidsperiode.fom,
                            tom: Uttaksdagen(p.tidsperiode.fom).forrige(),
                        },
                    };
                    pushPeriodeHvisIkkeDuplikat(res, op);
                }

                if (dayjs(opprinneligPeriode.tidsperiode.tom).isAfter(p.tidsperiode.tom)) {
                    const op: Periode = {
                        ...opprinneligPeriode,
                        id: guid(),
                        tidsperiode: {
                            fom: Uttaksdagen(p.tidsperiode.tom).neste(),
                            tom: opprinneligPeriode.tidsperiode.tom,
                        },
                    };
                    pushPeriodeHvisIkkeDuplikat(res, op);
                }
            });

            pushPeriodeHvisIkkeDuplikat(res, p);
            return res;
        }
    }, [] as Periode[]);

    result.sort(sorterPerioder);
    const førstePeriodeStartdato = perioder[0].tidsperiode.fom;
    const annenPartsUttakSomSlutterFørFørstePeriode = annenPartsUttak.filter((ap) =>
        dayjs(ap.tidsperiode.tom).isBefore(førstePeriodeStartdato, 'day')
    );

    const sistePeriodeSluttdato = perioder[perioder.length - 1].tidsperiode.tom;
    const annenPartsUttakSomStarterEtterSistePeriode = annenPartsUttak.filter((ap) =>
        dayjs(ap.tidsperiode.fom).isAfter(sistePeriodeSluttdato, 'day')
    );

    return slåSammenLikePerioder(
        [...annenPartsUttakSomSlutterFørFørstePeriode, ...result, ...annenPartsUttakSomStarterEtterSistePeriode],
        familiehendelsesdato
    );
};
