import { BabyWrappedIcon, PersonPregnantIcon, StrollerIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Detail, HGrid, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import {
    FpOversiktInntektsmeldingDto_fpoversikt,
    PersonMedArbeidsforholdDto_fpoversikt,
    Ytelse,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDateMedUkedag } from '@navikt/fp-utils';

import { hentSakerOptions, søkerInfoOptions } from '../../api/queries.ts';
import { LayoutWrapper } from '../../sections/LayoutWrapper';
import { Sak } from '../../types/Sak';
import {
    getFamiliehendelseDato,
    getSakTittel,
    grupperSakerPåBarn,
    mapSakerDTOToSaker,
    utledFamiliesituasjon,
    ytelseSomTekst,
} from '../../utils/sakerUtils';
import { StatusTag } from '../status-tag/StatusTag';

export const getSaksoversiktHeading = (ytelse: Ytelse | undefined, intl: ReturnType<typeof useIntl>) => {
    if (ytelse === 'ENGANGSSTØNAD') {
        return intl.formatMessage({ id: 'header.engangsstønadsak' });
    }

    if (ytelse === 'SVANGERSKAPSPENGER') {
        return intl.formatMessage({ id: 'header.svangerskapspengesak' });
    }

    return intl.formatMessage({ id: 'header.dinSak' });
};

function HeaderWrapper({ children }: { children: ReactNode }) {
    return (
        <div className={`bg-ax-bg-default border-ax-brand-blue-300 mb-8 border-b-2`}>
            <LayoutWrapper className="pt-1 pr-4 pb-6 pl-4">{children}</LayoutWrapper>
        </div>
    );
}

function SimpleHeaderWrapper({ children }: { children: ReactNode }) {
    return (
        <div className={`bg-ax-bg-default`}>
            <LayoutWrapper className="pt-1 pr-4 pb-6 pl-4">{children}</LayoutWrapper>
        </div>
    );
}

function BlueDot() {
    return <div className="bg-ax-brand-blue-400 h-[4px] w-[4px] rounded-[50%]" />;
}

function BabyIkon({ ytelse }: { ytelse: Ytelse | undefined }) {
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
                <div className="bg-ax-brand-blue-400 h-[60px] w-[60px] rounded-full pt-2 pl-2">
                    <YtelseIkon fontSize={44} className="text-ax-brand-blue-700" />
                </div>
            </Show>
            <Show below="md">
                <div className="bg-ax-brand-blue-400 h-[38px] w-[38px] rounded-full pt-2 pl-2">
                    <YtelseIkon fontSize={22} className="text-ax-brand-blue-700" />
                </div>
            </Show>
        </>
    );
}

export function ForsideHeader() {
    return (
        <HeaderWrapper>
            <HGrid columns="max-content 1fr" gap="space-24" align="start">
                <BabyIkon ytelse={undefined} />
                <VStack>
                    <Heading level="1" size="medium">
                        <FormattedMessage id="header.oversikt" />
                    </Heading>
                    <Detail textColor="subtle">
                        <FormattedMessage id="header.dineSaker" />
                    </Detail>
                </VStack>
            </HGrid>
        </HeaderWrapper>
    );
}

function SaksnummerDetail() {
    const { saksnummer } = useParams();
    return (
        <Detail>
            <FormattedMessage id="header.saksnr" /> {saksnummer}
        </Detail>
    );
}

export function DokumenterHeader() {
    const { saksnummer } = useParams();
    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                <FormattedMessage id="header.dokumenter" />
            </Heading>
            <Detail textColor="subtle">
                <FormattedMessage id="header.dokumenterFra" values={{ saksnummer }} />
            </Detail>
        </SimpleHeaderWrapper>
    );
}

export function EttersendingHeader() {
    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                <FormattedMessage id="header.lastOppDokumenter" />
            </Heading>
        </SimpleHeaderWrapper>
    );
}

export const InntektsmeldingHeader = ({
    inntektsmelding,
}: {
    inntektsmelding: FpOversiktInntektsmeldingDto_fpoversikt;
}) => {
    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                <FormattedMessage
                    id="header.dinInntekt"
                    values={{
                        arbeidsgiverNavn: capitalizeFirstLetterInEveryWordOnly(inntektsmelding.arbeidsgiverNavn),
                    }}
                />
            </Heading>
            <Detail textColor="subtle">
                <FormattedMessage
                    id="header.endret"
                    values={{ dato: formatDateMedUkedag(inntektsmelding.mottattTidspunkt) }}
                />
            </Detail>
        </SimpleHeaderWrapper>
    );
};

export const InntektsmeldingOversiktHeader = () => {
    return (
        <SimpleHeaderWrapper>
            <Heading level="1" size="medium">
                <FormattedMessage id="header.inntektRapportert" />
            </Heading>
        </SimpleHeaderWrapper>
    );
};

export const BeregningHeader = () => {
    return (
        <HeaderWrapper>
            <Heading level="1" size="medium">
                Beregning av din ytelse
            </Heading>
        </HeaderWrapper>
    );
};

function FamiliehendelseDescription({
    sak,
    søkerinfo,
}: {
    sak: Sak;
    søkerinfo?: PersonMedArbeidsforholdDto_fpoversikt;
}) {
    const intl = useIntl();

    const saker = useQuery({
        ...hentSakerOptions(),
        select: mapSakerDTOToSaker,
    }).data;

    if (!søkerinfo || !saker || !sak.familiehendelse) {
        return null;
    }

    const grupperteSaker = grupperSakerPåBarn(søkerinfo.person.barn ?? [], saker);
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

export function DinSakHeader({ sak }: { sak?: Sak }) {
    const intl = useIntl();
    const søkerinfo = useQuery(søkerInfoOptions()).data;

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
                            <FormattedMessage id="header.dinSak" />
                        </Heading>
                        <StatusTag sak={sak} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />
                    </HStack>
                    <Show above="md">
                        <HStack gap="space-12" align="center">
                            <Detail uppercase>{ytelseSomTekst(sak.ytelse, intl)}</Detail>
                            <BlueDot />
                            <SaksnummerDetail />
                            <BlueDot />
                            <FamiliehendelseDescription sak={sak} søkerinfo={søkerinfo} />
                        </HStack>
                    </Show>
                    <Show below="md">
                        <VStack gap="space-4">
                            <HStack gap="space-8" align="center">
                                {ytelseSomTekst(sak.ytelse, intl)} <BlueDot />
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
