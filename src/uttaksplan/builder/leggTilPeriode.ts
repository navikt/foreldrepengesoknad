import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import {
    isHull,
    isInfoPeriode,
    isPeriodeUtenUttak,
    isPeriodeUtenUttakUtsettelse,
    isUtsettelsesperiode,
    Periode,
} from 'uttaksplan/types/Periode';

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

export const leggTilPeriode = (perioder: Periode[], nyPeriode: Periode): Periode[] => {
    const nyPeriodeFom = nyPeriode.tidsperiode.fom;
    const berørtPeriode = perioder.find((p) => Tidsperioden(p.tidsperiode).inneholderDato(nyPeriodeFom));

    if (berørtPeriode) {
        if (isUtsettelsesperiode(berørtPeriode)) {
            // Uttak som legges over utsettelse skal ikke tillates av validering. Ignore
            return [...perioder];
        }

        const foregåendePerioder = Periodene(perioder).finnAlleForegåendePerioder(berørtPeriode);
        const påfølgendePerioder = Periodene(perioder).finnAllePåfølgendePerioder(berørtPeriode);
        const antallDagerINyPeriode = Tidsperioden(nyPeriode.tidsperiode).getAntallUttaksdager();

        if (dayjs(berørtPeriode.tidsperiode.fom).isSame(nyPeriode.tidsperiode.fom)) {
            return [
                ...foregåendePerioder,
                nyPeriode,
                ...Periodene(påfølgendePerioder).forskyvPerioder(antallDagerINyPeriode),
            ];
        }

        const berørtPeriodeSplittetPåNyPeriode = splittPeriode(berørtPeriode, nyPeriode);

        if (
            isInfoPeriode(berørtPeriode) ||
            isHull(berørtPeriode) ||
            isPeriodeUtenUttak(berørtPeriode) ||
            isPeriodeUtenUttakUtsettelse(berørtPeriode)
        ) {
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
        return [...perioder, nyPeriode];
    }
};
