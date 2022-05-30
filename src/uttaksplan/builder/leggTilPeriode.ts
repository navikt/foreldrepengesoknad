import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import {
    isForeldrepengerFørFødselUttaksperiode,
    isHull,
    isInfoPeriode,
    isPeriodeUtenUttak,
    isPeriodeUtenUttakUtsettelse,
    isUtsettelsesperiode,
    Periode,
} from 'uttaksplan/types/Periode';
import { getPeriodeHullEllerPeriodeUtenUttak, getTidsperiodeMellomPerioder } from './uttaksplanbuilderUtils';

const splittPeriode = (berørtPeriode: Periode, nyPeriode: Periode): Periode[] => {
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

    const andreDel: Periode = {
        ...berørtPeriode,
        id: guid(),
        tidsperiode: {
            fom: startDatoAndreDel,
            tom: Uttaksdagen(startDatoAndreDel).leggTil(dagerIAndreDel - 1),
        },
    };

    return [førsteDel, nyPeriode, andreDel];
};

export const leggTilPeriode = (perioder: Periode[], nyPeriode: Periode, familiehendelsesdato: Date): Periode[] => {
    if (perioder.length === 0) {
        return [nyPeriode];
    }

    const nyPeriodeFom = nyPeriode.tidsperiode.fom;
    const berørtPeriode = perioder.find((p) => Tidsperioden(p.tidsperiode).inneholderDato(nyPeriodeFom));

    if (berørtPeriode) {
        if (isUtsettelsesperiode(berørtPeriode) || isForeldrepengerFørFødselUttaksperiode(berørtPeriode)) {
            // Uttak som legges over utsettelse eller FFF skal ikke tillates av validering. Ignore
            return [...perioder];
        }

        const foregåendePerioder = Periodene(perioder).finnAlleForegåendePerioder(berørtPeriode);
        const påfølgendePerioder = Periodene(perioder).finnAllePåfølgendePerioder(berørtPeriode);
        const antallDagerINyPeriode = Tidsperioden(nyPeriode.tidsperiode).getAntallUttaksdager();

        if (dayjs(berørtPeriode.tidsperiode.fom).isSame(nyPeriode.tidsperiode.fom)) {
            return [
                ...foregåendePerioder,
                nyPeriode,
                ...Periodene([berørtPeriode, ...påfølgendePerioder]).forskyvPerioder(antallDagerINyPeriode),
            ];
        }

        const berørtPeriodeSplittetPåNyPeriode = splittPeriode(berørtPeriode, nyPeriode);

        if (
            isInfoPeriode(berørtPeriode) ||
            isHull(berørtPeriode) ||
            isPeriodeUtenUttak(berørtPeriode) ||
            isPeriodeUtenUttakUtsettelse(berørtPeriode)
        ) {
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

        if (nyPeriodeFom.isBefore(førstePeriode.tidsperiode.fom)) {
            const tidsperiodeMellomNyPeriodeOgFørstePeriode = getTidsperiodeMellomPerioder(
                nyPeriode.tidsperiode,
                førstePeriode.tidsperiode
            );

            if (nyPeriodeTom.isSameOrAfter(førstePeriode.tidsperiode.fom)) {
                if (nyPeriodeFom.isBefore(familiehendelsesdato)) {
                    // Kan ikke overlappe perioder før fødsel
                    return [...perioder];
                }
            }

            if (tidsperiodeMellomNyPeriodeOgFørstePeriode) {
                return [
                    nyPeriode,
                    getPeriodeHullEllerPeriodeUtenUttak(tidsperiodeMellomNyPeriodeOgFørstePeriode),
                    ...perioder,
                ];
            }

            return [nyPeriode, ...perioder];
        } else {
            const tidsperiodeMellomSistePeriodeOgNyPeriode = getTidsperiodeMellomPerioder(
                sistePeriode.tidsperiode,
                nyPeriode.tidsperiode
            );

            if (
                nyPeriodeFom.isSameOrBefore(sistePeriode.tidsperiode.tom) &&
                nyPeriodeFom.isBefore(familiehendelsesdato)
            ) {
                // Kan ikke overlappe perioder før fødsel
                return [...perioder];
            }

            if (tidsperiodeMellomSistePeriodeOgNyPeriode) {
                return [
                    ...perioder,
                    getPeriodeHullEllerPeriodeUtenUttak(tidsperiodeMellomSistePeriodeOgNyPeriode),
                    nyPeriode,
                ];
            }

            return [...perioder, nyPeriode];
        }
    }
};
