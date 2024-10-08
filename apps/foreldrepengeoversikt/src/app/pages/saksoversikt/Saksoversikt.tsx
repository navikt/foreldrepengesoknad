import { FilesIcon, FolderFileIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { Alert, HGrid, Link, VStack } from '@navikt/ds-react';

import { useDocumentTitle } from '@navikt/fp-utils';

import {
    erSakOppdatertOptions,
    hentDokumenterOptions,
    hentManglendeVedleggOptions,
    hentTidslinjehendelserOptions,
} from 'app/api/api';
import BekreftelseSendtSøknad from 'app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import ContentSection from 'app/components/content-section/ContentSection';
import { DinSakHeader, getSaksoversiktHeading } from 'app/components/header/Header';
import { LenkePanel } from 'app/components/lenke-panel/LenkePanel';
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
import { getRelevantNyTidslinjehendelse } from 'app/utils/tidslinjeUtils';

import { getNavnPåForeldre } from '../../utils/personUtils';
import { getNavnAnnenForelder } from '../../utils/sakerUtils';

interface Props {
    søkerinfo: SøkerinfoDTO;
    isFirstRender: React.MutableRefObject<boolean>;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ søkerinfo, isFirstRender }) => {
    const gjeldendeSak = useGetSelectedSak();

    return (
        <PageRouteLayout header={<DinSakHeader sak={gjeldendeSak} />}>
            <SaksoversiktInner søkerinfo={søkerinfo} isFirstRender={isFirstRender} />
        </PageRouteLayout>
    );
};

const SaksoversiktInner: React.FunctionComponent<Props> = ({ søkerinfo, isFirstRender }) => {
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
                <Link as={RouterLink} to={`${OversiktRoutes.HOVEDSIDE}`}>
                    {intl.formatMessage({ id: 'saksoversikt' })}
                </Link>
            </VStack>
        );
    }

    if (!gjeldendeSak) {
        return <Alert variant="warning">{`Vi finner ingen sak med saksnummer: ${params.saksnummer}.`}</Alert>;
    }

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
                    className="mb-2"
                >
                    <Tidslinje
                        sak={gjeldendeSak}
                        tidslinjeHendelserQuery={tidslinjeHendelserQuery}
                        manglendeVedleggQuery={manglendeVedleggQuery}
                        visHeleTidslinjen={false}
                        søkersBarn={søkerinfo.søker.barn ?? []}
                    />
                </ContentSection>
                <section className="mb-12">
                    <LenkePanel tittel="Se hele prosessen" to={OversiktRoutes.TIDSLINJEN} />
                </section>
                <HGrid gap="4" columns={{ sm: 1, md: 2 }} className="mb-12">
                    <LenkePanel tittel="Dokumenter" to={OversiktRoutes.DOKUMENTER} Ikon={FolderFileIcon} />
                    <LenkePanel tittel="Ettersend dokumenter" to={OversiktRoutes.ETTERSEND} Ikon={FilesIcon} />
                </HGrid>

                {gjeldendeSak.ytelse === Ytelse.FORELDREPENGER && (
                    <div>
                        <ContentSection
                            heading={
                                gjeldendeSak.gjeldendeVedtak?.perioder
                                    ? intl.formatMessage({ id: 'saksoversikt.dinPlan.vedtatt' })
                                    : intl.formatMessage({ id: 'saksoversikt.dinPlan.søktOm' })
                            }
                            // Fordi annenPartsVedtakQuery kan være et disabled query må man bruke isLoading heller enn isPending:
                            // https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries/#isloading-previously-isinitialloading
                            showSkeleton={annenPartsVedtakQuery.isLoading}
                            skeletonProps={{ height: '210px', variant: 'rounded' }}
                        >
                            <DinPlan
                                annenPartsPerioder={annenPartsVedtakQuery.data?.perioder}
                                navnPåForeldre={getNavnPåForeldre(
                                    gjeldendeSak,
                                    søkerinfo.søker.fornavn,
                                    getNavnAnnenForelder(søkerinfo, gjeldendeSak),
                                )}
                            />
                        </ContentSection>
                    </div>
                )}
            </VStack>
        </VStack>
    );
};

export default Saksoversikt;
