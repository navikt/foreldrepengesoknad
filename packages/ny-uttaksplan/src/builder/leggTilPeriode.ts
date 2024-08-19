import dayjs from 'dayjs';

import {
    Periode,
    Periodene,
    StønadskontoType,
    Tidsperioden,
    Uttaksperiode,
    guid,
    sorterPerioder,
} from '@navikt/fp-common';
import { Uttaksdagen } from '@navikt/fp-common/src/common/utils/Uttaksdagen';

import {
    getPeriodeHullEllerPeriodeUtenUttak,
    getTidsperiodeMellomPerioder,
    normaliserPerioder,
} from './uttaksplanbuilderUtils';

export const splittPeriodePåDato = (periode: Periode, dato: Date): Periode[] => {
    const periodeFørDato: Periode = {
        ...periode,
        tidsperiode: {
            fom: periode.tidsperiode.fom,
            tom: Uttaksdagen(dato).forrige(),
        },
    };

    const periodeFraOgMedDato: Periode = {
        ...periode,
        id: guid(),
        tidsperiode: {
            fom: Uttaksdagen(periodeFørDato.tidsperiode.tom).neste(),
            tom: periode.tidsperiode.tom,
        },
    };

    return [periodeFørDato, periodeFraOgMedDato];
};

export const splittUttaksperiodePåFamiliehendelsesdato = (periode: Uttaksperiode, famDato: Date): Uttaksperiode[] => {
    const periodeFørFamDato: Periode = {
        ...periode,
        konto: periode.konto == StønadskontoType.Foreldrepenger ? StønadskontoType.AktivitetsfriKvote : periode.konto,
        morsAktivitetIPerioden:
            periode.konto == StønadskontoType.Foreldrepenger ? undefined : periode.morsAktivitetIPerioden,
        erMorForSyk: periode.konto == StønadskontoType.Foreldrepenger ? undefined : periode.erMorForSyk,
        tidsperiode: {
            fom: periode.tidsperiode.fom,
            tom: Uttaksdagen(famDato).forrige(),
        },
    };

    const periodeFraOgMedFamDato: Periode = {
        ...periode,
        id: guid(),
        tidsperiode: {
            fom: Uttaksdagen(periodeFørFamDato.tidsperiode.tom).neste(),
            tom: periode.tidsperiode.tom,
        },
    };

    return [periodeFørFamDato, periodeFraOgMedFamDato];
};

interface LeggTilPeriodeParams {
    perioder: Periode[];
    nyPeriode: Periode;
    familiehendelsesdato: Date;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    bareFarHarRett: boolean;
    erFarEllerMedmor: boolean;
    førsteUttaksdagNesteBarnsSak: Date | undefined;
}

export const leggTilPeriode = ({
    perioder,
    nyPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    bareFarHarRett,
    erFarEllerMedmor,
    førsteUttaksdagNesteBarnsSak,
}: LeggTilPeriodeParams): Periode[] => {
    if (perioder.length === 0) {
        return [nyPeriode];
    }

    const nyPeriodeFomDate = nyPeriode.tidsperiode.fom;
    const nyPeriodeTomDate = nyPeriode.tidsperiode.tom;

    if (
        dayjs(nyPeriodeFomDate).isBefore(familiehendelsesdato, 'day') &&
        dayjs(nyPeriodeTomDate).isSameOrAfter(familiehendelsesdato, 'day')
    ) {
        // Nye perioder skal legges før eller etter famdato ikke begge deler
        return [...perioder];
    }

    const berørtePerioder = perioder.filter((p) => Tidsperioden(p.tidsperiode).overlapper(nyPeriode.tidsperiode));
    if (berørtePerioder.length > 0) {
        //TODO: Gjelder dette fortsatt?
        // if (isForeldrepengerFørFødselUttaksperiode(berørtPeriode)) {
        //     // Uttak som legges over FFF skal ikke tillates av validering. Ignore
        //     return [...perioder];
        // }

        const foregåendePerioder = Periodene(perioder).finnAlleForegåendePerioder(berørtePerioder[0]);
        const påfølgendePerioder = Periodene(perioder).finnAllePåfølgendePerioder(
            berørtePerioder[berørtePerioder.length - 1],
        );

        //TODO: Må endre navn i normaliserPerioder hvis denne skal brukes
        const {
            normaliserteEgnePerioder: normaliserteBerørtePerioder,
            normaliserteAnnenPartsPerioder: normaliserteNyePerioder,
        } = normaliserPerioder(berørtePerioder, [nyPeriode]);

        const erstattedeBerørtePerioder = normaliserteBerørtePerioder.map((p) => {
            const overlappendeNyPeriode = normaliserteNyePerioder.find((nyPeriode) =>
                dayjs(nyPeriode.tidsperiode.fom).isSame(p.tidsperiode.fom, 'day'),
            );
            return overlappendeNyPeriode || p;
        });

        //Når ny periode starter før alle de gamle periodene
        if (
            dayjs(normaliserteNyePerioder[0].tidsperiode.fom).isBefore(
                normaliserteBerørtePerioder[0].tidsperiode.fom,
                'd',
            )
        ) {
            erstattedeBerørtePerioder.unshift(normaliserteNyePerioder[0]);
        }

        //Når ny periode slutter etter alle de gamle periodene
        if (
            dayjs(normaliserteNyePerioder[normaliserteNyePerioder.length - 1].tidsperiode.fom).isAfter(
                normaliserteBerørtePerioder[normaliserteBerørtePerioder.length - 1].tidsperiode.tom,
                'd',
            )
        ) {
            erstattedeBerørtePerioder.push(normaliserteNyePerioder[normaliserteNyePerioder.length - 1]);
        }

        return [...foregåendePerioder, ...erstattedeBerørtePerioder, ...påfølgendePerioder];
    } else {
        const førstePeriode = perioder[0];
        const sistePeriode = perioder[perioder.length - 1];
        const nyPeriodeFom = dayjs(nyPeriode.tidsperiode.fom);

        if (nyPeriodeFom.isBefore(førstePeriode.tidsperiode.fom, 'day')) {
            const tidsperiodeMellomNyPeriodeOgFørstePeriode = getTidsperiodeMellomPerioder(
                nyPeriode.tidsperiode,
                førstePeriode.tidsperiode,
            );

            if (tidsperiodeMellomNyPeriodeOgFørstePeriode) {
                return [
                    nyPeriode,
                    ...getPeriodeHullEllerPeriodeUtenUttak(
                        tidsperiodeMellomNyPeriodeOgFørstePeriode,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsesdato,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        førsteUttaksdagNesteBarnsSak,
                    ),
                    ...perioder,
                ];
            }

            return [nyPeriode, ...perioder];
        } else {
            const tidsperiodeMellomSistePeriodeOgNyPeriode = getTidsperiodeMellomPerioder(
                sistePeriode.tidsperiode,
                nyPeriode.tidsperiode,
            );

            if (tidsperiodeMellomSistePeriodeOgNyPeriode) {
                return [
                    ...perioder,
                    ...getPeriodeHullEllerPeriodeUtenUttak(
                        tidsperiodeMellomSistePeriodeOgNyPeriode,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsesdato,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor,
                        førsteUttaksdagNesteBarnsSak,
                    ),
                    nyPeriode,
                ];
            }

            return [...perioder, nyPeriode].sort(sorterPerioder);
        }
    }
};
