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

function HeaderWrapper({ children }: { children: ReactNode }) {
    const bem = bemUtils('header');
    const selectedRoute = useGetSelectedRoute();
    // TODO: oppgaveid
    return (
        <div className={bem.block}>
            <Breadcrumb selectedRoute={selectedRoute} oppgaveId={undefined} />
            <div className={bem.element('wrapper')}>{children}</div>
        </div>
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

function BabyIkon({ ytelse }: { ytelse: Ytelse }) {
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

export function DokumenterHeader() {
    const { saksnummer } = useParams();

    const heading = (
        <Heading level="1" size="large">
            Dokumenter
        </Heading>
    );
    const saksnr = <Detail>SAKSNR {saksnummer}</Detail>;

    return (
        <HeaderWrapper>
            <Show above="md">
                <VStack gap="3">
                    {heading}
                    <HStack gap="3" align="center">
                        {saksnr}
                        <BlueDot />
                        <Detail textColor="subtle">Dokumenter som du, arbeidsgiver og NAV har sendt</Detail>
                    </HStack>
                </VStack>
            </Show>
            <Show below="md">
                <VStack gap="1">
                    {heading}
                    {saksnr}
                </VStack>
            </Show>
        </HeaderWrapper>
    );
}

export function EttersendingHeader() {
    const { saksnummer } = useParams();
    const saksnr = <Detail>SAKSNR {saksnummer}</Detail>;
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
                    {saksnr}
                </VStack>
            </Show>
            <Show below="md">
                <VStack gap="1">
                    {header}
                    {saksnr}
                </VStack>
            </Show>
        </HeaderWrapper>
    );
}

export function DinSakHeader({ sak }: { sak: Sak }) {
    const bem = bemUtils('header');
    const intl = useIntl();

    const søkerinfo = useQuery(søkerInfoOptions()).data;
    const saker = useQuery({
        ...hentSakerOptions(),
        select: mapSakerDTOToSaker,
    }).data;

    // TODO: utleding av info her er litt kronglete, kan det gjøres bedre? Også vise noe når vi ikke har familiehendelse?
    if (!søkerinfo || !saker || !sak.familiehendelse) {
        return null;
    }

    const grupperteSaker = grupperSakerPåBarn(søkerinfo.søker.barn, saker);
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
                            <Detail>SAKSNR {sak.saksnummer}</Detail>
                            <BlueDot />
                            <Detail textColor="subtle">
                                {barnTittel.tittel} {barnTittel.undertittel}
                            </Detail>
                        </HStack>
                    </Show>
                    <Show below="md">
                        <VStack gap="1">
                            <HStack gap="2" align="center">
                                <Detail uppercase>{sak.ytelse}</Detail>
                                <BlueDot />
                                <Detail>SAKSNR {sak.saksnummer}</Detail>
                            </HStack>
                            <Detail textColor="subtle">
                                {barnTittel.tittel} {barnTittel.undertittel}
                            </Detail>
                        </VStack>
                    </Show>
                </VStack>
            </HGrid>
        </HeaderWrapper>
    );
}

function BlueDot() {
    return <div style={{ height: '4px', width: '4px', borderRadius: '50%', background: 'var(--a-deepblue-300)' }} />;
}
