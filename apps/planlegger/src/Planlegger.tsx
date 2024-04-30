import { ContextDataType, PlanleggerDataContext, useContextGetData } from 'appData/PlanleggerDataContext';
import { FunctionComponent, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoer } from 'types/TilgjengeligeStønadskontoer';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { HvemHarRett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { decodeBase64 } from 'utils/urlEncodingUtils';

import { createApi, usePostRequest } from '@navikt/fp-api';
import { LocaleAll } from '@navikt/fp-types';
import { ErrorPage } from '@navikt/fp-ui';

import PlanleggerRouter from './PlanleggerRouter';
import Environment from './appData/Environment';

export const planleggerApi = createApi(Environment.REST_API_URL);

const finnBrukerRolle = (hvemHarRett: HvemHarRett) => {
    return hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunMorHarRett' ? 'MOR' : 'FAR';
};

const finnRettighetstype = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett) => {
    if (hvemPlanlegger.type === Situasjon.MOR || hvemPlanlegger.type === Situasjon.FAR) {
        return 'ALENEOMSORG';
    }
    if (hvemHarRett === 'beggeHarRett') {
        return 'BEGGE_RETT';
    }
    return 'BARE_SØKER_RETT';
};

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const PlanleggerDataFetcher: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = useContextGetData(ContextDataType.HVEM_PLANLEGGER);

    const hvemHarRett =
        hvemPlanlegger && arbeidssituasjon ? utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon) : undefined;

    const params = useMemo(
        () => ({
            rettighetstype: hvemPlanlegger && hvemHarRett ? finnRettighetstype(hvemPlanlegger, hvemHarRett) : undefined,
            brukerrolle: hvemPlanlegger && hvemHarRett ? finnBrukerRolle(hvemHarRett) : undefined,
            antallBarn: omBarnet?.antallBarn,
            fødselsdato: omBarnet && erBarnetFødt(omBarnet) ? omBarnet.fødselsdato : undefined,
            termindato: omBarnet && erBarnetUFødt(omBarnet) ? omBarnet.termindato : undefined,
            omsorgsovertakelseDato: omBarnet && erBarnetAdoptert(omBarnet) ? omBarnet.overtakelsesdato : undefined,
            morHarUføretrygd: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
        }),
        [omBarnet, arbeidssituasjon, hvemPlanlegger, hvemHarRett],
    );

    const options = useMemo(
        () => ({
            isSuspended: hvemHarRett === undefined || hvemHarRett === 'ingenHarRett',
            withCredentials: false,
        }),
        [hvemHarRett],
    );

    const requestData = usePostRequest<TilgjengeligeStønadskontoer>(
        planleggerApi,
        Environment.REST_API_URL + '/konto',
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
