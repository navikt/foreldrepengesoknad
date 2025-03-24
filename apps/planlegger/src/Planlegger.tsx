import { useQuery } from '@tanstack/react-query';
import { ContextDataType, PlanleggerDataContext, useContextGetData } from 'appData/PlanleggerDataContext';
import ky from 'ky';
import { useLocation } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { HvemHarRett, harMorRett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { Loader } from '@navikt/ds-react';

import { StønadskontoType } from '@navikt/fp-constants';
import { HvemPlanleggerType, LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';
import { decodeBase64 } from '@navikt/fp-utils';

import { PlanleggerRouter } from './PlanleggerRouter';

const Spinner = () => (
    <div style={{ textAlign: 'center', padding: '12rem 0' }}>
        <Loader size="2xlarge" />
    </div>
);

const finnBrukerRolle = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett) => {
    return harMorRett(hvemHarRett, hvemPlanlegger) ? 'MOR' : 'FAR';
};

const finnRettighetstype = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett, omBarnet: OmBarnet) => {
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR || hvemPlanlegger.type === HvemPlanleggerType.FAR) {
        return 'ALENEOMSORG';
    }

    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR && !erBarnetAdoptert(omBarnet)) {
        return 'BARE_SØKER_RETT';
    }

    if (hvemHarRett === 'beggeHarRett') {
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

    return ky.post(`${import.meta.env.BASE_URL}/rest/konto`, { json: params }).json<TilgjengeligeStønadskontoer>();
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
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/satser`).json<Satser>(),
    });

    const stønadskontoerData = useQuery({
        queryKey: ['KONTOER', omBarnet, arbeidssituasjon, hvemPlanlegger],
        queryFn: () => getStønadskontoer(omBarnet, arbeidssituasjon, hvemPlanlegger),
        enabled: hvemHarRett !== undefined && hvemHarRett !== 'ingenHarRett',
        select: (data: TilgjengeligeStønadskontoer): TilgjengeligeStønadskontoer => {
            // Fix for å ikke vise "Foreldrepenger uten aktivitetskrav"
            // Hvis ikke far-og-far, returner uendret
            if (hvemPlanlegger?.type !== HvemPlanleggerType.FAR_OG_FAR) {
                return data;
            }
            // Lag en dyp kopi for å unngå å modifisere original data
            const modifiserteData: TilgjengeligeStønadskontoer = JSON.parse(JSON.stringify(data));
            // Liste over dekningsgrader vi skal prosessere
            const dekningsgrader: Array<keyof TilgjengeligeStønadskontoer> = ['80', '100'];
            // Bearbeide hver dekningsgrad
            dekningsgrader.forEach((dekningsgrad) => {
                const stønadskonto = modifiserteData[dekningsgrad];
                if (stønadskonto?.kontoer) {
                    // Summer antall dager i alle kontoer
                    const totalDager = stønadskonto.kontoer.reduce((sum, konto) => sum + konto.dager, 0);
                    // Filtrer og behold kun 'AKTIVITETSFRI_KVOTE' -kontoen
                    stønadskonto.kontoer = stønadskonto.kontoer
                        .filter((konto) => konto.konto === StønadskontoType.AktivitetsfriKvote)
                        .map((konto) => ({ ...konto, dager: totalDager }));
                }
            });
            return modifiserteData;
        },
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
