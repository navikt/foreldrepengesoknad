import dayjs from 'dayjs';

import { AnnenForelder, Periode } from '@navikt/fp-common';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

import { perioderSomKreverVedleggNy } from './manglendeVedleggUtils';

export const erUttaksperiode = (periode: UttakPeriode_fpoversikt) => {
    return !periode.overføringÅrsak && !periode.oppholdÅrsak && !periode.utsettelseÅrsak;
};

export const erIkkeEøsPeriode = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
): periode is UttakPeriode_fpoversikt => {
    return !('trekkdager' in periode);
};

export const getSamtidigUttaksprosent = (
    gradertPeriode: boolean | undefined,
    stillingsprosent: string | undefined,
): string => {
    return gradertPeriode && stillingsprosent ? (100 - Number.parseInt(stillingsprosent, 10)).toString() : '100';
};

export const getRelevantePerioder = (
    perioder: Periode[],
    endringssøknadPerioder: Periode[] | undefined,
    erEndringssøknad: boolean,
) => {
    if (erEndringssøknad && endringssøknadPerioder !== undefined) {
        return endringssøknadPerioder;
    }

    return perioder;
};

export const prettifyProsent = (nbr: number | undefined): number | undefined => {
    if (nbr === undefined) {
        return undefined;
    }

    if (Number.isNaN(nbr)) {
        return undefined;
    }
    if (Math.round(nbr) === nbr) {
        return Math.round(nbr);
    }
    return nbr;
};

export const getUttaksprosentFromStillingsprosent = (
    stillingsPst: number | undefined,
    samtidigUttakPst: number | undefined,
): number | undefined => {
    if (samtidigUttakPst !== undefined) {
        return samtidigUttakPst;
    }
    if (stillingsPst !== undefined) {
        let prosent = (100 - stillingsPst) * 100;
        prosent = Math.round(prosent) / 100;

        return prosent;
    }
    return undefined;
};

export const isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
): boolean => {
    return (
        erUttaksperiode(periode) &&
        !('trekkdager' in periode) &&
        periode.forelder === 'FAR_MEDMOR' &&
        periode.kontoType === 'FEDREKVOTE' &&
        // FIXME (TOR) Kva skal ein erstatta dette med?
        // !!periode.erMorForSyk === false &&
        periode.morsAktivitet === undefined &&
        !!periode.flerbarnsdager === false &&
        !!periode.samtidigUttak
    );
};

export const isUttaksperiodeFarMedmorPgaFødsel = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsesdato: string,
    termindato: string | undefined,
): boolean => {
    return (
        isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel(periode) &&
        starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(periode.fom, familiehendelsesdato, termindato)
    );
};

export const starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel = (
    fom: string,
    familiehendelsesdato: string,
    termindato: string | undefined,
) => {
    return (
        starterTidsperiodeEtter2UkerFørFødsel(fom, familiehendelsesdato, termindato) &&
        dayjs(fom).isSameOrBefore(getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato), 'day')
    );
};

const getSisteUttaksdag6UkerEtterFødsel = (familiehendelsesdato: string): string => {
    return UttaksdagenString.denneEllerNeste(familiehendelsesdato).getDatoAntallUttaksdagerSenere(30);
};

const starterTidsperiodeEtter2UkerFørFødsel = (
    fom: string,
    familiehendelsesdato: string,
    termindato: string | undefined,
): boolean => {
    const førsteUttaksdagToUkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    return dayjs(fom).isSameOrAfter(førsteUttaksdagToUkerFørFødsel, 'day');
};

const getFørsteUttaksdag2UkerFørFødsel = (familiehendelsesdato: string, termindato: string | undefined): string => {
    const terminEllerFamHendelsesdatoMinusToUker =
        termindato !== undefined
            ? dayjs(termindato).subtract(14, 'day')
            : dayjs(familiehendelsesdato).subtract(14, 'day');
    const datoÅRegneFra = dayjs.min(terminEllerFamHendelsesdatoMinusToUker, dayjs(familiehendelsesdato));
    return UttaksdagenString.denneEllerNeste(datoÅRegneFra.format(ISO_DATE_FORMAT)).getDato();
};

export const kreverUttaksplanVedleggNy = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
) => {
    const periodeSomManglerVedlegg = perioderSomKreverVedleggNy(uttaksplan, erFarEllerMedmor, annenForelder);

    return periodeSomManglerVedlegg.length > 0;
};
