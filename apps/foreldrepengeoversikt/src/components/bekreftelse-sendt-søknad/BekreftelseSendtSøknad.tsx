import { CheckmarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as LinkInternal } from 'react-router-dom';

import { Accordion, BodyLong, BodyShort, Button, Detail, HStack, Heading, Link, List, VStack } from '@navikt/ds-react';

import { Skjemanummer, links } from '@navikt/fp-constants';
import { Bankkonto } from '@navikt/fp-types';
import { capitalizeFirstLetter, formatDate, formatDateMedUkedag, formatTime } from '@navikt/fp-utils';

import { DokumentHendelse } from '../../sections/tidslinje/DokumentHendelse';
import { Tidslinjehendelse } from '../../types/Tidslinjehendelse';
import { Ytelse } from '../../types/Ytelse';
import { KontonummerInfo } from './../../components/kontonummer-info/KontonummerInfo';
import OversiktRoutes from './../../routes/routes';

interface Props {
    relevantNyTidslinjehendelse: Tidslinjehendelse | undefined;
    bankkonto: Bankkonto | undefined;
    ytelse: Ytelse | undefined;
    harMinstEttArbeidsforhold: boolean;
    manglendeVedlegg?: Skjemanummer[];
    saksnummer?: string;
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

const BekreftelseSendtSøknad: React.FunctionComponent<Props> = ({
    relevantNyTidslinjehendelse,
    bankkonto,
    ytelse,
    harMinstEttArbeidsforhold,
    manglendeVedlegg,
    saksnummer,
}) => {
    const intl = useIntl();

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
                {manglendeVedlegg && manglendeVedlegg.length > 0 && (
                    <Accordion.Item>
                        <Accordion.Header>
                            <VStack gap="1">
                                <Detail textColor="subtle">
                                    <FormattedMessage id="BekreftelseSendtSøknad.HuskPå" />
                                </Detail>
                                <BodyShort weight="semibold">
                                    <FormattedMessage id="BekreftelseSendtSøknad.ManglendeDokumentasjon" />
                                </BodyShort>
                            </VStack>
                        </Accordion.Header>
                        <Accordion.Content>
                            <VStack gap="2">
                                <BodyLong>
                                    <FormattedMessage id="BekreftelseSendtSøknad.ManglendeDokumentasjonDetaljer" />
                                </BodyLong>
                                <List description={intl.formatMessage({ id: 'BekreftelseSendtSøknad.DokSomMangler' })}>
                                    {manglendeVedlegg.map((skjemanummer) => (
                                        <List.Item key={skjemanummer}>
                                            <FormattedMessage id={`ettersendelse.${skjemanummer}`} />
                                        </List.Item>
                                    ))}
                                </List>
                                {saksnummer && (
                                    <LinkInternal to={`/sak/${saksnummer}/${OversiktRoutes.ETTERSEND}`}>
                                        <Button variant="secondary" size="small">
                                            <FormattedMessage id="BekreftelseSendtSøknad.SendDok" />
                                        </Button>
                                    </LinkInternal>
                                )}
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                )}
                {ytelse === Ytelse.ENGANGSSTØNAD && (
                    <>
                        <Accordion.Item>
                            <Accordion.Header>
                                <BodyShort weight="semibold">
                                    <FormattedMessage id="BekreftelseSendtSøknad.NårDuFårSvar" />
                                </BodyShort>
                            </Accordion.Header>
                            <Accordion.Content>
                                <VStack gap="2">
                                    <BodyLong size="small">
                                        <FormattedMessage id="BekreftelseSendtSøknad.DuKanTidligstFåSvarDel1" />
                                    </BodyLong>
                                    <BodyLong size="small">
                                        <FormattedMessage id="BekreftelseSendtSøknad.DuKanTidligstFåSvarDel2" />
                                    </BodyLong>
                                </VStack>
                            </Accordion.Content>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Header>
                                <BodyShort weight="semibold">
                                    <FormattedMessage id="BekreftelseSendtSøknad.NårUtbetalesPengene" />
                                </BodyShort>
                            </Accordion.Header>
                            <Accordion.Content>
                                <VStack gap="2">
                                    <BodyLong size="small">
                                        <FormattedMessage id="BekreftelseSendtSøknad.UtbetalingstidspunktDel1" />
                                    </BodyLong>
                                    <BodyLong size="small">
                                        <FormattedMessage id="BekreftelseSendtSøknad.UtbetalingstidspunktDel2" />
                                        <Link href={links.utbetalingsoversikt}>
                                            <FormattedMessage id="BekreftelseSendtSøknad.UtbetalingstidspunktDel3" />
                                        </Link>
                                        <FormattedMessage id="BekreftelseSendtSøknad.UtbetalingstidspunktDel4" />
                                    </BodyLong>
                                </VStack>
                            </Accordion.Content>
                        </Accordion.Item>
                    </>
                )}
                {ytelse === Ytelse.FORELDREPENGER && harMinstEttArbeidsforhold && (
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
                <KontonummerInfo
                    ytelse={ytelse}
                    bankkonto={bankkonto}
                    harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                />
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
