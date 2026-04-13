import { AnnenForelder } from 'types/AnnenForelder';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan';

import { perioderSomKreverVedleggNy } from './manglendeVedleggUtils';

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
        Uttaksperioden.erUttaksperiode(periode) &&
        Uttaksperioden.erIkkeEøsPeriode(periode) &&
        periode.forelder === 'FAR_MEDMOR' &&
        periode.kontoType === 'FEDREKVOTE' &&
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
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode,
            familiehendelsesdato,
            termindato,
        )
    );
};

export const kreverUttaksplanVedleggNy = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
    familiehendelsedato: string,
) => {
    const periodeSomManglerVedlegg = perioderSomKreverVedleggNy(
        uttaksplan,
        erFarEllerMedmor,
        annenForelder,
        familiehendelsedato,
    );

    return periodeSomManglerVedlegg.length > 0;
};
