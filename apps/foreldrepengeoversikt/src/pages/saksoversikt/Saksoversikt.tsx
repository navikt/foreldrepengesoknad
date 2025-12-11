import { FilesIcon, FolderFileIcon, PencilIcon, WalletIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Alert, BodyShort, HGrid, HStack, Heading, VStack } from '@navikt/ds-react';

import { DEFAULT_SATSER, links } from '@navikt/fp-constants';
import { PersonMedArbeidsforholdDto_fpoversikt, Satser, TidslinjeHendelseDto_fpoversikt } from '@navikt/fp-types';
import { formatCurrencyWithKr, useDocumentTitle } from '@navikt/fp-utils';

import {
    hentDokumenterOptions,
    hentManglendeVedleggOptions,
    hentTidslinjehendelserOptions,
} from '../../api/queries.ts';
import { BekreftelseSendtSøknad } from '../../components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import { ContentSection } from '../../components/content-section/ContentSection';
import { DinSakHeader, getSaksoversiktHeading } from '../../components/header/Header';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { Svangerskapspenger } from '../../components/svangerskapspenger/Svangerskapspenger';
import { useAnnenPartsVedtak } from '../../hooks/useAnnenPartsVedtak';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';
import { DinPlan } from '../../sections/din-plan/DinPlan.tsx';
import { Oppgaver } from '../../sections/oppgaver/Oppgaver';
import { Tidslinje } from '../../sections/tidslinje/Tidslinje.tsx';
import { getNavnPåForeldre } from '../../utils/personUtils';
import { getNavnAnnenForelder } from '../../utils/sakerUtils';
import { getRelevantNyTidslinjehendelse } from '../../utils/tidslinjeUtils.ts';
import { InntektsmeldingLenkePanel } from '../inntektsmelding-page/InntektsmeldingLenkePanel';

dayjs.extend(isSameOrBefore);

interface Props {
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt;
}

const finnSøknadstidspunkt = (tidslinjehendelser: TidslinjeHendelseDto_fpoversikt[]) => {
    const nySøknadHendelse = [...tidslinjehendelser]
        .sort((t1, t2) => (dayjs(t1.opprettet).isBefore(t2.opprettet, 'day') ? 1 : -1))
        .find((th) => th.tidslinjeHendelseType === 'FØRSTEGANGSSØKNAD_NY');
    return nySøknadHendelse
        ? nySøknadHendelse.opprettet
        : tidslinjehendelser.find((th) => th.tidslinjeHendelseType === 'FØRSTEGANGSSØKNAD')?.opprettet;
};

const finnEngangstønadForSøknadstidspunkt = (satser: Satser, søknadstidspunkt: string | undefined) => {
    const { engangstønad } = satser;
    if (!søknadstidspunkt) {
        return engangstønad[0]!.verdi;
    }

    return engangstønad.find((es) => dayjs(es.fom).isSameOrBefore(søknadstidspunkt))?.verdi;
};

export const Saksoversikt = ({ søkerinfo }: Props) => {
    const gjeldendeSak = useGetSelectedSak();

    return (
        <PageRouteLayout header={<DinSakHeader sak={gjeldendeSak} />}>
            <SaksoversiktInner søkerinfo={søkerinfo} />
        </PageRouteLayout>
    );
};

const SaksoversiktInner = ({ søkerinfo }: Props) => {
    const intl = useIntl();
    const params = useParams<{ saksnummer: string }>();

    // Gjør denne dataen klar i cachen slik at bruker slipper loader senere.
    useQuery(hentDokumenterOptions(params.saksnummer!));

    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.SAKSOVERSIKT);

    const gjeldendeSak = useGetSelectedSak();

    useDocumentTitle(
        `${getSaksoversiktHeading(gjeldendeSak?.ytelse, intl)} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );

    const tidslinjeHendelserQuery = useQuery(hentTidslinjehendelserOptions(params.saksnummer!));
    const manglendeVedleggQuery = useQuery(hentManglendeVedleggOptions(params.saksnummer!));

    const søknadstidspunkt = finnSøknadstidspunkt(tidslinjeHendelserQuery.data ?? []);

    const ENGANGSTØNAD = finnEngangstønadForSøknadstidspunkt(DEFAULT_SATSER, søknadstidspunkt);

    const annenPartsVedtakQuery = useAnnenPartsVedtak(gjeldendeSak);

    const relevantNyTidslinjehendelse = getRelevantNyTidslinjehendelse(tidslinjeHendelserQuery.data ?? []);

    const visBekreftelsePåSendtSøknad =
        relevantNyTidslinjehendelse !== undefined && gjeldendeSak?.åpenBehandling !== undefined;

    const harMinstEttArbeidsforhold = !!søkerinfo.arbeidsforhold && søkerinfo.arbeidsforhold.length > 0;

    if (!gjeldendeSak) {
        return (
            <Alert variant="warning">
                <FormattedMessage id="saksoversikt.finner.ikkeNoen" values={{ saksnummer: params.saksnummer }} />
            </Alert>
        );
    }

    return (
        <VStack gap="space-16">
            {visBekreftelsePåSendtSøknad && (
                <BekreftelseSendtSøknad
                    relevantNyTidslinjehendelse={relevantNyTidslinjehendelse}
                    bankkonto={søkerinfo.person.bankkonto}
                    ytelse={gjeldendeSak.ytelse}
                    harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                    manglendeVedlegg={manglendeVedleggQuery.data ?? []}
                    saksnummer={params.saksnummer}
                />
            )}

            <Oppgaver saksnummer={gjeldendeSak.saksnummer} />
            <VStack gap="space-4">
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
                        søkersBarn={søkerinfo.person.barn ?? []}
                    />
                </ContentSection>
                <HGrid gap="space-16" columns={{ sm: 1, md: 2 }} className="mb-12">
                    <LenkePanel
                        tittel={intl.formatMessage({ id: 'saksoversikt.dokumenter' })}
                        to={OversiktRoutes.DOKUMENTER}
                        Ikon={FolderFileIcon}
                    />
                    <LenkePanel
                        tittel={intl.formatMessage({ id: 'saksoversikt.ettersendDokumenter' })}
                        to={OversiktRoutes.ETTERSEND}
                        Ikon={FilesIcon}
                    />
                    {gjeldendeSak.ytelse === 'FORELDREPENGER' && (
                        <LenkePanel
                            tittel={intl.formatMessage({ id: 'saksoversikt.endrePlanenDin' })}
                            to="https://nav.no/foreldrepenger/soknad"
                            Ikon={PencilIcon}
                        />
                    )}
                    <InntektsmeldingLenkePanel />
                </HGrid>

                {gjeldendeSak.ytelse === 'FORELDREPENGER' && (
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
                                annenPartsPerioder={annenPartsVedtakQuery.data?.perioder ?? []}
                                navnPåForeldre={getNavnPåForeldre(
                                    gjeldendeSak,
                                    søkerinfo.person.navn.fornavn,
                                    getNavnAnnenForelder(søkerinfo, gjeldendeSak, intl),
                                )}
                            />
                        </ContentSection>
                    </div>
                )}
                {gjeldendeSak.ytelse === 'SVANGERSKAPSPENGER' && <Svangerskapspenger svpSak={gjeldendeSak} />}
                {gjeldendeSak.ytelse === 'ENGANGSSTØNAD' && !gjeldendeSak.sakAvsluttet && (
                    <VStack gap="space-8">
                        <ContentSection
                            heading={intl.formatMessage({ id: 'saksoversikt.dinPlan.søktOm' })}
                            showSkeleton={ENGANGSTØNAD === undefined}
                            skeletonProps={{ height: '90px', variant: 'rounded' }}
                        >
                            <HStack gap="space-32" align="center">
                                <WalletIcon
                                    className="text-ax-text-info-decoration bg-ax-success-200 rounded-full p-1"
                                    width={40}
                                    height={40}
                                    aria-hidden
                                />

                                <VStack gap="space-8">
                                    {ENGANGSTØNAD && (
                                        <Heading size="small">
                                            <FormattedMessage
                                                id="saksoversikt.engangsstonad"
                                                values={{ sum: formatCurrencyWithKr(ENGANGSTØNAD) }}
                                            />
                                        </Heading>
                                    )}
                                    {søkerinfo.person.bankkonto?.kontonummer && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="saksoversikt.utbetales"
                                                values={{ kontonr: søkerinfo.person.bankkonto.kontonummer }}
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
