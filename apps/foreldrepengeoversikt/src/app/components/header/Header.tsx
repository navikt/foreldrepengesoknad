import { BabyWrappedIcon, PersonPregnantIcon, StrollerIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Detail, HGrid, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { hentSakerOptions, søkerInfoOptions } from 'app/api/api';
import { useGetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { LayoutWrapper } from 'app/sections/LayoutWrapper';
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

export const getSaksoversiktHeading = (ytelse: Ytelse | undefined) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'Engangsstønadsak';
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return 'Svangerskapspengesak';
    }

    return 'Din sak';
};

function HeaderWrapper({ children }: { children: ReactNode }) {
    const selectedRoute = useGetSelectedRoute();
    return (
        <div className={`bg-bg-default border-b-2 border-deepblue-200 pt-4 mb-8`}>
            <Breadcrumb selectedRoute={selectedRoute} />
            <LayoutWrapper className="pt-6 pb-6 pl-4 pr-4">{children}</LayoutWrapper>
        </div>
    );
}

function SimpleHeaderWrapper({ children }: { children: ReactNode }) {
    const selectedRoute = useGetSelectedRoute();
    return (
        <div className={`bg-bg-default pt-4`}>
            <Breadcrumb selectedRoute={selectedRoute} />
            <LayoutWrapper className="pt-6 pb-6 pl-4 pr-4">{children}</LayoutWrapper>
        </div>
    );
}

function BlueDot() {
    return <div style={{ height: '4px', width: '4px', borderRadius: '50%', background: 'var(--a-deepblue-300)' }} />;
}

function BabyIkon({ ytelse }: { ytelse: Ytelse | undefined }) {
    const YtelseIkon = (() => {
        switch (ytelse) {
            case Ytelse.FORELDREPENGER:
            case Ytelse.ENGANGSSTØNAD:
                return BabyWrappedIcon;
            case Ytelse.SVANGERSKAPSPENGER:
                return PersonPregnantIcon;
            default:
                return StrollerIcon;
        }
    })();

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
            <HGrid columns="max-content 1fr" gap="6" align="start">
                <BabyIkon ytelse={undefined} />
                <VStack>
                    <Heading level="1" size="medium">
                        Oversikt
                    </Heading>
                    <Detail textColor="subtle">
                        Dine saker om foreldrepenger, engangsstønad og svangerskapspenger
                    </Detail>
                </VStack>
            </HGrid>
        </HeaderWrapper>
    );
}

function SaksnummerDetail() {
    const { saksnummer } = useParams();
    return <Detail>SAKSNR {saksnummer}</Detail>;
}

export function DokumenterHeader() {
    const { saksnummer } = useParams();
    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                Dokumenter
            </Heading>
            <Detail textColor="subtle">
                Dokumenter fra du, arbeidsgiver og NAV som tilhører saken din ({saksnummer})
            </Detail>
        </SimpleHeaderWrapper>
    );
}

export function EttersendingHeader() {
    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                Last opp dokumenter
            </Heading>
        </SimpleHeaderWrapper>
    );
}

function FamiliehendelseDescription({ sak }: { sak: Sak }) {
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

export function DinSakHeader({ sak }: { sak?: Sak }) {
    if (!sak) {
        return null;
    }

    return (
        <HeaderWrapper>
            <HGrid columns="max-content 1fr" gap="6" align="start">
                <BabyIkon ytelse={sak.ytelse} />
                <VStack>
                    <HStack gap="6" align="center">
                        <Heading level="1" size="medium">
                            Din sak
                        </Heading>
                        <StatusTag sak={sak} />
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
