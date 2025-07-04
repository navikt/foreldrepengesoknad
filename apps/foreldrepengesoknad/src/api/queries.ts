import { queryOptions, useQuery } from '@tanstack/react-query';
import { getStønadskontoParams } from 'api/getStønadskontoParams';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { annenPartVedtakOptions, tilgjengeligeStønadskontoerOptions } from 'appData/api';
import { annenForelderHarNorskFnr, getAnnenPartVedtakParam } from 'utils/annenForelderUtils';

import { notEmpty } from '@navikt/fp-validation';

export const useStønadsKontoerOptions = () => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);

    const annenPartOptions = useAnnenPartVedtakOptions();
    const annenPartVedtakQuery = useQuery(annenPartOptions);

    const stønadskontoParams = getStønadskontoParams({
        barn,
        annenForelder,
        søkersituasjon,
        barnFraNesteSak,
        annenPartsVedtak: annenPartVedtakQuery.data,
        eksisterendeSak,
    });

    return tilgjengeligeStønadskontoerOptions(stønadskontoParams);
};

export const useAnnenPartVedtakOptions = () => {
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);
    const barn = useContextGetData(ContextDataType.OM_BARNET);

    const enabled = !!annenForelder && !!barn && annenForelderHarNorskFnr(annenForelder);
    return queryOptions({
        ...annenPartVedtakOptions(enabled ? getAnnenPartVedtakParam(annenForelder, barn) : undefined),
        enabled,
    });
};
