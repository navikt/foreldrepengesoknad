import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { useDocumentTitle } from '@navikt/fp-utils';

import ContentSection from 'app/components/content-section/ContentSection';
import { DinSakHeader } from 'app/components/header/Header';
import { useAnnenPartsVedtak } from 'app/hooks/useAnnenPartsVedtak';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { PageRouteLayout } from 'app/routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getAlleYtelser, getNavnAnnenForelder } from 'app/utils/sakerUtils';

interface Props {
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
}

const DinPlanPage: React.FunctionComponent<Props> = ({ saker, søkerinfo }) => {
    const intl = useIntl();
    const params = useParams();
    useDocumentTitle(`${intl.formatMessage({ id: 'dinPlan' })} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`);
    useSetSelectedRoute(OversiktRoutes.DIN_PLAN);
    const sak = getAlleYtelser(saker).find((sak) => sak.saksnummer === params.saksnummer)!;
    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, sak);

    const annenPartsPerioder = useAnnenPartsVedtak(sak).data?.perioder ?? [];

    if (sak && sak.ytelse === Ytelse.FORELDREPENGER) {
        return (
            <PageRouteLayout header={<DinSakHeader sak={sak} />}>
                <ContentSection heading="Din plan">
                    <DinPlan
                        sak={sak}
                        visHelePlanen={true}
                        navnPåSøker={søkerinfo.søker.fornavn}
                        navnAnnenForelder={navnAnnenForelder}
                        annenPartsPerioder={annenPartsPerioder}
                        termindato={sak.familiehendelse.termindato}
                    ></DinPlan>
                </ContentSection>
            </PageRouteLayout>
        );
    }
    return null;
};

export default DinPlanPage;
