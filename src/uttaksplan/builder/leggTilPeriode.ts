import { Periodene, sorterPerioder } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import {
    isForeldrepengerFørFødselUttaksperiode,
    isOverskrivbarPeriode,
    isUtsettelsesperiode,
    Periode,
    Uttaksperiode,
} from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getPeriodeHullEllerPeriodeUtenUttak, getTidsperiodeMellomPerioder } from './uttaksplanbuilderUtils';

const splittPeriodePåPeriode = (berørtPeriode: Periode, nyPeriode: Periode): Periode[] => {
    const dagerIBerørtPeriode = Tidsperioden(berørtPeriode.tidsperiode).getAntallUttaksdager();

    const førsteDel: Periode = {
        ...berørtPeriode,
        tidsperiode: {
            fom: berørtPeriode.tidsperiode.fom,
            tom: Uttaksdagen(nyPeriode.tidsperiode.fom).forrige(),
        },
    };

    const dagerIFørsteDel = Tidsperioden(førsteDel.tidsperiode).getAntallUttaksdager();
    const dagerIAndreDel = dagerIBerørtPeriode - dagerIFørsteDel;
    const startDatoAndreDel = Uttaksdagen(nyPeriode.tidsperiode.tom).neste();

    if (isOverskrivbarPeriode(berørtPeriode)) {
        // Hvis berørt periode er overskrivbar, la forskyvPerioder ta seg av logikk for forskyving av datoer
        const andreDel: Periode = {
            ...berørtPeriode,
            id: guid(),
            tidsperiode: {
                fom: nyPeriode.tidsperiode.fom,
                tom: berørtPeriode.tidsperiode.tom,
            },
        };

        return [førsteDel, nyPeriode, andreDel];
    } else {
        const andreDel: Periode = {
            ...berørtPeriode,
            id: guid(),
            tidsperiode: {
                fom: startDatoAndreDel,
                tom: Uttaksdagen(startDatoAndreDel).leggTil(dagerIAndreDel - 1),
            },
        };

        return [førsteDel, nyPeriode, andreDel];
    }
};

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

const getAntallOverlappendeUttaksdager = (periode: Periode, nyPeriode: Periode): number => {
    if (Periodene([periode]).finnOverlappendePerioder(nyPeriode).length > 0) {
        const dateArray = [
            dayjs(periode.tidsperiode.fom),
            dayjs(periode.tidsperiode.tom),
            dayjs(nyPeriode.tidsperiode.fom),
            dayjs(nyPeriode.tidsperiode.tom),
        ];
        const minDate = dayjs.min(dateArray);
        const maxDate = dayjs.max(dateArray);
        const overlappendeTidsperiode = dateArray.filter((date) => date !== minDate && date !== maxDate);

        return Tidsperioden({
            fom: dayjs.min(overlappendeTidsperiode).toDate(),
            tom: dayjs.max(overlappendeTidsperiode).toDate(),
        }).getAntallUttaksdager();
    }

    return 0;
};

interface LeggTilPeriodeParams {
    perioder: Periode[];
    nyPeriode: Periode;
    familiehendelsesdato: Date;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erAdopsjon: boolean;
    bareFarHarRett: boolean;
    erFarEllerMedmor: boolean;
}

export const leggTilPeriode = ({
    perioder,
    nyPeriode,
    familiehendelsesdato,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    bareFarHarRett,
    erFarEllerMedmor,
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

    const berørtPeriode = perioder.find((p) => Tidsperioden(p.tidsperiode).inneholderDato(nyPeriodeFomDate));

    if (berørtPeriode) {
        if (isUtsettelsesperiode(berørtPeriode) || isForeldrepengerFørFødselUttaksperiode(berørtPeriode)) {
            // Uttak som legges over utsettelse eller FFF skal ikke tillates av validering. Ignore
            return [...perioder];
        }

        const foregåendePerioder = Periodene(perioder).finnAlleForegåendePerioder(berørtPeriode);
        const påfølgendePerioder = Periodene(perioder).finnAllePåfølgendePerioder(berørtPeriode);
        const antallDagerINyPeriode = Tidsperioden(nyPeriode.tidsperiode).getAntallUttaksdager();

        if (dayjs(berørtPeriode.tidsperiode.fom).isSame(nyPeriodeFomDate)) {
            return [
                ...foregåendePerioder,
                nyPeriode,
                ...Periodene([berørtPeriode, ...påfølgendePerioder]).forskyvPerioder(antallDagerINyPeriode),
            ];
        }

        const berørtPeriodeSplittetPåNyPeriode = splittPeriodePåPeriode(berørtPeriode, nyPeriode);

        if (isOverskrivbarPeriode(berørtPeriode)) {
            // Hvis berørt periode er overskrivbar, la forskyvPerioder ta seg av logikk for overskriving
            return [
                ...foregåendePerioder,
                berørtPeriodeSplittetPåNyPeriode[0],
                berørtPeriodeSplittetPåNyPeriode[1],
                ...Periodene([berørtPeriodeSplittetPåNyPeriode[2], ...påfølgendePerioder]).forskyvPerioder(
                    antallDagerINyPeriode
                ),
            ];
        }

        return [
            ...foregåendePerioder,
            ...berørtPeriodeSplittetPåNyPeriode,
            ...Periodene(påfølgendePerioder).forskyvPerioder(antallDagerINyPeriode),
        ];
    } else {
        const førstePeriode = perioder[0];
        const sistePeriode = perioder[perioder.length - 1];
        const nyPeriodeFom = dayjs(nyPeriode.tidsperiode.fom);
        const nyPeriodeTom = dayjs(nyPeriode.tidsperiode.tom);

        if (nyPeriodeFom.isBefore(førstePeriode.tidsperiode.fom, 'day')) {
            const tidsperiodeMellomNyPeriodeOgFørstePeriode = getTidsperiodeMellomPerioder(
                nyPeriode.tidsperiode,
                førstePeriode.tidsperiode
            );

            if (nyPeriodeTom.isSameOrAfter(førstePeriode.tidsperiode.fom, 'day')) {
                if (nyPeriodeFom.isBefore(familiehendelsesdato, 'day')) {
                    // Kan ikke overlappe perioder før fødsel
                    return [...perioder];
                }

                const antallOverlappendeUttaksdager = getAntallOverlappendeUttaksdager(førstePeriode, nyPeriode);

                return [nyPeriode, ...Periodene(perioder).forskyvPerioder(antallOverlappendeUttaksdager)];
            }

            if (tidsperiodeMellomNyPeriodeOgFørstePeriode) {
                return [
                    nyPeriode,
                    ...getPeriodeHullEllerPeriodeUtenUttak(
                        tidsperiodeMellomNyPeriodeOgFørstePeriode,
                        harAktivitetskravIPeriodeUtenUttak,
                        familiehendelsesdato,
                        erAdopsjon,
                        bareFarHarRett,
                        erFarEllerMedmor
                    ),
                    ...perioder,
                ];
            }

            return [nyPeriode, ...perioder];
        } else {
            const tidsperiodeMellomSistePeriodeOgNyPeriode = getTidsperiodeMellomPerioder(
                sistePeriode.tidsperiode,
                nyPeriode.tidsperiode
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
                        erFarEllerMedmor
                    ),
                    nyPeriode,
                ];
            }

            return [...perioder, nyPeriode].sort(sorterPerioder);
        }
    }
};
