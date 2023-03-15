import ContentSection from 'app/components/content-section/ContentSection';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getNavnAnnenForelder } from 'app/utils/sakerUtils';
import React from 'react';
interface Props {
    navnPåSøker: string;
    søkerinfo: SøkerinfoDTO;
}

const DinPlanPage: React.FunctionComponent<Props> = ({ navnPåSøker, søkerinfo }) => {
    useSetSelectedRoute(OversiktRoutes.DIN_PLAN);
    const sak = useGetSelectedSak();

    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, sak);

    if (sak && sak.ytelse === Ytelse.FORELDREPENGER) {
        return (
            <ContentSection heading="Din plan" padding="large">
                <DinPlan
                    sak={sak}
                    visHelePlanen={true}
                    navnPåSøker={navnPåSøker}
                    navnAnnenForelder={navnAnnenForelder}
                ></DinPlan>
            </ContentSection>
        );
    }
    return <div></div>;
};

export default DinPlanPage;
