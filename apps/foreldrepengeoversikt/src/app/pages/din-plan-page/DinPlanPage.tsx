import { Loader } from '@navikt/ds-react';
import Api from 'app/api/api';
import ContentSection from 'app/components/content-section/ContentSection';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import { RequestStatus } from 'app/types/RequestStatus';
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

    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, sak);
    const planErVedtatt = sak?.åpenBehandling === undefined;
    let familiehendelsesdato = undefined;
    let annenPartFnr = undefined;
    let barnFnr = undefined;
    let annenPartVedtakIsSuspended = true;

    if (sak && sak.ytelse === Ytelse.FORELDREPENGER) {
        familiehendelsesdato = getFamiliehendelseDato(sak.familiehendelse);
        annenPartFnr = sak.annenPart?.fnr;
        const barnFraSak =
            sak.barn && sak.barn.length > 0 ? sak.barn.find((barn) => barn.fnr !== undefined) : undefined;
        barnFnr = barnFraSak ? barnFraSak.fnr : undefined;
        annenPartVedtakIsSuspended =
            !planErVedtatt || annenPartFnr === undefined || annenPartFnr === '' || familiehendelsesdato === undefined;
    }
    const { annenPartsVedtakData, annenPartsVedtakError, annenPartsVedtakRequestStatus } = Api.useGetAnnenPartsVedtak(
        annenPartFnr,
        barnFnr,
        familiehendelsesdato,
        annenPartVedtakIsSuspended
    );

    if (
        !annenPartVedtakIsSuspended &&
        annenPartsVedtakRequestStatus !== RequestStatus.FINISHED &&
        !annenPartsVedtakError
    ) {
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
                    annenPartsPerioder={annenPartsVedtakData?.perioder}
                ></DinPlan>
            </ContentSection>
        );
    }
    return <div></div>;
};

export default DinPlanPage;
