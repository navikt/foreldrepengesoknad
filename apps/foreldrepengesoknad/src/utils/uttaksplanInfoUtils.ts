import { AnnenForelder } from 'types/AnnenForelder';

import { PeriodeDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan/validators';

import { perioderSomKreverVedlegg } from './manglendeVedleggUtils';

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

const isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel = (periode: PeriodeDto_fpoversikt): boolean => {
    const søker = periode.søker;
    return (
        !!søker &&
        Uttaksperioden.erUttaksperiode(søker) &&
        søker.forelder === 'FAR_MEDMOR' &&
        søker.kontoType === 'FEDREKVOTE' &&
        søker.morsAktivitet === undefined &&
        !søker.flerbarnsdager &&
        !!søker.samtidigUttak
    );
};

export const isUttaksperiodeFarMedmorPgaFødsel = (
    periode: PeriodeDto_fpoversikt,
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
    uttaksplan: PeriodeDto_fpoversikt[],
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
    familiehendelsedato: string,
) => {
    const periodeSomManglerVedlegg = perioderSomKreverVedlegg(
        uttaksplan,
        erFarEllerMedmor,
        annenForelder,
        familiehendelsedato,
    );

    return periodeSomManglerVedlegg.length > 0;
};
