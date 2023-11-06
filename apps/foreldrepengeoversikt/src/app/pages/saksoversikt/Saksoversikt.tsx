import { Block, bemUtils, intlUtils } from '@navikt/fp-common';
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
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getAlleYtelser, getFamiliehendelseDato, getNavnAnnenForelder } from 'app/utils/sakerUtils';
import { AxiosError } from 'axios';

import { useIntl } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Skjemanummer } from '@navikt/fp-constants';

import './saksoversikt.css';
import { RequestStatus } from 'app/types/RequestStatus';
import SeHeleProsessen from 'app/components/se-hele-prosessen/SeHeleProsessen';
import { Alert } from '@navikt/ds-react';
import BekreftelseSendtSøknad from 'app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import { useGetIsRedirectedFromSøknad, useSetIsRedirectedFromSøknad } from 'app/hooks/useIsRedirectedFromSøknad';
import React from 'react';
import { RedirectSource } from 'app/types/RedirectSource';

const EMPTY_ARRAY = [] as Skjemanummer[];

interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
    oppdatertData: any;
    isFirstRender: React.MutableRefObject<boolean>;
}

const Saksoversikt: React.FunctionComponent<Props> = ({
    minidialogerData,
    minidialogerError,
    saker,
    søkerinfo,
    oppdatertData,
    isFirstRender,
}) => {
    const intl = useIntl();
    const bem = bemUtils('saksoversikt');
    const params = useParams();
    const navigate = useNavigate();

    useSetIsRedirectedFromSøknad(params.redirect, isFirstRender);
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.SAKSOVERSIKT);

    const alleSaker = getAlleYtelser(saker);
    console.log(alleSaker);
    console.log(params);
    const gjeldendeSak = alleSaker.find((sak) => sak.saksnummer === params.saksnummer)!;
    console.log(gjeldendeSak);
    useSetSelectedSak(gjeldendeSak);

    const redirectedFromSoknad = useGetIsRedirectedFromSøknad();

    const { tidslinjeHendelserData, tidslinjeHendelserError } = Api.useGetTidslinjeHendelser(params.saksnummer!);
    const { manglendeVedleggData, manglendeVedleggError } = Api.useGetManglendeVedlegg(params.saksnummer!);

    const planErVedtatt = gjeldendeSak?.åpenBehandling === undefined;
    let familiehendelsesdato = undefined;
    let annenPartFnr = undefined;
    let barnFnr = undefined;
    let annenPartVedtakIsSuspended = true;

    if (gjeldendeSak?.ytelse === Ytelse.FORELDREPENGER) {
        familiehendelsesdato = gjeldendeSak?.familiehendelse
            ? getFamiliehendelseDato(gjeldendeSak.familiehendelse)
            : undefined;
        annenPartFnr = gjeldendeSak?.annenPart?.fnr;

        const barnFraSak =
            gjeldendeSak?.barn && gjeldendeSak?.barn.length > 0
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
        annenPartVedtakIsSuspended,
    );

    if (params.redirect === RedirectSource.REDIRECT_FROM_SØKNAD) {
        navigate(`${OversiktRoutes.SAKSOVERSIKT}/${params.saksnummer}`);
    }

    if (!oppdatertData) {
        return (
            <div className={bem.block}>
                {redirectedFromSoknad && (
                    <BekreftelseSendtSøknad oppdatertData={oppdatertData} tidslinjehendelser={[]} />
                )}
                <Block padBottom="l">
                    <Alert variant="warning">
                        Det ser ut som det tar litt tid å opprette saken din akkurat i dag. Søknaden din er sendt, så du
                        kan vente litt og komme tilbake senere for å se alle detaljene i saken din.
                    </Alert>
                </Block>
                <Block padBottom="l">
                    <Link to={`${OversiktRoutes.HOVEDSIDE}`}>{intlUtils(intl, 'saksoversikt')}</Link>
                </Block>
            </div>
        );
    }

    if (!gjeldendeSak) {
        return <Alert variant="warning">{`Vi finner ingen sak med saksnummer: ${params.saksnummer}.`}</Alert>;
    }

    const navnPåSøker = søkerinfo.søker.fornavn;
    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, gjeldendeSak);
    const aktiveMinidialogerForSaken = minidialogerData
        ? minidialogerData.filter(({ saksnr }) => saksnr === gjeldendeSak.saksnummer)
        : undefined;

    return (
        <div className={bem.block}>
            {redirectedFromSoknad && (
                <BekreftelseSendtSøknad oppdatertData={oppdatertData} tidslinjehendelser={tidslinjeHendelserData} />
            )}
            {((aktiveMinidialogerForSaken && aktiveMinidialogerForSaken.length > 0) || minidialogerError) && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.oppgaver')} backgroundColor={'yellow'}>
                    <Oppgaver
                        minidialogerData={aktiveMinidialogerForSaken}
                        minidialogerError={minidialogerError}
                        saksnummer={gjeldendeSak.saksnummer}
                    />
                </ContentSection>
            )}
            <ContentSection
                heading={intlUtils(intl, 'saksoversikt.tidslinje')}
                showSkeleton={!tidslinjeHendelserData || !manglendeVedleggData}
                skeletonProps={{ height: '250px', variant: 'rounded' }}
                marginBottom="small"
            >
                <Tidslinje
                    saker={saker}
                    visHeleTidslinjen={false}
                    tidslinjeHendelserError={tidslinjeHendelserError}
                    tidslinjeHendelserData={tidslinjeHendelserData!}
                    manglendeVedleggData={manglendeVedleggData || EMPTY_ARRAY}
                    manglendeVedleggError={manglendeVedleggError}
                    søkersBarn={søkerinfo.søker.barn}
                />
            </ContentSection>
            <ContentSection padding="none">
                <SeHeleProsessen />
            </ContentSection>
            <ContentSection padding="none">
                <SeDokumenter />
            </ContentSection>
            {gjeldendeSak.ytelse === Ytelse.FORELDREPENGER && (
                <ContentSection
                    heading={intlUtils(intl, 'saksoversikt.dinPlan')}
                    showSkeleton={
                        !annenPartVedtakIsSuspended &&
                        annenPartsVedtakRequestStatus !== RequestStatus.FINISHED &&
                        !annenPartsVedtakError
                    }
                    skeletonProps={{ height: '210px', variant: 'rounded' }}
                >
                    <DinPlan
                        sak={gjeldendeSak}
                        visHelePlanen={false}
                        navnPåSøker={navnPåSøker}
                        navnAnnenForelder={navnAnnenForelder}
                        annenPartsPerioder={annenPartsVedtakData?.perioder}
                        termindato={gjeldendeSak.familiehendelse.termindato}
                    />
                </ContentSection>
            )}
        </div>
    );
};

export default Saksoversikt;
