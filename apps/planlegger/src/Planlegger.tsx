import { useQuery } from '@tanstack/react-query';
import Environment from 'appData/Environment';
import { ContextDataType, PlanleggerDataContext, useContextGetData } from 'appData/PlanleggerDataContext';
import ky from 'ky';
import { useLocation } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { HvemHarRett, harMorRett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { Loader } from '@navikt/ds-react';

import { LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';
import { decodeBase64 } from '@navikt/fp-utils';

import { PlanleggerRouter } from './PlanleggerRouter';

const Spinner: React.FunctionComponent = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

const finnBrukerRolle = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett) => {
    return harMorRett(hvemHarRett, hvemPlanlegger) ? 'MOR' : 'FAR';
};

const finnRettighetstype = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett, omBarnet: OmBarnet) => {
    if (hvemPlanlegger.type === Situasjon.MOR || hvemPlanlegger.type === Situasjon.FAR) {
        return 'ALENEOMSORG';
    }
    if (
        hvemHarRett === 'beggeHarRett' ||
        (hvemPlanlegger.type === Situasjon.FAR_OG_FAR && !erBarnetAdoptert(omBarnet))
    ) {
        return 'BEGGE_RETT';
    }
    return 'BARE_SØKER_RETT';
};

const getStønadskontoer = async (
    omBarnet?: OmBarnet,
    arbeidssituasjon?: Arbeidssituasjon,
    hvemPlanlegger?: HvemPlanlegger,
) => {
    const hvemHarRett = arbeidssituasjon ? utledHvemSomHarRett(arbeidssituasjon) : undefined;

    const params = {
        rettighetstype:
            hvemPlanlegger && hvemHarRett && omBarnet
                ? finnRettighetstype(hvemPlanlegger, hvemHarRett, omBarnet)
                : undefined,
        brukerrolle: hvemPlanlegger && hvemHarRett ? finnBrukerRolle(hvemPlanlegger, hvemHarRett) : undefined,
        antallBarn: omBarnet?.antallBarn,
        fødselsdato: omBarnet && erBarnetFødt(omBarnet) ? omBarnet.fødselsdato : undefined,
        termindato: omBarnet && erBarnetUFødt(omBarnet) ? omBarnet.termindato : undefined,
        omsorgsovertakelseDato: omBarnet && erBarnetAdoptert(omBarnet) ? omBarnet.overtakelsesdato : undefined,
        morHarUføretrygd: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
    };

    const response = await fetch(`${Environment.PUBLIC_PATH}/rest/konto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30 * 1000),
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as TilgjengeligeStønadskontoer;
};

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const PlanleggerDataFetcher = ({ locale, changeLocale }: Props) => {
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = useContextGetData(ContextDataType.HVEM_PLANLEGGER);

    const hvemHarRett = arbeidssituasjon ? utledHvemSomHarRett(arbeidssituasjon) : undefined;

    const satserData = useQuery({
        queryKey: ['SATSER'],
        queryFn: () => ky.get(`${Environment.PUBLIC_PATH}/rest/satser`).json<Satser>(),
    });

    const stønadskontoerData = useQuery({
        queryKey: ['KONTOER', omBarnet, arbeidssituasjon, hvemPlanlegger],
        queryFn: () => getStønadskontoer(omBarnet, arbeidssituasjon, hvemPlanlegger),
        enabled: hvemHarRett !== undefined && hvemHarRett !== 'ingenHarRett',
    });

    if (stønadskontoerData.error || satserData.error) {
        return <SimpleErrorPage retryCallback={() => location.reload()} />;
    }

    if (!satserData.data) {
        return <Spinner />;
    }

    return (
        <PlanleggerRouter
            locale={locale}
            changeLocale={changeLocale}
            stønadskontoer={stønadskontoerData.data}
            satser={satserData.data}
        />
    );
};

export const PlanleggerDataInit = ({ locale, changeLocale }: Props) => {
    const locations = useLocation();

    const dataParam = new URLSearchParams(locations.search).get('data');
    const data = dataParam ? JSON.parse(decodeBase64(dataParam)) : undefined;

    return (
        <PlanleggerDataContext initialState={data}>
            <PlanleggerDataFetcher locale={locale} changeLocale={changeLocale} />
        </PlanleggerDataContext>
    );
};
