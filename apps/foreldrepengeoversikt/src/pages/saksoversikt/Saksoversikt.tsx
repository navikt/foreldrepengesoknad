import { FilesIcon, FolderFileIcon, PencilIcon, WalletIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { Alert, BodyShort, HGrid, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { formatCurrency, useDocumentTitle } from '@navikt/fp-utils';

import { Tidslinjehendelse } from '../../types/Tidslinjehendelse';
import { TidslinjehendelseType } from '../../types/TidslinjehendelseType';
import { getNavnPåForeldre } from '../../utils/personUtils';
import { getNavnAnnenForelder } from '../../utils/sakerUtils';
import { InntektsmeldingLenkePanel } from '../inntektsmelding-page/InntektsmeldingLenkePanel';
import {
    erSakOppdatertOptions,
    hentDokumenterOptions,
    hentManglendeVedleggOptions,
    hentSatserOptions,
    hentTidslinjehendelserOptions,
} from './../../api/api';
import BekreftelseSendtSøknad from './../../components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import ContentSection from './../../components/content-section/ContentSection';
import { DinSakHeader, getSaksoversiktHeading } from './../../components/header/Header';
import { LenkePanel } from './../../components/lenke-panel/LenkePanel';
import { useAnnenPartsVedtak } from './../../hooks/useAnnenPartsVedtak';
import { useSetBackgroundColor } from './../../hooks/useBackgroundColor';
import {
    useGetRedirectedFromSøknadsnummer,
    useSetRedirectedFromSøknadsnummer,
} from './../../hooks/useRedirectedFromSøknadsnummer';
import { useSetSelectedRoute } from './../../hooks/useSelectedRoute';
import { useGetSelectedSak } from './../../hooks/useSelectedSak';
import { PageRouteLayout } from './../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from './../../routes/routes';
import { DinPlan } from './../../sections/din-plan/DinPlan';
import Oppgaver from './../../sections/oppgaver/Oppgaver';
import { Tidslinje } from './../../sections/tidslinje/Tidslinje';
import { RedirectSource } from './../../types/RedirectSource';
import { SøkerinfoDTO } from './../../types/SøkerinfoDTO';
import { Ytelse } from './../../types/Ytelse';
import { getRelevantNyTidslinjehendelse } from './../../utils/tidslinjeUtils';

dayjs.extend(isSameOrBefore);

interface Props {
    søkerinfo: SøkerinfoDTO;
    isFirstRender: React.MutableRefObject<boolean>;
}

const finnSøknadstidspunkt = (tidslinjehendelser: Tidslinjehendelse[] | undefined) => {
    if (!tidslinjehendelser) {
        return undefined;
    }
    const nySøknadHendelse = [...tidslinjehendelser]
        .sort((t1, t2) => (dayjs(t1.opprettet).isBefore(t2.opprettet, 'day') ? 1 : -1))
        .find((th) => th.tidslinjeHendelseType === TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY);
    return nySøknadHendelse
        ? nySøknadHendelse.opprettet
        : tidslinjehendelser.find((th) => th.tidslinjeHendelseType === TidslinjehendelseType.FØRSTEGANGSSØKNAD)
              ?.opprettet;
};

const finnEngangstønadForSøknadstidspunkt = (satser: Satser, søknadstidspunkt: string | undefined) => {
    const { engangstønad } = satser;
    if (!søknadstidspunkt) {
        return engangstønad[0].verdi;
    }
    return engangstønad.filter((es) => dayjs(es.fom).isSameOrBefore(søknadstidspunkt))[0].verdi;
};

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

    const søknadstidspunkt = finnSøknadstidspunkt(tidslinjeHendelserQuery.data);
    const ENGANGSTØNAD = useQuery({
        ...hentSatserOptions(),
        select: (satser) => finnEngangstønadForSøknadstidspunkt(satser, søknadstidspunkt),
    }).data;

    const annenPartsVedtakQuery = useAnnenPartsVedtak(gjeldendeSak);

    if (params.redirect === RedirectSource.REDIRECT_FROM_SØKNAD) {
        navigate(`${OversiktRoutes.SAKSOVERSIKT}/${params.saksnummer}`);
    }

    const relevantNyTidslinjehendelse = getRelevantNyTidslinjehendelse(tidslinjeHendelserQuery.data);
    const nettoppSendtInnSøknad =
        redirectedFromSøknadsnummer === params.saksnummer || relevantNyTidslinjehendelse !== undefined;
    const visBekreftelsePåSendtSøknad = nettoppSendtInnSøknad && gjeldendeSak?.åpenBehandling !== undefined;

    const harMinstEttArbeidsforhold = !!søkerinfo.arbeidsforhold && søkerinfo.arbeidsforhold.length > 0;

    if (harIkkeOppdatertSak) {
        return (
            <VStack gap="2">
                {nettoppSendtInnSøknad && (
                    <BekreftelseSendtSøknad
                        relevantNyTidslinjehendelse={relevantNyTidslinjehendelse}
                        bankkonto={søkerinfo.søker.bankkonto}
                        ytelse={undefined}
                        harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                        manglendeVedlegg={manglendeVedleggQuery.data}
                        saksnummer={params.saksnummer}
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
                    harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                    manglendeVedlegg={manglendeVedleggQuery.data}
                    saksnummer={params.saksnummer}
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
                        tidslinjeHendelser={tidslinjeHendelserQuery.data ?? []}
                        manglendeVedlegg={manglendeVedleggQuery.data ?? []}
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
                    <LenkePanel tittel="Endre planen din" to="https://nav.no/foreldrepenger/soknad" Ikon={PencilIcon} />
                    <InntektsmeldingLenkePanel />
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
                {gjeldendeSak.ytelse === Ytelse.ENGANGSSTØNAD && !gjeldendeSak.sakAvsluttet && (
                    <VStack gap="2">
                        <ContentSection
                            heading={intl.formatMessage({ id: 'saksoversikt.dinPlan.søktOm' })}
                            showSkeleton={ENGANGSTØNAD === undefined}
                            skeletonProps={{ height: '90px', variant: 'rounded' }}
                        >
                            <HStack gap="8" align="center">
                                <WalletIcon
                                    className="p-1 rounded-full text-icon-info bg-green-100"
                                    width={40}
                                    height={40}
                                    aria-hidden
                                />

                                <VStack gap="2">
                                    {ENGANGSTØNAD && (
                                        <Heading size="small">
                                            <FormattedMessage
                                                id="saksoversikt.engangsstonad"
                                                values={{ sum: formatCurrency(ENGANGSTØNAD) }}
                                            />
                                        </Heading>
                                    )}
                                    {søkerinfo.søker.bankkonto?.kontonummer && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="saksoversikt.utbetales"
                                                values={{ kontonr: søkerinfo.søker.bankkonto.kontonummer }}
                                            />
                                        </BodyShort>
                                    )}
                                </VStack>
                            </HStack>
                        </ContentSection>
                        <LenkePanel
                            tittel={intl.formatMessage({ id: 'saksoversikt.endre.kontonr' })}
                            to={links.brukerprofil}
                        />
                    </VStack>
                )}
            </VStack>
        </VStack>
    );
};

export default Saksoversikt;
