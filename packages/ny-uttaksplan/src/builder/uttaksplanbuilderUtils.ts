import dayjs from 'dayjs';

import { StønadskontoType } from '@navikt/fp-constants';
import { Tidsperiode } from '@navikt/fp-types';
import { TidsperiodenString, UttaksdagenString, isValidTidsperiodeString } from '@navikt/fp-utils';

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
import { splittPeriodePåDato } from './leggTilPeriode';

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
    let forrigePeriode: Planperiode | undefined = { ...perioder[0] };
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
            return getSplittetPeriodeOmNødvendig(getPeriodeHull(tidsperiode), førsteUttaksdagNesteBarnsSak);
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
                return [getPeriodeHull(tidsperiode)];
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
                const periodeHull = getPeriodeHull(etterFørsteSeksUkerTidsperiode);
                return [periodeUtenUttak, periodeHull];
            }

            const periodeHull = getPeriodeHull(førsteSeksUkerTidsperiode);
            const periodeUtenUttak = getNyPeriodeUtenUttak(etterFørsteSeksUkerTidsperiode);

            return [periodeHull, periodeUtenUttak];
        }

        return getSplittetPeriodeOmNødvendig(getNyPeriodeUtenUttak(tidsperiode), førsteUttaksdagNesteBarnsSak);
    }

    return getSplittetPeriodeOmNødvendig(getPeriodeHull(tidsperiode), førsteUttaksdagNesteBarnsSak);
};

export const getPeriodeHull = (tidsperiode: Tidsperiode): Planperiode => ({
    id: `${tidsperiode.fom} - ${tidsperiode.tom} - ${PeriodeHullType.TAPTE_DAGER}`,
    fom: tidsperiode.fom,
    tom: tidsperiode.tom,
    periodeHullÅrsak: PeriodeHullType.TAPTE_DAGER,
    readOnly: false,
});

export const getNyPeriodeUtenUttak = (tidsperiode: Tidsperiode): Planperiode => ({
    id: `${tidsperiode.fom} - ${tidsperiode.tom} - ${PeriodeHullType.PERIODE_UTEN_UTTAK}`,
    fom: tidsperiode.fom,
    tom: tidsperiode.tom,
    periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
    readOnly: false,
});

export const getTidsperiodeMellomPerioder = (
    tidsperiode1: Tidsperiode,
    tidsperiode2: Tidsperiode,
): Tidsperiode | undefined => {
    const tidsperiodeMellomPerioder: Tidsperiode = {
        fom: UttaksdagenString(tidsperiode1.tom).neste(),
        tom: UttaksdagenString(tidsperiode2.fom).forrige(),
    };

    const antallDagerIMellomrom = TidsperiodenString(tidsperiodeMellomPerioder).getAntallUttaksdager();

    if (isValidTidsperiodeString(tidsperiodeMellomPerioder) && antallDagerIMellomrom > 0) {
        return tidsperiodeMellomPerioder;
    }

    return undefined;
};

export const fjernUnødvendigeHull = (perioder: Planperiode[]) => {
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
    }, [] as Planperiode[]);
};

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

    const result = perioder.reduce((res, periode, index) => {
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

        const nestePeriode = perioder[index + 1];

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
    }, [] as Planperiode[]);

    return result;
};

const beregnSamtidiguttaksprosent = (p: Planperiode, overlappendePeriode: Planperiode) => {
    if (p.kontoType === StønadskontoType.ForeldrepengerFørFødsel || p.kontoType === StønadskontoType.Mødrekvote) {
        return overlappendePeriode.samtidigUttak ?? 100;
    }

    return 100;
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

    const result = normaliserteEgnePerioder.reduce((res, p) => {
        const overlappendePerioderAnnenPart = Periodene(normaliserteAnnenPartsPerioder).finnOverlappendePerioder(p);

        if (overlappendePerioderAnnenPart.length === 0) {
            if (isUttaksperiode(p) && p.samtidigUttak !== undefined && initiellMappingFraSaksperioder) {
                res.push({
                    ...p,
                });

                return res;
            }

            res.push(p);

            return res;
        }

        if (isPeriodeUtenUttak(p) || isHull(p)) {
            const overlappendePeriode = overlappendePerioderAnnenPart[0];

            res.push({ ...overlappendePeriode });
            return res;
        }

        if (isUttaksperiode(p) && p.samtidigUttak) {
            const overlappendePeriode = overlappendePerioderAnnenPart[0];
            res.push(p);

            if (!isUtsettelsesperiodeAnnenPart(overlappendePeriode)) {
                res.push({
                    ...overlappendePeriode,
                    samtidigUttak: beregnSamtidiguttaksprosent(p, overlappendePeriode),
                });
            }

            return res;
        } else {
            res.push(p);
            return res;
        }
    }, [] as Planperiode[]);

    result.sort(sorterPerioder);

    const førstePeriodeStartdato = perioder[0].fom;
    const annenPartsUttakSomSlutterFørFørstePeriode = normaliserteAnnenPartsPerioder.filter((ap) =>
        dayjs(ap.tom).isBefore(førstePeriodeStartdato, 'day'),
    );

    const sistePeriodeSluttdato = perioder[perioder.length - 1].tom;
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
