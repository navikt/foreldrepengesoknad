import { BabyWrappedIcon, PersonPregnantIcon, StrollerIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Detail, HGrid, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { Søkerinfo, Ytelse } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDateMedUkedag } from '@navikt/fp-utils';

import { hentSakerOptions, søkerInfoOptions } from '../../api/api';
import { InntektsmeldingDto } from '../../api/zodSchemas';
import { LayoutWrapper } from '../../sections/LayoutWrapper';
import { Sak } from '../../types/Sak';
import {
    getFamiliehendelseDato,
    getSakTittel,
    grupperSakerPåBarn,
    mapSakerDTOToSaker,
    utledFamiliesituasjon,
} from '../../utils/sakerUtils';
import { StatusTag } from '../status-tag/StatusTag';

export const getSaksoversiktHeading = (ytelse: Ytelse | undefined, intl: ReturnType<typeof useIntl>) => {
    if (ytelse === 'ENGANGSSTØNAD') {
        return intl.formatMessage({ id: 'header.engangsstonadsak' });
    }

    if (ytelse === 'SVANGERSKAPSPENGER') {
        return intl.formatMessage({ id: 'header.svangerskapspengesak' });
    }

    return intl.formatMessage({ id: 'header.dinSak' });
};

function HeaderWrapper({ children }: { readonly children: ReactNode }) {
    return (
        <div className={`bg-ax-bg-default border-ax-brand-blue-300 mb-8 border-b-2`}>
            <LayoutWrapper className="pb-6 pl-4 pr-4 pt-1">{children}</LayoutWrapper>
        </div>
    );
}

function SimpleHeaderWrapper({ children }: { readonly children: ReactNode }) {
    return (
        <div className={`bg-ax-bg-default`}>
            <LayoutWrapper className="pb-6 pl-4 pr-4 pt-1">{children}</LayoutWrapper>
        </div>
    );
}

function BlueDot() {
    return <div className="bg-ax-brand-blue-400 h-[4px] w-[4px] rounded-[50%]" />;
}

function BabyIkon({ ytelse }: { readonly ytelse: Ytelse | undefined }) {
    const YtelseIkon = (() => {
        switch (ytelse) {
            case 'FORELDREPENGER':
            case 'ENGANGSSTØNAD':
                return BabyWrappedIcon;
            case 'SVANGERSKAPSPENGER':
                return PersonPregnantIcon;
            default:
                return StrollerIcon;
        }
    })();

    return (
        <>
            <Show above="md">
                <div className="bg-ax-brand-blue-400 h-[60px] w-[60px] rounded-full pl-2 pt-2">
                    <YtelseIkon fontSize={44} className="text-ax-brand-blue-700" />
                </div>
            </Show>
            <Show below="md">
                <div className="bg-ax-brand-blue-400 h-[38px] w-[38px] rounded-full pl-2 pt-2">
                    <YtelseIkon fontSize={22} className="text-ax-brand-blue-700" />
                </div>
            </Show>
        </>
    );
}

export function ForsideHeader() {
    const intl = useIntl();

    return (
        <HeaderWrapper>
            <HGrid columns="max-content 1fr" gap="space-24" align="start">
                <BabyIkon ytelse={undefined} />
                <VStack>
                    <Heading level="1" size="medium">
                        {intl.formatMessage({ id: 'header.oversikt' })}
                    </Heading>
                    <Detail textColor="subtle">{intl.formatMessage({ id: 'header.dineSaker' })}</Detail>
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
    const intl = useIntl();

    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                {intl.formatMessage({ id: 'header.dokumenter' })}
            </Heading>
            <Detail textColor="subtle">
                {intl.formatMessage({ id: 'header.dokumenterBeskrivelse' }, { saksnummer })}
            </Detail>
        </SimpleHeaderWrapper>
    );
}

export function EttersendingHeader() {
    const intl = useIntl();

    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                {intl.formatMessage({ id: 'header.lastOppDokumenter' })}
            </Heading>
        </SimpleHeaderWrapper>
    );
}

export const InntektsmeldingHeader = ({ inntektsmelding }: { readonly inntektsmelding: InntektsmeldingDto }) => {
    const intl = useIntl();

    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                {intl.formatMessage(
                    { id: 'header.dinInntektRapportert' },
                    { arbeidsgiverNavn: capitalizeFirstLetterInEveryWordOnly(inntektsmelding.arbeidsgiverNavn) },
                )}
            </Heading>
            <Detail textColor="subtle">
                {intl.formatMessage(
                    { id: 'header.endret' },
                    { dato: formatDateMedUkedag(inntektsmelding.mottattTidspunkt) },
                )}
            </Detail>
        </SimpleHeaderWrapper>
    );
};

export const InntektsmeldingOversiktHeader = () => {
    const intl = useIntl();

    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                {intl.formatMessage({ id: 'header.inntektRapportertAv' })}
            </Heading>
        </SimpleHeaderWrapper>
    );
};

function FamiliehendelseDescription({ sak, søkerinfo }: { readonly sak: Sak; readonly søkerinfo?: Søkerinfo }) {
    const intl = useIntl();

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
    const situasjon = utledFamiliesituasjon(
        sak.familiehendelse,
        'gjelderAdopsjon' in sak ? sak.gjelderAdopsjon : undefined,
    );
    const barnTittel = getSakTittel({
        barngruppering: sakIGrupperteSaker?.barn,
        familiehendelsedato: getFamiliehendelseDato(sak.familiehendelse),
        intl,
        antallBarn: sak.ytelse === 'FORELDREPENGER' ? sak.familiehendelse.antallBarn : 0,
        situasjon,
    });

    return (
        <Detail textColor="subtle">
            {barnTittel.tittel} {barnTittel.undertittel}
        </Detail>
    );
}

export function DinSakHeader({ sak }: { readonly sak?: Sak }) {
    const søkerinfo = useQuery(søkerInfoOptions()).data;
    const intl = useIntl();

    if (!sak) {
        return null;
    }

    const harMinstEttArbeidsforhold = !!søkerinfo?.arbeidsforhold && søkerinfo.arbeidsforhold.length > 0;

    return (
        <HeaderWrapper>
            <HGrid columns="max-content 1fr" gap="space-24" align="start">
                <BabyIkon ytelse={sak.ytelse} />
                <VStack>
                    <HStack gap="space-24" align="center">
                        <Heading level="1" size="medium">
                            {intl.formatMessage({ id: 'header.dinSak' })}
                        </Heading>
                        <StatusTag sak={sak} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />
                    </HStack>
                    <Show above="md">
                        <HStack gap="3" align="center">
                            <Detail uppercase>{sak.ytelse}</Detail>
                            <BlueDot />
                            <SaksnummerDetail />

                            <BlueDot />
                            <FamiliehendelseDescription sak={sak} søkerinfo={søkerinfo} />
                        </HStack>
                    </Show>
                    <Show below="md">
                        <VStack gap="space-4">
                            <HStack gap="space-8" align="center">
                                <Detail uppercase>{sak.ytelse}</Detail>
                                <BlueDot />
                                <SaksnummerDetail />
                            </HStack>
                            <FamiliehendelseDescription sak={sak} søkerinfo={søkerinfo} />
                        </VStack>
                    </Show>
                </VStack>
            </HGrid>
        </HeaderWrapper>
    );
}
