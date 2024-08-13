import { BabyWrappedIcon, PersonPregnantIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Detail, HGrid, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import { hentSakerOptions, søkerInfoOptions } from 'app/api/api';
import { useGetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import {
    getFamiliehendelseDato,
    getSakTittel,
    grupperSakerPåBarn,
    mapSakerDTOToSaker,
    utledFamiliesituasjon,
} from 'app/utils/sakerUtils';

import Breadcrumb from '../breadcrumb/Breadcrumb';
import StatusTag from '../status-tag/StatusTag';
import './header.css';

export const getSaksoversiktHeading = (ytelse: Ytelse | undefined) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'Engangsstønadsak';
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return 'Svangerskapspengesak';
    }

    return 'Din sak';
};

function HeaderWrapper({ children }: { readonly children: ReactNode }) {
    const bem = bemUtils('header');
    const selectedRoute = useGetSelectedRoute();
    return (
        <div className={bem.block}>
            <Breadcrumb selectedRoute={selectedRoute} />
            <div className={bem.element('wrapper')}>{children}</div>
        </div>
    );
}

function BlueDot() {
    return <div style={{ height: '4px', width: '4px', borderRadius: '50%', background: 'var(--a-deepblue-300)' }} />;
}

function BabyIkon({ ytelse }: { readonly ytelse: Ytelse }) {
    const YtelseIkon = ytelse === Ytelse.SVANGERSKAPSPENGER ? PersonPregnantIcon : BabyWrappedIcon;
    return (
        <>
            <Show above="md">
                <div
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--a-deepblue-100)',
                        paddingTop: '8px',
                        paddingLeft: '8px',
                    }}
                >
                    <YtelseIkon fontSize={44} style={{ color: 'var(--a-lightblue-800)' }} />
                </div>
            </Show>
            <Show below="md">
                <div
                    style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'var(--a-deepblue-100)',
                        paddingTop: '8px',
                        paddingLeft: '8px',
                    }}
                >
                    <YtelseIkon fontSize={22} style={{ color: 'var(--a-lightblue-800)' }} />
                </div>
            </Show>
        </>
    );
}

export function ForsideHeader() {
    return (
        <HeaderWrapper>
            <HGrid columns="max-content 1fr" gap="6" align="center">
                <BabyIkon ytelse={Ytelse.FORELDREPENGER} />
                <Heading level="1" size="large">
                    Oversikt over foreldrepengesaker
                </Heading>
            </HGrid>
        </HeaderWrapper>
    );
}

function SaksnummerDetail() {
    const { saksnummer } = useParams();
    return <Detail>SAKSNR {saksnummer}</Detail>;
}

export function DokumenterHeader() {
    const heading = (
        <Heading level="1" size="large">
            Dokumenter
        </Heading>
    );

    return (
        <HeaderWrapper>
            <Show above="md">
                <VStack gap="3">
                    {heading}
                    <HStack gap="3" align="center">
                        <SaksnummerDetail />
                        <BlueDot />
                        <Detail textColor="subtle">Dokumenter som du, arbeidsgiver og NAV har sendt</Detail>
                    </HStack>
                </VStack>
            </Show>
            <Show below="md">
                <VStack gap="1">
                    {heading}
                    <SaksnummerDetail />
                </VStack>
            </Show>
        </HeaderWrapper>
    );
}

export function EttersendingHeader() {
    const header = (
        <Heading level="1" size="large">
            Last opp dokumenter
        </Heading>
    );
    return (
        <HeaderWrapper>
            <Show above="md">
                <VStack gap="3">
                    {header}
                    <SaksnummerDetail />
                </VStack>
            </Show>
            <Show below="md">
                <VStack gap="1">
                    {header}
                    <SaksnummerDetail />
                </VStack>
            </Show>
        </HeaderWrapper>
    );
}

function FamiliehendelseDescription({ sak }: { readonly sak: Sak }) {
    const intl = useIntl();

    const søkerinfo = useQuery(søkerInfoOptions()).data;
    const saker = useQuery({
        ...hentSakerOptions(),
        select: mapSakerDTOToSaker,
    }).data;

    if (!søkerinfo || !saker || !sak.familiehendelse) {
        return null;
    }

    const grupperteSaker = grupperSakerPåBarn(søkerinfo.søker.barn ?? [], saker);
    const sakIGrupperteSaker = sak
        ? grupperteSaker.find((gruppe) => gruppe.saker.map((s) => s.saksnummer).includes(sak.saksnummer))
        : undefined;
    const situasjon = utledFamiliesituasjon(sak.familiehendelse, sak.gjelderAdopsjon);
    const barnTittel = getSakTittel({
        barngruppering: sakIGrupperteSaker?.barn,
        familiehendelsedato: getFamiliehendelseDato(sak.familiehendelse),
        intl,
        antallBarn: sak.ytelse === Ytelse.FORELDREPENGER ? sak.familiehendelse.antallBarn : 0,
        situasjon,
    });

    return (
        <Detail textColor="subtle">
            {barnTittel.tittel} {barnTittel.undertittel}
        </Detail>
    );
}

export function DinSakHeader({ sak }: { readonly sak: Sak }) {
    const bem = bemUtils('header');

    return (
        <HeaderWrapper>
            <HGrid columns="max-content 1fr" gap="6" align="start">
                <BabyIkon ytelse={sak.ytelse} />
                <VStack>
                    <HStack gap="6" align="center">
                        <Heading level="1" size="large">
                            Din sak
                        </Heading>
                        <StatusTag sak={sak} className={bem.element('tag')} />
                    </HStack>
                    <Show above="md">
                        <HStack gap="3" align="center">
                            <Detail uppercase>{sak.ytelse}</Detail>
                            <BlueDot />
                            <SaksnummerDetail />

                            <BlueDot />
                            <FamiliehendelseDescription sak={sak} />
                        </HStack>
                    </Show>
                    <Show below="md">
                        <VStack gap="1">
                            <HStack gap="2" align="center">
                                <Detail uppercase>{sak.ytelse}</Detail>
                                <BlueDot />
                                <SaksnummerDetail />
                            </HStack>
                            <FamiliehendelseDescription sak={sak} />
                        </VStack>
                    </Show>
                </VStack>
            </HGrid>
        </HeaderWrapper>
    );
}
