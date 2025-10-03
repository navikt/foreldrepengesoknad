import { BarnetErAdoptert, BarnetErFødt, BarnetErIkkeFødt, OmBarnet } from 'types/Barnet';

import { BarnType } from '@navikt/fp-constants';
import { Barn, Familiesituasjon } from '@navikt/fp-types';

export const erBarnetUFødt = (omBarnet: OmBarnet): omBarnet is BarnetErIkkeFødt => {
    if ((omBarnet as BarnetErIkkeFødt).erBarnetFødt === false) {
        return true;
    }
    return false;
};

export const erBarnetFødt = (omBarnet: OmBarnet): omBarnet is BarnetErFødt => {
    if ((omBarnet as BarnetErFødt).erBarnetFødt === true) {
        return true;
    }
    return false;
};

export const erBarnetAdoptert = (omBarnet: OmBarnet): omBarnet is BarnetErAdoptert => {
    if ((omBarnet as BarnetErAdoptert).erFødsel === false) {
        return true;
    }
    return false;
};

export const getFamiliesituasjon = (omBarnet: OmBarnet): Familiesituasjon => {
    if (erBarnetUFødt(omBarnet)) {
        return 'termin';
    }

    if (erBarnetFødt(omBarnet)) {
        return 'fødsel';
    }

    return 'adopsjon';
};

export const mapOmBarnetTilBarn = (omBarnet: OmBarnet): Barn => {
    const antallBarn = Number.parseInt(omBarnet.antallBarn);

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
