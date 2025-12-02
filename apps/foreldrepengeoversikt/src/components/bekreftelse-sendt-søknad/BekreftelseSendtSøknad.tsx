import { CheckmarkIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as LinkInternal } from 'react-router-dom';

import { Accordion, BodyLong, BodyShort, Button, Detail, HStack, Heading, Link, List, VStack } from '@navikt/ds-react';

import { Skjemanummer, links } from '@navikt/fp-constants';
import { Bankkonto_fpoversikt, TidslinjeHendelseDto_fpoversikt, Ytelse } from '@navikt/fp-types';
import { capitalizeFirstLetter, formatDate, formatDateMedUkedag, formatTime } from '@navikt/fp-utils';

import { søkerInfoOptions } from '../../api/queries.ts';
import { useGetSelectedSak } from '../../hooks/useSelectedSak.ts';
import { OversiktRoutes } from '../../routes/routes';
import { DokumentHendelse } from '../../sections/tidslinje/DokumentHendelse';
import { getFørsteUttaksdagIForeldrepengesaken } from '../../utils/sakerUtils.ts';
import { getTidligstDatoForInntektsmelding } from '../../utils/tidslinjeUtils2.ts';
import { KontonummerInfo } from '../kontonummer-info/KontonummerInfo';

interface Props {
    relevantNyTidslinjehendelse: TidslinjeHendelseDto_fpoversikt | undefined;
    bankkonto?: Bankkonto_fpoversikt;
    ytelse: Ytelse | undefined;
    harMinstEttArbeidsforhold: boolean;
    manglendeVedlegg: Skjemanummer[];
    saksnummer?: string;
}

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

    const sendtInfoTekst = getTidspunktTekst(mottattDato);

    return (
        <VStack gap="space-24" className="bg-ax-bg-default rounded-lg p-6">
            <HStack gap="space-16">
                <div className="bg-ax-success-200 h-[52px] w-[52px] rounded-[50%] pl-[14px] pt-[14px]">
                    <CheckmarkIcon fontSize={24} className="text-ax-success-900" aria-hidden={true} />
                </div>
                <VStack>
                    <Heading level="2" size="small">
                        Søknaden din er sendt!
                    </Heading>
                    {sendtInfoTekst && <BodyShort textColor="subtle">{sendtInfoTekst}</BodyShort>}
                </VStack>
            </HStack>
            {relevantDokument && (
                <ul className="m-0 p-0">
                    <DokumentHendelse dokument={relevantDokument} visesITidslinjen={false} />
                </ul>
            )}
            <Accordion>
                {manglendeVedlegg.length > 0 && (
                    <Accordion.Item>
                        <Accordion.Header>
                            <VStack gap="space-4">
                                <Detail textColor="subtle">
                                    <FormattedMessage id="BekreftelseSendtSøknad.HuskPå" />
                                </Detail>
                                <BodyShort weight="semibold">
                                    <FormattedMessage id="BekreftelseSendtSøknad.ManglendeDokumentasjon" />
                                </BodyShort>
                            </VStack>
                        </Accordion.Header>
                        <Accordion.Content>
                            <VStack gap="space-8">
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
                {ytelse === 'ENGANGSSTØNAD' && <EngangsstønadBekreftelse />}
                {ytelse === 'FORELDREPENGER' && <ForeldrepengerBekreftelse />}
                {ytelse === 'SVANGERSKAPSPENGER' && <SvangerskapspengerBekreftelse />}
                <KontonummerInfo
                    ytelse={ytelse}
                    bankkonto={bankkonto}
                    harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                />
            </Accordion>
        </VStack>
    );
};

const EngangsstønadBekreftelse = () => {
    return (
        <>
            <Accordion.Item>
                <Accordion.Header>
                    <BodyShort weight="semibold">
                        <FormattedMessage id="BekreftelseSendtSøknad.NårDuFårSvar" />
                    </BodyShort>
                </Accordion.Header>
                <Accordion.Content>
                    <BodyLong size="small" spacing>
                        <FormattedMessage id="BekreftelseSendtSøknad.DuKanTidligstFåSvarDel1" />
                    </BodyLong>
                    <BodyLong size="small">
                        <FormattedMessage id="BekreftelseSendtSøknad.DuKanTidligstFåSvarDel2" />
                    </BodyLong>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    <BodyShort weight="semibold">
                        <FormattedMessage id="BekreftelseSendtSøknad.NårUtbetalesPengene" />
                    </BodyShort>
                </Accordion.Header>
                <Accordion.Content>
                    <BodyLong size="small" spacing>
                        <FormattedMessage id="BekreftelseSendtSøknad.UtbetalingstidspunktDel1" />
                    </BodyLong>
                    <BodyLong size="small">
                        <FormattedMessage id="BekreftelseSendtSøknad.UtbetalingstidspunktDel2" />
                        <Link href={links.utbetalingsoversikt}>
                            <FormattedMessage id="BekreftelseSendtSøknad.UtbetalingstidspunktDel3" />
                        </Link>
                        <FormattedMessage id="BekreftelseSendtSøknad.UtbetalingstidspunktDel4" />
                    </BodyLong>
                </Accordion.Content>
            </Accordion.Item>
        </>
    );
};

const ForeldrepengerBekreftelse = () => {
    const harMinstEttArbeidsforhold = useHarMinstEttArbeidsforhold();
    const behandlingTilstand = useÅpenBehandlingTilstand();

    const visInformasjonOmInntektsmelding =
        harMinstEttArbeidsforhold &&
        (behandlingTilstand === 'VENT_INNTEKTSMELDING' || behandlingTilstand === 'VENT_TIDLIG_SØKNAD');

    return (
        <>
            {visInformasjonOmInntektsmelding && (
                <Accordion.Item>
                    <Accordion.Header>
                        <VStack gap="space-4">
                            <Detail textColor="subtle" uppercase>
                                Neste steg
                            </Detail>
                            <BodyShort weight="semibold">Arbeidsgiveren din må sende inntektsmelding til Nav</BodyShort>
                        </VStack>
                    </Accordion.Header>
                    <Accordion.Content>
                        <BodyLong spacing size="small">
                            <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.info" />{' '}
                            <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.flerearbeidsgivere" />
                        </BodyLong>
                        {behandlingTilstand === 'VENT_TIDLIG_SØKNAD' && (
                            <BodyLong spacing size="small">
                                <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.tidlig.fp" />
                            </BodyLong>
                        )}
                        <BodyLong size="small">
                            {behandlingTilstand === 'VENT_TIDLIG_SØKNAD' ? (
                                <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.tidlig.varsel" />
                            ) : (
                                <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.varsel" />
                            )}
                        </BodyLong>
                    </Accordion.Content>
                </Accordion.Item>
            )}
            {harMinstEttArbeidsforhold && (
                <Accordion.Item>
                    <Accordion.Header>
                        <VStack gap="space-4">
                            <Detail textColor="subtle">
                                <FormattedMessage id="BekreftelseSendtSøknad.HuskPå" />
                            </Detail>
                            <BodyShort weight="semibold">
                                <FormattedMessage id="BekreftelseSendtSøknad.SelvInformere" />
                            </BodyShort>
                        </VStack>
                    </Accordion.Header>
                    <Accordion.Content>
                        <BodyLong size="small">
                            <FormattedMessage id="BekreftelseSendtSøknad.HuskÅInformere" />
                        </BodyLong>
                    </Accordion.Content>
                </Accordion.Item>
            )}
            <TidligstMuligeSvar />
            <Accordion.Item>
                <Accordion.Header>
                    <VStack gap="space-4">
                        <Detail textColor="subtle">
                            <FormattedMessage id="BekreftelseSendtSøknad.TilSenere" />
                        </Detail>
                        <BodyShort weight="semibold">
                            <FormattedMessage id="BekreftelseSendtSøknad.HvisDuVilEndre" />
                        </BodyShort>
                    </VStack>
                </Accordion.Header>
                <Accordion.Content>
                    <BodyLong size="small">
                        <FormattedMessage id="BekreftelseSendtSøknad.SendEndringssøknad" />
                    </BodyLong>
                </Accordion.Content>
            </Accordion.Item>
        </>
    );
};

const SvangerskapspengerBekreftelse = () => {
    const harMinstEttArbeidsforhold = useHarMinstEttArbeidsforhold();
    const behandlingTilstand = useÅpenBehandlingTilstand();

    const visInformasjonOmInntektsmelding =
        harMinstEttArbeidsforhold &&
        (behandlingTilstand === 'VENT_INNTEKTSMELDING' || behandlingTilstand === 'VENT_TIDLIG_SØKNAD');
    return (
        <>
            {visInformasjonOmInntektsmelding && (
                <Accordion.Item>
                    <Accordion.Header>
                        <VStack gap="space-4">
                            <Detail textColor="subtle" uppercase>
                                Neste steg
                            </Detail>
                            <BodyShort weight="semibold">Arbeidsgiveren din må sende inntektsmelding til Nav</BodyShort>
                        </VStack>
                    </Accordion.Header>
                    <Accordion.Content>
                        <BodyLong spacing size="small">
                            <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.info" />
                        </BodyLong>
                        {behandlingTilstand === 'VENT_TIDLIG_SØKNAD' && (
                            <BodyLong spacing size="small">
                                <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.tidlig.svp" />
                            </BodyLong>
                        )}
                        <BodyLong size="small">
                            {behandlingTilstand === 'VENT_TIDLIG_SØKNAD' ? (
                                <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.tidlig.varsel" />
                            ) : (
                                <FormattedMessage id="BekreftelseSendtSøknad.VenterPåInntektsmelding.varsel" />
                            )}
                        </BodyLong>
                    </Accordion.Content>
                </Accordion.Item>
            )}
            <TidligstMuligeSvar />
        </>
    );
};

const TidligstMuligeSvar = () => {
    const tidligstMuligeSvar = useGetTidligstMuligeSvar();
    const sak = useGetSelectedSak();

    if (!sak) {
        return null;
    }

    return (
        <Accordion.Item>
            <Accordion.Header>
                <VStack gap="space-4">
                    <Detail textColor="subtle">
                        <FormattedMessage id="BekreftelseSendtSøknad.DuFårTidligstSvar" />
                    </Detail>
                    <BodyShort weight="semibold">
                        {tidligstMuligeSvar ? (
                            capitalizeFirstLetter(formatDateMedUkedag(tidligstMuligeSvar))
                        ) : (
                            <FormattedMessage
                                id="BekreftelseSendtSøknad.FireUkerFør"
                                values={{ erFp: sak.ytelse === 'FORELDREPENGER' }}
                            />
                        )}
                    </BodyShort>
                </VStack>
            </Accordion.Header>
            <Accordion.Content>
                <BodyLong size="small">
                    <FormattedMessage
                        id="BekreftelseSendtSøknad.TidligstSvarForklaring"
                        values={{ erFp: sak.ytelse === 'FORELDREPENGER' }}
                    />
                </BodyLong>
            </Accordion.Content>
        </Accordion.Item>
    );
};

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

const useHarMinstEttArbeidsforhold = () => {
    const søkerInfo = useQuery(søkerInfoOptions()).data;

    return (søkerInfo?.arbeidsforhold ?? []).length > 0;
};

const useÅpenBehandlingTilstand = () => {
    //eslint-disable-next-line react-hooks/rules-of-hooks -- Denne feiler fordi regelen ikkje taklar norske bokstavar i hook-navn
    const sak = useGetSelectedSak();

    if (!sak || sak.ytelse === 'ENGANGSSTØNAD') {
        return undefined;
    }

    return sak.åpenBehandling?.tilstand;
};

const useGetTidligstMuligeSvar = () => {
    const sak = useGetSelectedSak();

    if (sak?.ytelse !== 'FORELDREPENGER') {
        return undefined;
    }

    return getTidligstDatoForInntektsmelding(getFørsteUttaksdagIForeldrepengesaken(sak)?.toISOString());
};
