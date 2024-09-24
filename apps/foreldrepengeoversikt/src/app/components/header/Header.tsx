import { BabyWrappedIcon, PersonPregnantIcon, StrollerIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Detail, HGrid, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { hentSakerOptions, søkerInfoOptions } from 'app/api/api';
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
    return (
        <div className={`bg-bg-default border-b-2 border-deepblue-200 mb-8`}>
            <LayoutWrapper className="pt-1 pb-6 pl-4 pr-4">{children}</LayoutWrapper>
        </div>
    );
}

function SimpleHeaderWrapper({ children }: { children: ReactNode }) {
    return (
        <div className={`bg-bg-default`}>
            <LayoutWrapper className="pt-1 pb-6 pl-4 pr-4">{children}</LayoutWrapper>
        </div>
    );
}

function BlueDot() {
    return <div className="h-[4px] w-[4px] rounded-[50%] bg-deepblue-300" />;
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
                <div className="w-[60px] h-[60px] rounded-full bg-deepblue-100 pt-2 pl-2">
                    <YtelseIkon fontSize={44} className="text-lightblue-800" />
                </div>
            </Show>
            <Show below="md">
                <div className="w-[38px] h-[38px] rounded-full bg-deepblue-100 pt-2 pl-2">
                    <YtelseIkon fontSize={22} className="text-lightblue-800" />
                </div>
            </Show>
        </>
    );
}

export function ForsideHeader() {
    console.log('header');
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
