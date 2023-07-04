import { Loader } from '@navikt/ds-react';

import { bemUtils, intlUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import ContentSection from 'app/components/content-section/ContentSection';
import SeDokumenter from 'app/components/se-dokumenter/SeDokumenter';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useSetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { HendelseType } from 'app/types/HendelseType';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getAlleYtelser, getFamiliehendelseDato, getNavnAnnenForelder } from 'app/utils/sakerUtils';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import './saksoversikt.css';
import { RequestStatus } from 'app/types/RequestStatus';
import SeHeleProsessen from 'app/components/se-hele-prosessen/SeHeleProsessen';
import TestTimeline from 'app/components/test-timeline/testTimeline';
import { SammendragSoknad } from 'app/sections/sammendragSoknad/SammendragSoknad';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';

interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ minidialogerData, minidialogerError, saker, søkerinfo }) => {
    const intl = useIntl();
    const bem = bemUtils('saksoversikt');
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.SAKSOVERSIKT);
    const navnPåSøker = søkerinfo.søker.fornavn;
    const params = useParams();
    const alleSaker = getAlleYtelser(saker);

    const gjeldendeSak = alleSaker.find((sak) => sak.saksnummer === params.saksnummer)!;
    useSetSelectedSak(gjeldendeSak);

    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, gjeldendeSak);

    const aktiveMinidialogerForSaken = minidialogerData
        ? minidialogerData.filter(
              ({ gyldigTil, aktiv, hendelse, saksnr }) =>
                  aktiv &&
                  saksnr === gjeldendeSak.saksnummer &&
                  dayjs(gyldigTil).isSameOrAfter(new Date(), 'days') &&
                  hendelse !== HendelseType.TILBAKEKREVING_FATTET_VEDTAK
          )
        : undefined;
    const planErVedtatt = gjeldendeSak.åpenBehandling === undefined;
    let familiehendelsesdato = undefined;
    let annenPartFnr = undefined;
    let barnFnr = undefined;
    let annenPartVedtakIsSuspended = true;

    if (gjeldendeSak.ytelse === Ytelse.FORELDREPENGER) {
        familiehendelsesdato = getFamiliehendelseDato(gjeldendeSak.familiehendelse);
        annenPartFnr = gjeldendeSak.annenPart?.fnr;

        const barnFraSak =
            gjeldendeSak.barn && gjeldendeSak.barn.length > 0
                ? gjeldendeSak.barn.find((barn) => barn.fnr !== undefined)
                : undefined;
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
    return (
        <div className={bem.block}>
            {((aktiveMinidialogerForSaken && aktiveMinidialogerForSaken.length > 0) || minidialogerError) && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.oppgaver')} backgroundColor={'yellow'}>
                    <Oppgaver
                        minidialogerData={aktiveMinidialogerForSaken}
                        minidialogerError={minidialogerError}
                        saksnummer={gjeldendeSak.saksnummer}
                    />
                </ContentSection>
            )}

            {gjeldendeSak.ytelse === Ytelse.SVANGERSKAPSPENGER ? (
                <SammendragSoknad sak={gjeldendeSak as SvangerskapspengeSak} søker={søkerinfo} />
            ) : (
                <>
                    <ContentSection cornerStyle="square" heading={intlUtils(intl, 'saksoversikt.tidslinje')}>
                        <Tidslinje saker={saker} visHeleTidslinjen={false} søkersBarn={søkerinfo.søker.barn} />
                    </ContentSection>
                    <ContentSection padding="none">
                        <SeHeleProsessen />
                    </ContentSection>

                    <ContentSection padding="none">
                        <TestTimeline />
                    </ContentSection>
                    <ContentSection padding="none">
                        <SeDokumenter />
                    </ContentSection>
                </>
            )}

            {gjeldendeSak.ytelse === Ytelse.FORELDREPENGER && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.dinPlan')}>
                    <DinPlan
                        sak={gjeldendeSak}
                        visHelePlanen={false}
                        navnPåSøker={navnPåSøker}
                        navnAnnenForelder={navnAnnenForelder}
                        annenPartsPerioder={annenPartsVedtakData?.perioder}
                    />
                </ContentSection>
            )}
        </div>
    );
};

export default Saksoversikt;
