import { BarnType } from '@navikt/fp-constants';
import {
    Barn,
    Dekningsgrad,
    Kjønn_fpoversikt,
    Søkerrolle,
    SøkersituasjonFp,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { ContextDataMap, ContextDataType } from './FpDataContext';
import { PlanleggerDataFromUrl } from './usePlanleggerDataFromUrl';

type BarnetErFødt = {
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: true;
    fødselsdato: string;
    termindato?: string;
};

type BarnetErIkkeFødt = {
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: false;
    termindato: string;
};

type BarnetErAdoptert = {
    erFødsel: false;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
};

type OmBarnet = BarnetErFødt | BarnetErIkkeFødt | BarnetErAdoptert;

type HvorLangPeriode = {
    dekningsgrad: Dekningsgrad;
};

const erBarnetAdoptert = (barnet: OmBarnet): barnet is BarnetErAdoptert => barnet.erFødsel === false;

const erBarnetFødt = (barnet: OmBarnet): barnet is BarnetErFødt => (barnet as BarnetErFødt).erBarnetFødt === true;

const utledRolleForSøker = (kjønn: Kjønn_fpoversikt): Søkerrolle | undefined => {
    if (kjønn === 'M') {
        return 'far';
    }
    return undefined;
};

const mapOmBarnetTilBarn = (barnet: OmBarnet): Barn => {
    const antallBarn = Number.parseInt(barnet.antallBarn, 10);

    if (erBarnetAdoptert(barnet)) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn,
            adopsjonsdato: barnet.overtakelsesdato,
            fødselsdatoer: [barnet.fødselsdato],
        };
    }

    if (erBarnetFødt(barnet)) {
        return {
            type: BarnType.FØDT,
            antallBarn,
            fødselsdatoer: [barnet.fødselsdato],
            termindato: barnet.termindato,
        };
    }

    return {
        type: BarnType.UFØDT,
        antallBarn,
        termindato: barnet.termindato,
    };
};

export const mapPlanleggerDataToSøknadState = (
    data: PlanleggerDataFromUrl,
    kjønn: Kjønn_fpoversikt,
): Partial<ContextDataMap> => {
    const result: Partial<ContextDataMap> = {};

    const barnet = data.OM_BARNET as OmBarnet | undefined;
    const periode = data.HVOR_LANG_PERIODE as HvorLangPeriode | undefined;

    if (barnet) {
        const situasjon = erBarnetAdoptert(barnet) ? 'adopsjon' : 'fødsel';
        const rolle = utledRolleForSøker(kjønn);
        if (rolle) {
            const søkersituasjon: SøkersituasjonFp = {
                situasjon,
                rolle,
            };
            result[ContextDataType.SØKERSITUASJON] = søkersituasjon;
        }
    }

    if (barnet) {
        result[ContextDataType.OM_BARNET] = mapOmBarnetTilBarn(barnet);
    }

    if (periode) {
        result[ContextDataType.PERIODE_MED_FORELDREPENGER] = periode.dekningsgrad;
    }

    const uttaksplan = data.UTTAKSPLAN as
        | Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>
        | undefined;
    if (uttaksplan) {
        result[ContextDataType.UTTAKSPLAN] = uttaksplan;
    }

    return result;
};
