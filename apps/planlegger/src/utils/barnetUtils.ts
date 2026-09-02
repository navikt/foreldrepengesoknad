import { BarnType } from '@navikt/fp-constants';
import {
    Barn,
    BarnetErAdoptertPlanlegger,
    BarnetErFødtPlanlegger,
    BarnetErIkkeFødtPlanlegger,
    OmBarnetPlanlegger,
} from '@navikt/fp-types';

export const erBarnetUFødt = (omBarnet: OmBarnetPlanlegger): omBarnet is BarnetErIkkeFødtPlanlegger => {
    return 'erBarnetFødt' in omBarnet && !omBarnet.erBarnetFødt;
};

export const erBarnetFødt = (omBarnet: OmBarnetPlanlegger): omBarnet is BarnetErFødtPlanlegger => {
    return 'erBarnetFødt' in omBarnet && omBarnet.erBarnetFødt;
};

export const erBarnetAdoptert = (omBarnet: OmBarnetPlanlegger): omBarnet is BarnetErAdoptertPlanlegger => {
    return !(omBarnet as BarnetErAdoptertPlanlegger).erFødsel;
};

export const mapOmBarnetPlanleggerTilBarn = (omBarnet: OmBarnetPlanlegger): Barn => {
    const antallBarn = Number(omBarnet.antallBarn);

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
