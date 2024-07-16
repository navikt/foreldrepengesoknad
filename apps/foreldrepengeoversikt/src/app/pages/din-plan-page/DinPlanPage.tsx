import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';

import { Loader } from '@navikt/ds-react';

import { useDocumentTitle } from '@navikt/fp-utils';

import { hentAnnenPartsVedtakOptions } from 'app/api/api';
import ContentSection from 'app/components/content-section/ContentSection';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getFamiliehendelseDato, getNavnAnnenForelder } from 'app/utils/sakerUtils';

interface Props {
    navnPåSøker: string;
    søkerinfo: SøkerinfoDTO;
}

const DinPlanPage: React.FunctionComponent<Props> = ({ navnPåSøker, søkerinfo }) => {
    useSetSelectedRoute(OversiktRoutes.DIN_PLAN);
    const sak = useGetSelectedSak();
    const intl = useIntl();
    useDocumentTitle(`${intl.formatMessage({ id: 'dinPlan' })} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`);
    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, sak);

    const planErVedtatt = sak?.åpenBehandling === undefined;
    let familiehendelse = undefined;
    let annenPartFødselsnummer = undefined;
    let barnFødselsnummer = undefined;
    let annenPartVedtakIsSuspended = true;
    // TODO: lik som i saksoversikt. Refactor
    if (sak && sak.ytelse === Ytelse.FORELDREPENGER) {
        familiehendelse = getFamiliehendelseDato(sak.familiehendelse);
        annenPartFødselsnummer = sak.annenPart?.fnr;
        const barnFraSak =
            sak.barn && sak.barn.length > 0 ? sak.barn.find((barn) => barn.fnr !== undefined) : undefined;
        barnFødselsnummer = barnFraSak ? barnFraSak.fnr : undefined;
        annenPartVedtakIsSuspended =
            !planErVedtatt ||
            annenPartFødselsnummer === undefined ||
            annenPartFødselsnummer === '' ||
            familiehendelse === undefined;
    }
    const annenPartsVedtakQuery = useQuery({
        ...hentAnnenPartsVedtakOptions({
            annenPartFødselsnummer,
            barnFødselsnummer,
            familiehendelse,
        }),
        enabled: !annenPartVedtakIsSuspended,
    });

    if (!annenPartVedtakIsSuspended && annenPartsVedtakQuery.isPending) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader type="XXL" />
            </div>
        );
    }
    if (sak && sak.ytelse === Ytelse.FORELDREPENGER) {
        return (
            <ContentSection heading="Din plan">
                <DinPlan
                    sak={sak}
                    visHelePlanen={true}
                    navnPåSøker={navnPåSøker}
                    navnAnnenForelder={navnAnnenForelder}
                    annenPartsPerioder={annenPartsVedtakQuery.data?.perioder}
                    termindato={sak.familiehendelse.termindato}
                ></DinPlan>
            </ContentSection>
        );
    }
    return <div></div>;
};

export default DinPlanPage;
