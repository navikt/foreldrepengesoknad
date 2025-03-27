import { CheckmarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as LinkInternal } from 'react-router-dom';

import { Accordion, BodyLong, BodyShort, Button, Detail, HStack, Heading, Link, List, VStack } from '@navikt/ds-react';

import { Skjemanummer, links } from '@navikt/fp-constants';
import { Søkerinfo, TidslinjeHendelseDto, Ytelse } from '@navikt/fp-types';
import { capitalizeFirstLetter, formatDate, formatDateMedUkedag, formatTime } from '@navikt/fp-utils';

import { OversiktRoutes } from '../../routes/routes';
import { DokumentHendelse } from '../../sections/tidslinje/DokumentHendelse';
import { KontonummerInfo } from '../kontonummer-info/KontonummerInfo';

interface Props {
    relevantNyTidslinjehendelse: TidslinjeHendelseDto | undefined;
    bankkonto: Søkerinfo['søker']['bankkonto'];
    ytelse: Ytelse | undefined;
    harMinstEttArbeidsforhold: boolean;
    manglendeVedlegg?: Skjemanummer[];
    saksnummer?: string;
}

const getTidspunktTekst = (mottattDato: string | undefined) => {
    if (!mottattDato) {
        return undefined;
    }
    if (dayjs(mottattDato).isSame(dayjs(), 'd')) {
        return `Sendt i dag kl. ${formatTime(mottattDato)}`;
    } else if (dayjs(mottattDato).isSame(dayjs().subtract(1, 'd'), 'd')) {
        return `Sendt i går kl. ${formatTime(mottattDato)}`;
    }
    return `Sendt ${formatDate(mottattDato)} kl. ${formatTime(mottattDato)}`;
};

export const BekreftelseSendtSøknad = ({
    relevantNyTidslinjehendelse,
    bankkonto,
    ytelse,
    harMinstEttArbeidsforhold,
    manglendeVedlegg,
    saksnummer,
}: Props) => {
    const intl = useIntl();

    const relevantDokument = relevantNyTidslinjehendelse?.dokumenter
        ? relevantNyTidslinjehendelse.dokumenter.find((dok) => dok.tittel.includes('Søknad'))
        : undefined;
    const mottattDato = relevantNyTidslinjehendelse ? relevantNyTidslinjehendelse.opprettet : undefined;

    // TODO: mistenker denne alltid vil være undefined?
    // const tidligstBehandlingsDato = relevantNyTidslinjehendelse
    //     ? relevantNyTidslinjehendelse.tidligstBehandlingsDato
    //     : undefined;
    const tidligstBehandlingsDato = undefined;

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
                    <DokumentHendelse dokument={relevantDokument} visesITidslinjen={false} />
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
                {ytelse === 'ENGANGSSTØNAD' && (
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
                {ytelse === 'FORELDREPENGER' && harMinstEttArbeidsforhold && (
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
                {(ytelse === 'FORELDREPENGER' || ytelse === 'SVANGERSKAPSPENGER') && (
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
                                            values={{ erFp: ytelse === 'FORELDREPENGER' }}
                                        />
                                    )}
                                </BodyShort>
                            </VStack>
                        </Accordion.Header>
                        <Accordion.Content>
                            <FormattedMessage
                                id="BekreftelseSendtSøknad.TidligstSvarForklaring"
                                values={{ erFp: ytelse === 'FORELDREPENGER' }}
                            />
                        </Accordion.Content>
                    </Accordion.Item>
                )}
                <KontonummerInfo
                    ytelse={ytelse}
                    bankkonto={bankkonto}
                    harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                />
                {ytelse === 'FORELDREPENGER' && (
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
