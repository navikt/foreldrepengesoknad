import { ContextDataType, PlanleggerDataContext, useContextGetData } from 'appData/PlanleggerDataContext';
import { FunctionComponent, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { Situasjon } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import { decodeBase64 } from 'utils/urlEncodingUtils';

import { createApi, usePostRequest } from '@navikt/fp-api';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorPage } from '@navikt/fp-ui';

import PlanleggerRouter from './PlanleggerRouter';
import Environment from './appData/Environment';

export const planleggerApi = createApi(Environment.REST_API_URL);

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const PlanleggerDataFetcher: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = useContextGetData(ContextDataType.HVEM_PLANLEGGER);

    const hvemHarRett =
        hvemPlanlegger && arbeidssituasjon ? utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon) : undefined;

    const params = useMemo(
        () => ({
            antallBarn: omBarnet?.antallBarn,
            morHarRett: hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunMorHarRett',
            farHarRett:
                hvemHarRett === 'beggeHarRett' ||
                hvemHarRett === 'kunFarHarRett' ||
                hvemHarRett === 'kunFarHarRettMorHovedsøker' ||
                hvemHarRett === 'kunMedfarEllerMedmorHarRett',
            morHarAleneomsorg: hvemPlanlegger?.type === Situasjon.MOR,
            farHarAleneomsorg: hvemPlanlegger?.type === Situasjon.FAR,
            fødselsdato: omBarnet && erBarnetFødt(omBarnet) ? omBarnet.fødselsdato : undefined,
            termindato: omBarnet && erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : undefined,
            omsorgsovertakelseDato: omBarnet && erBarnetAdoptert(omBarnet) ? omBarnet.overtakelsesdato : undefined,
            morHarUføretrygd: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
            erMor: hvemPlanlegger?.type !== Situasjon.FAR && hvemPlanlegger?.type !== Situasjon.FAR_OG_FAR,
            minsterett: true,
            harAnnenForelderTilsvarendeRettEØS: false,
        }),
        [omBarnet, arbeidssituasjon, hvemPlanlegger, hvemHarRett],
    );

    const options = useMemo(
        () => ({
            isSuspended: arbeidssituasjon === undefined,
            withCredentials: false,
        }),
        [arbeidssituasjon],
    );

    const requestData = usePostRequest<TilgjengeligeStønadskontoerDTO>(
        planleggerApi,
        'https://foreldrepengesoknad-api.nav.no/rest/konto',
        params,
        options,
    );

    if (requestData.error) {
        return (
            <ErrorPage
                appName="Foreldrepengeplanlegger"
                errorMessage={requestData.error.message}
                retryCallback={() => location.reload()}
            />
        );
    }

    return <PlanleggerRouter locale={locale} changeLocale={changeLocale} stønadskontoer={requestData.data} />;
};

const PlanleggerDataInit: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const locations = useLocation();

    const dataParam = new URLSearchParams(locations.search).get('data');
    const data = dataParam ? JSON.parse(decodeBase64(dataParam)) : undefined;

    return (
        <PlanleggerDataContext initialState={data}>
            <PlanleggerDataFetcher locale={locale} changeLocale={changeLocale} />
        </PlanleggerDataContext>
    );
};

export default PlanleggerDataInit;
