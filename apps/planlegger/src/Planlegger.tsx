import { ContextDataType, PlanleggerDataContext, useContextGetData } from 'appData/PlanleggerDataContext';
import { FunctionComponent, useMemo } from 'react';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { HvemHarRett, harMorRett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { getAxiosInstance, usePostRequest } from '@navikt/fp-api';
import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';

import PlanleggerRouter from './PlanleggerRouter';
import Environment from './appData/Environment';

export const planleggerApi = getAxiosInstance();

const finnBrukerRolle = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett) => {
    return harMorRett(hvemHarRett, hvemPlanlegger) ? 'MOR' : 'FAR';
};

const finnRettighetstype = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett) => {
    if (hvemPlanlegger.type === Situasjon.MOR || hvemPlanlegger.type === Situasjon.FAR) {
        return 'ALENEOMSORG';
    }
    return hvemHarRett === 'beggeHarRett' ? 'BEGGE_RETT' : 'BARE_SØKER_RETT';
};

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const PlanleggerDataFetcher: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = useContextGetData(ContextDataType.HVEM_PLANLEGGER);

    const hvemHarRett = arbeidssituasjon ? utledHvemSomHarRett(arbeidssituasjon) : undefined;

    const params = useMemo(
        () => ({
            rettighetstype: hvemPlanlegger && hvemHarRett ? finnRettighetstype(hvemPlanlegger, hvemHarRett) : undefined,
            brukerrolle: hvemPlanlegger && hvemHarRett ? finnBrukerRolle(hvemPlanlegger, hvemHarRett) : undefined,
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
        `${Environment.PUBLIC_PATH}/rest/konto`,
        params,
        options,
    );

    if (requestData.error) {
        return <SimpleErrorPage />;
    }

    return <PlanleggerRouter locale={locale} changeLocale={changeLocale} stønadskontoer={requestData.data} />;
};

const PlanleggerDataInit: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return (
        <PlanleggerDataContext>
            <PlanleggerDataFetcher locale={locale} changeLocale={changeLocale} />
        </PlanleggerDataContext>
    );
};

export default PlanleggerDataInit;
