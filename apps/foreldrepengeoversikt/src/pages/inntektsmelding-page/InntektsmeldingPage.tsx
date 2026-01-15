import { Buildings3Icon, SparklesIcon, WalletIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Navigate, useParams } from 'react-router-dom';

import { Alert, BodyShort, Detail, HGrid, Heading, List, Loader, VStack } from '@navikt/ds-react';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import {
    BortfaltNaturalytelse_fpoversikt,
    FpOversiktInntektsmeldingDto_fpoversikt,
    NaturalytelseType_fpoversikt,
} from '@navikt/fp-types';
import { formatCurrencyWithKr, formatDate } from '@navikt/fp-utils';

import { hentInntektsmelding, hentSakerOptions } from '../../api/queries.ts';
import { InntektsmeldingHeader } from '../../components/header/Header';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';
import { getAlleYtelser, mapSakerDTOToSaker } from '../../utils/sakerUtils';

const useGetYtelse = () => {
    const params = useParams();
    const saker = useQuery({
        ...hentSakerOptions(),
        select: mapSakerDTOToSaker,
    }).data;
    if (!saker) {
        return undefined;
    }

    return getAlleYtelser(saker).find((sak) => sak.saksnummer === params.saksnummer)?.ytelse;
};

export const InntektsmeldingPage = () => {
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.INNTEKTSMELDING);
    const intl = useIntl();
    // Siden vi er opptatt av om du tjener over 6G så settes G til uendelig om den loader eller ikke er tilgjengelig.
    const GRUNNBELØP = DEFAULT_SATSER.grunnbeløp[0]!.verdi;
    const ytelseTekst =
        useGetYtelse() === 'SVANGERSKAPSPENGER'
            ? intl.formatMessage({ id: 'ytelse.svangerskapspengene' })
            : intl.formatMessage({ id: 'ytelse.foreldrepengene' });

    const params = useParams();
    const inntektsmeldingerQuery = useQuery(hentInntektsmelding(params.saksnummer!));
    if (inntektsmeldingerQuery.isPending) {
        return (
            <PageRouteLayout header="">
                <div className="flex flex-col items-center justify-center gap-4">
                    <Loader size="2xlarge" />
                    <BodyShort>
                        <FormattedMessage id={'inntektsmelding.laster'} />
                    </BodyShort>
                </div>
            </PageRouteLayout>
        );
    }
    if (inntektsmeldingerQuery.isError) {
        return (
            <PageRouteLayout header="">
                <Alert variant="error">
                    <FormattedMessage id={'felles.feil.prøvSenere'} />
                </Alert>
            </PageRouteLayout>
        );
    }

    const inntektsmelding = inntektsmeldingerQuery.data.find((i) => i.journalpostId === params.journalpostId);

    if (!inntektsmelding) {
        return <Navigate replace to={`${OversiktRoutes.SAKSOVERSIKT}/${params.saksnummer}`} />;
    }

    const tjenerOver6G = inntektsmelding.inntektPrMnd * 12 > GRUNNBELØP * 6;

    return (
        <PageRouteLayout header={<InntektsmeldingHeader inntektsmelding={inntektsmelding} />}>
            <HGrid columns={2} gap="space-16">
                <InntektsmeldingInfoBlokk
                    className="col-span-2"
                    size="large"
                    heading={
                        <>
                            <span className="font-normal">
                                <FormattedMessage id={'inntektsmelding.månedsinntekt.førSkatt'} />
                            </span>{' '}
                            <strong>{formatCurrencyWithKr(inntektsmelding.inntektPrMnd)}</strong>
                        </>
                    }
                    Ikon={WalletIcon}
                >
                    <VStack gap="space-8">
                        <BodyShort>
                            <FormattedMessage id={'inntektsmelding.månedsinntekt.beskrivelse'} />
                        </BodyShort>
                        {tjenerOver6G && (
                            <BodyShort>
                                <FormattedMessage
                                    id={'inntektsmelding.over6G'}
                                    values={{ beløp: formatCurrencyWithKr(GRUNNBELØP * 6) }}
                                />
                            </BodyShort>
                        )}
                    </VStack>
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    className="col-span-2"
                    size="xsmall"
                    heading={intl.formatMessage(
                        {
                            id: 'inntektsmelding.hvordanUtbetales',
                        },
                        { ytelse: ytelseTekst },
                    )}
                    Ikon={WalletIcon}
                >
                    <HvordanUtbetalesPengene inntektsmelding={inntektsmelding} />
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    className="col-span-2"
                    size="xsmall"
                    heading={intl.formatMessage({ id: 'inntektsmelding.naturalytelser.tittel' })}
                    Ikon={SparklesIcon}
                >
                    <NaturalytelserInfo inntektsmelding={inntektsmelding} />
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    size="xsmall"
                    heading={intl.formatMessage({ id: 'inntektsmelding.arbeidsgiver' })}
                    Ikon={Buildings3Icon}
                    className="col-span-2"
                >
                    <VStack>
                        <span>{inntektsmelding.arbeidsgiverNavn}</span>
                        {inntektsmelding.stillingsprosent !== undefined && (
                            <span>
                                {intl.formatMessage({ id: 'inntektsmelding.stillingsprosent' })}:{' '}
                                {inntektsmelding.stillingsprosent}%
                            </span>
                        )}
                    </VStack>
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingSpørsmålOgSvar />
            </HGrid>
        </PageRouteLayout>
    );
};

const HvordanUtbetalesPengene = ({ inntektsmelding }: { inntektsmelding: FpOversiktInntektsmeldingDto_fpoversikt }) => {
    const { inntektPrMnd, refusjonsperioder, refusjonPrMnd, arbeidsgiverNavn } = inntektsmelding;

    return (
        <>
            <VStack className="mb-4">
                <BodyShort>
                    <HvordanUtbetalesPengeneTekst
                        inntektPrMnd={inntektPrMnd}
                        refusjonPrMnd={refusjonPrMnd ?? 0}
                        arbeidsgiverNavn={arbeidsgiverNavn}
                    />
                </BodyShort>
                {refusjonsperioder.map((periode) => (
                    <BodyShort key={periode.fomDato}>
                        <FormattedMessage
                            id={'inntektsmelding.fraDato'}
                            values={{ dato: formatDate(periode.fomDato) }}
                        />
                        {' - '}
                        <HvordanUtbetalesPengeneTekst
                            inntektPrMnd={inntektPrMnd}
                            refusjonPrMnd={periode.refusjonsbeløpMnd ?? 0}
                            arbeidsgiverNavn={arbeidsgiverNavn}
                        />
                    </BodyShort>
                ))}
            </VStack>
            <Detail>
                <FormattedMessage
                    id={'inntektsmelding.opplysningerKilde'}
                    values={{ arbeidsgiver: arbeidsgiverNavn }}
                />
            </Detail>
        </>
    );
};

const HvordanUtbetalesPengeneTekst = ({
    inntektPrMnd,
    refusjonPrMnd,
    arbeidsgiverNavn,
}: {
    inntektPrMnd: number;
    refusjonPrMnd: number;
    arbeidsgiverNavn: string;
}) => {
    const intl = useIntl();
    if (refusjonPrMnd === 0) {
        return intl.formatMessage(
            { id: 'inntektsmelding.utbetaling.direkteFraNav' },
            { arbeidsgiver: arbeidsgiverNavn },
        );
    }

    if (refusjonPrMnd !== inntektPrMnd) {
        return intl.formatMessage({ id: 'inntektsmelding.utbetaling.delvis' }, { arbeidsgiver: arbeidsgiverNavn });
    }

    if (refusjonPrMnd === inntektPrMnd) {
        return intl.formatMessage(
            { id: 'inntektsmelding.utbetaling.fullRefusjon' },
            { arbeidsgiver: arbeidsgiverNavn },
        );
    }

    // Burde være exhaustive
    return '';
};

const NaturalytelserInfo = ({ inntektsmelding }: { inntektsmelding: FpOversiktInntektsmeldingDto_fpoversikt }) => {
    const intl = useIntl();
    if (inntektsmelding.bortfalteNaturalytelser.length === 0) {
        return intl.formatMessage({ id: 'inntektsmelding.naturalytelser.ingenting' });
    }

    if (inntektsmelding.bortfalteNaturalytelser.length === 1) {
        return <BortfaltNaturalytelseTekst bortfaltNaturalytelse={inntektsmelding.bortfalteNaturalytelser[0]!} />;
    }

    return (
        <List>
            {inntektsmelding.bortfalteNaturalytelser.map((n) => (
                <List.Item key={Object.values(n).join('-')}>
                    <BortfaltNaturalytelseTekst bortfaltNaturalytelse={n} />
                </List.Item>
            ))}
        </List>
    );
};

const BortfaltNaturalytelseTekst = ({
    bortfaltNaturalytelse,
}: {
    bortfaltNaturalytelse: BortfaltNaturalytelse_fpoversikt;
}) => {
    const intl = useIntl();
    if (bortfaltNaturalytelse.tomDato === '9999-12-31') {
        return intl.formatMessage(
            { id: 'inntektsmelding.naturalytelser.bortfallerFra' },
            {
                fom: formatDate(bortfaltNaturalytelse.fomDato),
                type: NaturalytelseType[bortfaltNaturalytelse.type],
                beløp: formatCurrencyWithKr(bortfaltNaturalytelse.beløpPerMnd),
            },
        );
    }

    return intl.formatMessage(
        { id: 'inntektsmelding.naturalytelser.bortfallerMellom' },
        {
            fom: formatDate(bortfaltNaturalytelse.fomDato),
            tom: formatDate(bortfaltNaturalytelse.tomDato),
            type: NaturalytelseType[bortfaltNaturalytelse.type],
            beløp: formatCurrencyWithKr(bortfaltNaturalytelse.beløpPerMnd),
        },
    );
};

const InntektsmeldingInfoBlokk = ({
    size,
    Ikon,
    heading,
    children,
    className,
}: {
    className?: string;
    size: 'xsmall' | 'large';
    Ikon: typeof WalletIcon;
    heading: ReactNode;
    children: ReactNode;
}) => {
    return (
        <div
            className={classNames(
                'bg-ax-bg-brand-blue-soft ax-sm:justify-normal ax-sm:flex-row flex flex-row-reverse justify-between gap-4 rounded-lg p-6',
                className,
            )}
        >
            {Ikon && <Ikon className="text-ax-text-info-decoration flex-shrink-0" width={24} height={24} aria-hidden />}
            <VStack gap="space-4">
                <Heading level="2" size={size}>
                    {heading}
                </Heading>
                {children}
            </VStack>
        </div>
    );
};

const InntektsmeldingSpørsmålOgSvar = () => {
    return (
        <VStack gap="space-8" className="bg-ax-bg-neutral-soft col-span-2 rounded-lg p-6 pb-8">
            <VStack>
                <Heading level="2" spacing size="small">
                    <FormattedMessage id={'inntektsmelding.spørsmål.hvaEr'} />
                </Heading>
                <BodyShort>
                    <FormattedMessage id={'inntektsmelding.spørsmål.hvaEr.tekst'} />
                </BodyShort>
            </VStack>
            <VStack>
                <Heading level="2" spacing size="small">
                    <FormattedMessage id={'inntektsmelding.spørsmål.ikkeStemmer'} />
                </Heading>
                <BodyShort>
                    <FormattedMessage id={'inntektsmelding.spørsmål.ikkeStemmer.tekst'} />
                </BodyShort>
            </VStack>
        </VStack>
    );
};

const NaturalytelseType = {
    ELEKTRISK_KOMMUNIKASJON: 'Elektrisk kommunikasjon',
    AKSJER_GRUNNFONDSBEVIS_TIL_UNDERKURS: 'Aksjer grunnfondsbevis til underkurs',
    LOSJI: 'Losji',
    KOST_DØGN: 'Kostpenger døgnsats',
    BESØKSREISER_HJEMMET_ANNET: 'Besøksreiser hjemmet annet',
    KOSTBESPARELSE_I_HJEMMET: 'Kostbesparelser i hjemmet',
    RENTEFORDEL_LÅN: 'Rentefordel lån',
    BIL: 'Bil',
    KOST_DAGER: 'Kostpenger dager',
    BOLIG: 'Bolig',
    SKATTEPLIKTIG_DEL_FORSIKRINGER: 'Skattepliktig del forsikringer',
    FRI_TRANSPORT: 'Fri transport',
    OPSJONER: 'Opsjoner',
    TILSKUDD_BARNEHAGEPLASS: 'Tilskudd barnehageplass',
    ANNET: 'Annet',
    BEDRIFTSBARNEHAGEPLASS: 'Bedriftsbarnehageplass',
    YRKEBIL_TJENESTLIGBEHOV_KILOMETER: 'Yrkesbil tjenesteligbehov kilometer',
    YRKEBIL_TJENESTLIGBEHOV_LISTEPRIS: 'Yrkesbil tjenesteligbehov listepris',
    INNBETALING_TIL_UTENLANDSK_PENSJONSORDNING: 'Innbetaling utenlandsk pensjonsordning',
} satisfies Record<NaturalytelseType_fpoversikt, string>;
