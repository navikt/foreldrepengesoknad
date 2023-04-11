import { Loader } from '@navikt/ds-react';
import Api from 'app/api/api';
import ContentSection from 'app/components/content-section/ContentSection';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getFamiliehendelseDato, getNavnAnnenForelder } from 'app/utils/sakerUtils';
import React, { useEffect } from 'react';
interface Props {
    navnPåSøker: string;
    søkerinfo: SøkerinfoDTO;
}

const DinPlanPage: React.FunctionComponent<Props> = ({ navnPåSøker, søkerinfo }) => {
    useSetSelectedRoute(OversiktRoutes.DIN_PLAN);
    const sak = useGetSelectedSak();

    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, sak);
    const planErVedtatt = sak?.åpenBehandling === undefined;
    let familiehendelsesdato = undefined;
    let annenPartFnr = undefined;
    let annenPartVedtakIsSuspended = true;

    if (sak && sak.ytelse === Ytelse.FORELDREPENGER) {
        familiehendelsesdato = getFamiliehendelseDato(sak.familiehendelse);
        annenPartFnr = sak.annenPart?.fnr;
        annenPartVedtakIsSuspended =
            !planErVedtatt || annenPartFnr === undefined || annenPartFnr === '' || familiehendelsesdato === undefined;
    }
    const { annenPartsVedakData, annenPartsVedtakError } = Api.useGetAnnenPartsVedtak(annenPartVedtakIsSuspended);

    useEffect(() => {
        if (annenPartsVedtakError) {
            throw new Error('Vi klarte ikke å hente opp informasjon om den andre forelderen.');
        }
    }, [annenPartsVedtakError]);

    if (!annenPartVedtakIsSuspended && !annenPartsVedakData) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader type="XXL" />
            </div>
        );
    }
    if (sak && sak.ytelse === Ytelse.FORELDREPENGER) {
        return (
            <ContentSection heading="Din plan" padding="large">
                <DinPlan
                    sak={sak}
                    visHelePlanen={true}
                    navnPåSøker={navnPåSøker}
                    navnAnnenForelder={navnAnnenForelder}
                    annenPartsPerioder={annenPartsVedakData?.perioder}
                ></DinPlan>
            </ContentSection>
        );
    }
    return <div></div>;
};

export default DinPlanPage;
