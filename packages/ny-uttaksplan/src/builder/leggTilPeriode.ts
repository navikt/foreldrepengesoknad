import dayjs from 'dayjs';

import { StønadskontoType } from '@navikt/fp-constants';
import { TidsperiodenString, UttaksdagenString } from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';
import { Periodene, sorterPerioder } from '../utils/Periodene';
import { normaliserPerioder } from '../utils/periodeUtils';
import { guid } from './guid';
import { getPeriodeHullEllerPeriodeUtenUttak, getTidsperiodeMellomPerioder } from './uttaksplanbuilderUtils';

export const splittPeriodePåDato = (periode: Planperiode, dato: string): Planperiode[] => {
    const periodeFørDato: Planperiode = {
        ...periode,
        fom: periode.fom,
        tom: UttaksdagenString(dato).forrige(),
    };

    const periodeFraOgMedDato: Planperiode = {
        ...periode,
        id: guid(),
        fom: UttaksdagenString(periodeFørDato.tom).neste(),
        tom: periode.tom,
    };

    return [periodeFørDato, periodeFraOgMedDato];
};

export const splittUttaksperiodePåFamiliehendelsesdato = (periode: Planperiode, famDato: string): Planperiode[] => {
    const periodeFørFamDato: Planperiode = {
        ...periode,
        kontoType:
            periode.kontoType == StønadskontoType.Foreldrepenger
                ? StønadskontoType.AktivitetsfriKvote
                : periode.kontoType,
        morsAktivitet: periode.kontoType == StønadskontoType.Foreldrepenger ? undefined : periode.morsAktivitet,
        fom: periode.fom,
        tom: UttaksdagenString(famDato).forrige(),
    };

    const periodeFraOgMedFamDato: Planperiode = {
        ...periode,
        id: guid(),
        fom: UttaksdagenString(periodeFørFamDato.tom).neste(),
        tom: periode.tom,
    };

    return [periodeFørFamDato, periodeFraOgMedFamDato];
};

interface LeggTilPeriodeParams {
    perioder: Planperiode[];
    nyPeriode: Planperiode;
    familiehendelsesdato: string;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    bareFarHarRett: boolean;
    erFarEllerMedmor: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
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
}: LeggTilPeriodeParams): Planperiode[] => {
    if (perioder.length === 0) {
        return [nyPeriode];
    }

    const nyPeriodeFomDate = nyPeriode.fom;
    const nyPeriodeTomDate = nyPeriode.tom;

    if (
        dayjs(nyPeriodeFomDate).isBefore(familiehendelsesdato, 'day') &&
        dayjs(nyPeriodeTomDate).isSameOrAfter(familiehendelsesdato, 'day')
    ) {
        // Nye perioder skal legges før eller etter famdato ikke begge deler
        return [...perioder];
    }

    const berørtePerioder = perioder.filter((p) =>
        TidsperiodenString({ fom: p.fom, tom: p.tom }).overlapper({ fom: nyPeriode.fom, tom: nyPeriode.tom }),
    );
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
            const overlappendeNyPeriode = normaliserteNyePerioder.find((per) => dayjs(per.fom).isSame(p.fom, 'day'));
            return overlappendeNyPeriode || p;
        });

        //Når ny periode starter før alle de gamle periodene
        if (dayjs(normaliserteNyePerioder[0].fom).isBefore(normaliserteBerørtePerioder[0].fom, 'd')) {
            erstattedeBerørtePerioder.unshift(normaliserteNyePerioder[0]);
        }

        //Når ny periode slutter etter alle de gamle periodene
        if (
            dayjs(normaliserteNyePerioder[normaliserteNyePerioder.length - 1].fom).isAfter(
                normaliserteBerørtePerioder[normaliserteBerørtePerioder.length - 1].tom,
                'd',
            )
        ) {
            erstattedeBerørtePerioder.push(normaliserteNyePerioder[normaliserteNyePerioder.length - 1]);
        }

        return [...foregåendePerioder, ...erstattedeBerørtePerioder, ...påfølgendePerioder];
    } else {
        const førstePeriode = perioder[0];
        const sistePeriode = perioder[perioder.length - 1];
        const nyPeriodeFom = dayjs(nyPeriode.fom);

        if (nyPeriodeFom.isBefore(førstePeriode.fom, 'day')) {
            const tidsperiodeMellomNyPeriodeOgFørstePeriode = getTidsperiodeMellomPerioder(
                { fom: nyPeriode.fom, tom: nyPeriode.tom },
                { fom: førstePeriode.fom, tom: førstePeriode.tom },
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
                { fom: sistePeriode.fom, tom: sistePeriode.tom },
                { fom: nyPeriode.fom, tom: nyPeriode.tom },
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
