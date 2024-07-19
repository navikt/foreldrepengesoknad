import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Alert, VStack } from '@navikt/ds-react';

import { useDocumentTitle } from '@navikt/fp-utils';

import {
    erSakOppdatertOptions,
    hentDokumenterOptions,
    hentManglendeVedleggOptions,
    hentTidslinjehendelserOptions,
} from 'app/api/api';
import BekreftelseSendtSøknad from 'app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import ContentSection from 'app/components/content-section/ContentSection';
import EttersendDokumenter from 'app/components/ettersend-dokumenter/EttersendDokumenter';
import { DinSakHeader, getSaksoversiktHeading } from 'app/components/header/Header';
import SeDokumenter from 'app/components/se-dokumenter/SeDokumenter';
import SeHeleProsessen from 'app/components/se-hele-prosessen/SeHeleProsessen';
import { useAnnenPartsVedtak } from 'app/hooks/useAnnenPartsVedtak';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import {
    useGetRedirectedFromSøknadsnummer,
    useSetRedirectedFromSøknadsnummer,
} from 'app/hooks/useRedirectedFromSøknadsnummer';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import { PageRouteLayout } from 'app/routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { RedirectSource } from 'app/types/RedirectSource';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getNavnAnnenForelder } from 'app/utils/sakerUtils';
import { getRelevantNyTidslinjehendelse } from 'app/utils/tidslinjeUtils';

interface Props {
    søkerinfo: SøkerinfoDTO;
    isFirstRender: React.MutableRefObject<boolean>;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ søkerinfo, isFirstRender }) => {
    const intl = useIntl();
    const params = useParams<{ saksnummer: string; redirect?: string }>();
    const navigate = useNavigate();

    // Gjør denne dataen klar i cachen slik at bruker slipper loader senere.
    useQuery(hentDokumenterOptions(params.saksnummer!));

    useSetRedirectedFromSøknadsnummer(params.redirect, params.saksnummer, isFirstRender);
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.SAKSOVERSIKT);

    const gjeldendeSak = useGetSelectedSak();

    useDocumentTitle(
        `${getSaksoversiktHeading(gjeldendeSak?.ytelse)} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );

    const redirectedFromSøknadsnummer = useGetRedirectedFromSøknadsnummer();

    const tidslinjeHendelserQuery = useQuery(hentTidslinjehendelserOptions(params.saksnummer!));
    const manglendeVedleggQuery = useQuery(hentManglendeVedleggOptions(params.saksnummer!));
    const harIkkeOppdatertSakQuery = useQuery(erSakOppdatertOptions());
    const harIkkeOppdatertSak = harIkkeOppdatertSakQuery.isSuccess && !harIkkeOppdatertSakQuery.data;

    const annenPartsVedtakQuery = useAnnenPartsVedtak(gjeldendeSak);

    if (params.redirect === RedirectSource.REDIRECT_FROM_SØKNAD) {
        navigate(`${OversiktRoutes.SAKSOVERSIKT}/${params.saksnummer}`);
    }

    const relevantNyTidslinjehendelse = getRelevantNyTidslinjehendelse(tidslinjeHendelserQuery.data);
    const nettoppSendtInnSøknad =
        redirectedFromSøknadsnummer === params.saksnummer || relevantNyTidslinjehendelse !== undefined;
    const visBekreftelsePåSendtSøknad = nettoppSendtInnSøknad && gjeldendeSak?.åpenBehandling !== undefined;
    if (harIkkeOppdatertSak) {
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
        <PageRouteLayout header={<DinSakHeader sak={gjeldendeSak} />}>
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
                            sak={gjeldendeSak}
                            tidslinjeHendelserQuery={tidslinjeHendelserQuery}
                            manglendeVedleggQuery={manglendeVedleggQuery}
                            visHeleTidslinjen={false}
                            søkersBarn={søkerinfo.søker.barn ?? []}
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
                        showSkeleton={annenPartsVedtakQuery.isLoading} // Fordi annenPartsVedtakQuery kan være et disabled query må man bruke isLoading heller enn isPending: https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries/#isloading-previously-isinitialloading
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
        </PageRouteLayout>
    );
};

export default Saksoversikt;
