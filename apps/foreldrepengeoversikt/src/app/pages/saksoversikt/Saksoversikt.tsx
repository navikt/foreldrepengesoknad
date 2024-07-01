import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Alert, VStack } from '@navikt/ds-react';

import { useDocumentTitle } from '@navikt/fp-utils';

import { hentAnnenPartsVedtakOptions, hentManglendeVedleggOptions, hentTidslinjehendelserOptions } from 'app/api/api';
import BekreftelseSendtSøknad from 'app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import ContentSection from 'app/components/content-section/ContentSection';
import EttersendDokumenter from 'app/components/ettersend-dokumenter/EttersendDokumenter';
import { getSaksoversiktHeading } from 'app/components/header/Header';
import SeDokumenter from 'app/components/se-dokumenter/SeDokumenter';
import SeHeleProsessen from 'app/components/se-hele-prosessen/SeHeleProsessen';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import {
    useGetRedirectedFromSøknadsnummer,
    useSetRedirectedFromSøknadsnummer,
} from 'app/hooks/useRedirectedFromSøknadsnummer';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useSetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { RedirectSource } from 'app/types/RedirectSource';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getAlleYtelser, getFamiliehendelseDato, getNavnAnnenForelder } from 'app/utils/sakerUtils';
import { getRelevantNyTidslinjehendelse } from 'app/utils/tidslinjeUtils';

interface Props {
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
    oppdatertData: any;
    isFirstRender: React.MutableRefObject<boolean>;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ saker, søkerinfo, oppdatertData, isFirstRender }) => {
    const intl = useIntl();
    const params = useParams();
    const navigate = useNavigate();

    useSetRedirectedFromSøknadsnummer(params.redirect, params.saksnummer, isFirstRender);
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.SAKSOVERSIKT);

    const alleSaker = getAlleYtelser(saker);
    const gjeldendeSak = alleSaker.find((sak) => sak.saksnummer === params.saksnummer)!;
    useSetSelectedSak(gjeldendeSak);

    useDocumentTitle(
        `${getSaksoversiktHeading(gjeldendeSak?.ytelse)} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );

    const redirectedFromSøknadsnummer = useGetRedirectedFromSøknadsnummer();

    const tidslinjeHendelserQuery = useQuery(hentTidslinjehendelserOptions(params.saksnummer!));
    const manglendeVedleggQuery = useQuery(hentManglendeVedleggOptions(params.saksnummer!));

    const planErVedtatt = gjeldendeSak?.åpenBehandling === undefined;
    let familiehendelse = undefined;
    let annenPartFødselsnummer = undefined;
    let barnFødselsnummer = undefined;
    let annenPartVedtakIsSuspended = true;

    if (gjeldendeSak?.ytelse === Ytelse.FORELDREPENGER) {
        familiehendelse = gjeldendeSak?.familiehendelse
            ? getFamiliehendelseDato(gjeldendeSak.familiehendelse)
            : undefined;
        annenPartFødselsnummer = gjeldendeSak?.annenPart?.fnr;

        const barnFraSak =
            gjeldendeSak?.barn && gjeldendeSak?.barn.length > 0
                ? gjeldendeSak.barn.find((barn) => barn.fnr !== undefined)
                : undefined;
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

    if (params.redirect === RedirectSource.REDIRECT_FROM_SØKNAD) {
        navigate(`${OversiktRoutes.SAKSOVERSIKT}/${params.saksnummer}`);
    }

    const relevantNyTidslinjehendelse = getRelevantNyTidslinjehendelse(tidslinjeHendelserQuery.data);
    const nettoppSendtInnSøknad =
        redirectedFromSøknadsnummer === params.saksnummer || relevantNyTidslinjehendelse !== undefined;
    const visBekreftelsePåSendtSøknad = nettoppSendtInnSøknad && gjeldendeSak?.åpenBehandling !== undefined;
    if (!oppdatertData) {
        return (
            <VStack gap="2">
                {nettoppSendtInnSøknad && (
                    <BekreftelseSendtSøknad
                        relevantNyTidslinjehendelse={relevantNyTidslinjehendelse}
                        bankkonto={søkerinfo.søker.bankkonto}
                        ytelse={undefined}
                    />
                )}
                <Alert variant="warning">
                    Det ser ut som det tar litt tid å opprette saken din akkurat i dag. Søknaden din er sendt, så du kan
                    vente litt og komme tilbake senere for å se alle detaljene i saken din.
                </Alert>
                <Link to={`${OversiktRoutes.HOVEDSIDE}`}>{intl.formatMessage({ id: 'saksoversikt' })}</Link>
            </VStack>
        );
    }

    if (!gjeldendeSak) {
        return <Alert variant="warning">{`Vi finner ingen sak med saksnummer: ${params.saksnummer}.`}</Alert>;
    }

    const navnPåSøker = søkerinfo.søker.fornavn;
    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, gjeldendeSak);

    return (
        <VStack gap="4">
            {visBekreftelsePåSendtSøknad && (
                <BekreftelseSendtSøknad
                    relevantNyTidslinjehendelse={relevantNyTidslinjehendelse}
                    bankkonto={søkerinfo.søker.bankkonto}
                    ytelse={gjeldendeSak.ytelse}
                />
            )}

            <Oppgaver saksnummer={gjeldendeSak.saksnummer} />
            <VStack gap="1">
                <ContentSection
                    heading={intl.formatMessage({ id: 'saksoversikt.tidslinje' })}
                    showSkeleton={tidslinjeHendelserQuery.isPending || manglendeVedleggQuery.isPending}
                    skeletonProps={{ height: '250px', variant: 'rounded' }}
                    marginBottom="small"
                >
                    <Tidslinje
                        saker={saker}
                        tidslinjeHendelserQuery={tidslinjeHendelserQuery}
                        manglendeVedleggQuery={manglendeVedleggQuery}
                        visHeleTidslinjen={false}
                        søkersBarn={søkerinfo.søker.barn}
                    />
                </ContentSection>
                <ContentSection padding="none" marginBottom="large">
                    <SeHeleProsessen />
                </ContentSection>
            </VStack>
            <ContentSection padding="none" marginBottom="medium">
                <SeDokumenter />
            </ContentSection>
            <ContentSection padding="none" marginBottom="large">
                <EttersendDokumenter />
            </ContentSection>
            {gjeldendeSak.ytelse === Ytelse.FORELDREPENGER && (
                <ContentSection
                    heading={intl.formatMessage({ id: 'saksoversikt.dinPlan' })}
                    // showSkeleton={
                    //     !annenPartVedtakIsSuspended &&
                    //     annenPartsVedtakRequestStatus !== RequestStatus.FINISHED &&
                    //     !annenPartsVedtakError
                    // }
                    showSkeleton={annenPartsVedtakQuery.isPending}
                    skeletonProps={{ height: '210px', variant: 'rounded' }}
                >
                    <DinPlan
                        sak={gjeldendeSak}
                        visHelePlanen={false}
                        navnPåSøker={navnPåSøker}
                        navnAnnenForelder={navnAnnenForelder}
                        annenPartsPerioder={annenPartsVedtakQuery.data?.perioder}
                        termindato={gjeldendeSak.familiehendelse.termindato}
                    />
                </ContentSection>
            )}
        </VStack>
    );
};

export default Saksoversikt;
