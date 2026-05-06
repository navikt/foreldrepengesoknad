import { BarnetErAdoptertPlanlegger, BarnetErFødtPlanlegger, BarnetErIkkeFødtPlanlegger, Barn, OmBarnetPlanlegger } from '@navikt/fp-types';

import { BarnType } from '@navikt/fp-constants';

export const erBarnetUFødt = (omBarnet: OmBarnetPlanlegger): omBarnet is BarnetErIkkeFødtPlanlegger => {
    if ((omBarnet as BarnetErIkkeFødtPlanlegger).erBarnetFødt === false) {
        return true;
    }
    return false;
};

export const erBarnetFødt = (omBarnet: OmBarnetPlanlegger): omBarnet is BarnetErFødtPlanlegger => {
    if ((omBarnet as BarnetErFødtPlanlegger).erBarnetFødt === true) {
        return true;
    }
    return false;
};

export const erBarnetAdoptert = (omBarnet: OmBarnetPlanlegger): omBarnet is BarnetErAdoptertPlanlegger => {
    if ((omBarnet as BarnetErAdoptertPlanlegger).erFødsel === false) {
        return true;
    }
    return false;
};

export const mapOmBarnetPlanleggerTilBarn = (omBarnet: OmBarnetPlanlegger): Barn => {
    const antallBarn = Number.parseInt(omBarnet.antallBarn, 10);

    if (erBarnetUFødt(omBarnet)) {
        return {
            type: BarnType.UFØDT,
            antallBarn: antallBarn,
            termindato: omBarnet.termindato,
        };
    }

    if (erBarnetAdoptert(omBarnet)) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: antallBarn,
            adopsjonsdato: omBarnet.overtakelsesdato,
            fødselsdatoer: [omBarnet.fødselsdato],
        };
    }

    return {
        type: BarnType.FØDT,
        antallBarn: antallBarn,
        termindato: omBarnet.termindato,
        fødselsdatoer: [omBarnet.fødselsdato],
    };
};
