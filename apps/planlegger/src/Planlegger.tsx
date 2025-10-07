import { useQuery } from '@tanstack/react-query';
import { ContextDataType, PlanleggerDataContext, useContextGetData } from 'appData/PlanleggerDataContext';
import { API_URLS } from 'appData/queries';
import ky from 'ky';
import { useLocation } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { HvemHarRett, harMorRett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { DEFAULT_SATSER, StønadskontoType } from '@navikt/fp-constants';
import { HvemPlanleggerType, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';
import { decodeBase64 } from '@navikt/fp-utils';

import { PlanleggerRouter } from './PlanleggerRouter';

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

    return ky.post(API_URLS.konto, { json: params }).json<TilgjengeligeStønadskontoer>();
};

export const PlanleggerDataFetcher = () => {
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const hvemPlanlegger = useContextGetData(ContextDataType.HVEM_PLANLEGGER);

    const hvemHarRett = arbeidssituasjon ? utledHvemSomHarRett(arbeidssituasjon) : undefined;

    const stønadskontoerData = useQuery({
        queryKey: ['KONTOER', omBarnet, arbeidssituasjon, hvemPlanlegger],
        queryFn: () => getStønadskontoer(omBarnet, arbeidssituasjon, hvemPlanlegger),
        enabled: hvemHarRett !== undefined && hvemHarRett !== 'ingenHarRett',
        select: (data: TilgjengeligeStønadskontoer): TilgjengeligeStønadskontoer => {
            //TODO (TOR) Dette bør ligga i backend. Verkar pussig å henta kontoar for far-og-far, og så modifisera det her

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
            for (const dekningsgrad of dekningsgrader) {
                const stønadskonto = modifiserteData[dekningsgrad];
                if (stønadskonto?.kontoer) {
                    // Summer antall dager i alle kontoer
                    const totalDager = stønadskonto.kontoer.reduce((sum, konto) => sum + konto.dager, 0);
                    // Filtrer og behold kun 'AKTIVITETSFRI_KVOTE' -kontoen
                    stønadskonto.kontoer = stønadskonto.kontoer
                        .filter((konto) => konto.konto === StønadskontoType.AktivitetsfriKvote)
                        .map((konto) => ({ ...konto, dager: totalDager }));
                }
            }
            return modifiserteData;
        },
    });

    if (stønadskontoerData.error) {
        return <SimpleErrorPage retryCallback={() => location.reload()} />;
    }

    return <PlanleggerRouter stønadskontoer={stønadskontoerData.data} satser={DEFAULT_SATSER} />;
};

export const PlanleggerDataInit = () => {
    const locations = useLocation();

    const dataParam = new URLSearchParams(locations.search).get('data');
    const data = dataParam ? JSON.parse(decodeBase64(dataParam)) : undefined;

    return (
        <PlanleggerDataContext initialState={data}>
            <PlanleggerDataFetcher />
        </PlanleggerDataContext>
    );
};
