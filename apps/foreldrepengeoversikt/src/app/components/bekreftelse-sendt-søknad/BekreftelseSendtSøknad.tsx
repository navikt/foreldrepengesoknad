import { CheckmarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { Accordion, BodyShort, Detail, HStack, Heading, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetter, formatDate, formatDateMedUkedag, formatTime } from '@navikt/fp-utils';

import { KontonummerInfo } from 'app/components/kontonummer-info/KontonummerInfo';
import DokumentHendelse from 'app/sections/tidslinje/DokumentHendelse';
import Bankkonto from 'app/types/Bankkonto';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { Ytelse } from 'app/types/Ytelse';

interface Props {
    relevantNyTidslinjehendelse: Tidslinjehendelse | undefined;
    bankkonto: Bankkonto | undefined;
    ytelse: Ytelse | undefined;
}

const getTidspunktTekst = (mottattDato: Date | undefined): string | undefined => {
    if (!mottattDato) {
        return undefined;
    }
    if (mottattDato && dayjs(mottattDato).isSame(dayjs(), 'd')) {
        return `Sendt i dag kl. ${formatTime(mottattDato)}`;
    } else if (mottattDato && dayjs(mottattDato).isSame(dayjs().subtract(1, 'd'), 'd')) {
        return `Sendt i går kl. ${formatTime(mottattDato)}`;
    }
    return `Sendt ${formatDate(mottattDato)} kl. ${formatTime(mottattDato)}`;
};

const BekreftelseSendtSøknad: React.FunctionComponent<Props> = ({ relevantNyTidslinjehendelse, bankkonto, ytelse }) => {
    const relevantDokument = relevantNyTidslinjehendelse?.dokumenter
        ? relevantNyTidslinjehendelse.dokumenter.find((dok) => dok.tittel.includes('Søknad'))
        : undefined;
    const mottattDato = relevantNyTidslinjehendelse ? relevantNyTidslinjehendelse.opprettet : undefined;
    const tidligstBehandlingsDato = relevantNyTidslinjehendelse
        ? relevantNyTidslinjehendelse.tidligstBehandlingsDato
        : undefined;
    const sendtInfoTekst = getTidspunktTekst(mottattDato);

    return (
        <VStack gap="6" className="p-6 bg-white rounded-large shadow-xsmall">
            <HStack gap="4">
                <div className="w-[52px] h-[52px] rounded-[50%] bg-green-100 pt-[14px] pl-[14px]">
                    <CheckmarkIcon fontSize={24} className="text-green-800" aria-hidden={true} />
                </div>
                <VStack>
                    <Heading level="2" size="small">
                        Søknaden din er sendt!
                    </Heading>
                    {sendtInfoTekst && <BodyShort textColor="subtle">{sendtInfoTekst}</BodyShort>}
                </VStack>
            </HStack>
            {relevantDokument && (
                <ul className="p-0 m-0">
                    <DokumentHendelse dokument={relevantDokument} key={relevantDokument.url} visesITidslinjen={false} />
                </ul>
            )}
            <Accordion>
                {ytelse === Ytelse.FORELDREPENGER && (
                    <Accordion.Item>
                        <Accordion.Header>
                            <VStack gap="1">
                                <Detail textColor="subtle">
                                    <FormattedMessage id="BekreftelseSendtSøknad.HuskPå" />
                                </Detail>
                                <BodyShort weight="semibold">
                                    <FormattedMessage id="BekreftelseSendtSøknad.SelvInformere" />
                                </BodyShort>
                            </VStack>
                        </Accordion.Header>
                        <Accordion.Content>
                            <FormattedMessage id="BekreftelseSendtSøknad.HuskÅInformere" />
                        </Accordion.Content>
                    </Accordion.Item>
                )}
                {(ytelse === Ytelse.FORELDREPENGER || ytelse === Ytelse.SVANGERSKAPSPENGER) && (
                    <Accordion.Item>
                        <Accordion.Header>
                            <VStack gap="1">
                                <Detail textColor="subtle">
                                    <FormattedMessage id="BekreftelseSendtSøknad.DuFårTidligstSvar" />
                                </Detail>
                                <BodyShort weight="semibold">
                                    {tidligstBehandlingsDato &&
                                        capitalizeFirstLetter(formatDateMedUkedag(tidligstBehandlingsDato))}
                                    {!tidligstBehandlingsDato && (
                                        <FormattedMessage
                                            id="BekreftelseSendtSøknad.FireUkerFør"
                                            values={{ erFp: ytelse === Ytelse.FORELDREPENGER }}
                                        />
                                    )}
                                </BodyShort>
                            </VStack>
                        </Accordion.Header>
                        <Accordion.Content>
                            <FormattedMessage
                                id="BekreftelseSendtSøknad.TidligstSvarForklaring"
                                values={{ erFp: ytelse === Ytelse.FORELDREPENGER }}
                            />
                        </Accordion.Content>
                    </Accordion.Item>
                )}
                <KontonummerInfo ytelse={ytelse} bankkonto={bankkonto} />
                {ytelse === Ytelse.FORELDREPENGER && (
                    <Accordion.Item>
                        <Accordion.Header>
                            <VStack gap="1">
                                <Detail textColor="subtle">
                                    <FormattedMessage id="BekreftelseSendtSøknad.TilSenere" />
                                </Detail>
                                <BodyShort weight="semibold">
                                    <FormattedMessage id="BekreftelseSendtSøknad.HvisDuVilEndre" />
                                </BodyShort>
                            </VStack>
                        </Accordion.Header>
                        <Accordion.Content>
                            <FormattedMessage id="BekreftelseSendtSøknad.SendEndringssøknad" />
                        </Accordion.Content>
                    </Accordion.Item>
                )}
            </Accordion>
        </VStack>
    );
};

export default BekreftelseSendtSøknad;
