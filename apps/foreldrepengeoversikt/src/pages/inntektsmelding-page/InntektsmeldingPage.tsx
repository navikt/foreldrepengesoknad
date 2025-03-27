import { Buildings3Icon, SparklesIcon, WalletIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { Navigate, useParams } from 'react-router-dom';

import { Alert, BodyShort, Detail, HGrid, Heading, List, Loader, VStack } from '@navikt/ds-react';

import { formatCurrency, formatCurrencyWithKr, formatDate } from '@navikt/fp-utils';

import { hentInntektsmelding, hentSakerOptions, hentSatserOptions } from '../../api/api';
import { InntektsmeldingDto, Naturalytelsetype } from '../../api/zodSchemas';
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
    // Siden vi er opptatt av om du tjener over 6G så settes G til uendelig om den loader eller ikke er tilgjengelig.
    const GRUNNBELØP =
        useQuery({ ...hentSatserOptions(), select: (satser) => satser.grunnbeløp[0].verdi }).data ?? Infinity;
    const ytelseTekst = useGetYtelse() === 'SVANGERSKAPSPENGER' ? 'svangerskapspengene' : 'foreldrepengene';
    const locale = useIntl().locale;

    const params = useParams();
    const inntektsmeldingerQuery = useQuery(hentInntektsmelding(params.saksnummer!));
    if (inntektsmeldingerQuery.isPending) {
        return (
            <PageRouteLayout header="">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <Loader size="2xlarge" />
                    <BodyShort>Henter inntektsmelding…</BodyShort>
                </div>
            </PageRouteLayout>
        );
    }
    if (inntektsmeldingerQuery.isError) {
        return (
            <PageRouteLayout header="">
                <Alert variant="error">Noe gikk galt. Prøv igjen senere</Alert>
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
            <HGrid columns={2} gap="4">
                <InntektsmeldingInfoBlokk
                    className="col-span-2"
                    size="large"
                    heading={
                        <>
                            <span className="font-normal">Månedsinntekt før skatt:</span>{' '}
                            <strong>kr {formatCurrency(inntektsmelding.inntektPrMnd)}</strong>
                        </>
                    }
                    Ikon={WalletIcon}
                >
                    <VStack gap="2">
                        <BodyShort>
                            Månedsinntekten din blir som regel beregnet ut fra gjennomsnittet av inntekten din de siste
                            tre månedene før du skal ut i permisjon
                        </BodyShort>
                        {tjenerOver6G && (
                            <BodyShort>
                                Nav dekker inntekten du har, opptil {formatCurrencyWithKr(GRUNNBELØP * 6, locale)} (seks
                                ganger grunnbeløpet). Siden du tjener mer enn dette vil Nav ikke dekke hele inntekten du
                                har.
                            </BodyShort>
                        )}
                    </VStack>
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    className="col-span-2"
                    size="xsmall"
                    heading={`Hvordan utbetales ${ytelseTekst}?`}
                    Ikon={WalletIcon}
                >
                    <HvordanUtbetalesPengene inntektsmelding={inntektsmelding} />
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    className="col-span-2"
                    size="xsmall"
                    heading="Naturalytelser eller “frynsegoder” under permisjonen"
                    Ikon={SparklesIcon}
                >
                    <NaturalytelserInfo inntektsmelding={inntektsmelding} />
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    size="xsmall"
                    heading="Din arbeidsgiver"
                    Ikon={Buildings3Icon}
                    className="col-span-2"
                >
                    <VStack>
                        <span>{inntektsmelding.arbeidsgiverNavn}</span>
                        {inntektsmelding.stillingsprosent !== undefined && (
                            <span>Din stillingsprosent: {inntektsmelding.stillingsprosent}%</span>
                        )}
                    </VStack>
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingSpørsmålOgSvar />
            </HGrid>
        </PageRouteLayout>
    );
};

const HvordanUtbetalesPengene = ({ inntektsmelding }: { inntektsmelding: InntektsmeldingDto }) => {
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
                        Fra {formatDate(periode.fomDato)}
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
                Dette er opplysninger oppgitt av {arbeidsgiverNavn}, du vil få vite dette sikkert når du får svar på
                søknaden din.
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
    if (refusjonPrMnd === 0) {
        return `${arbeidsgiverNavn} har opplyst at det utbetales direkte til deg fra Nav.`;
    }

    if (refusjonPrMnd !== inntektPrMnd) {
        return `${arbeidsgiverNavn} har opplyst at det skal utbetales delvis av dem og Nav.`;
    }

    if (refusjonPrMnd === inntektPrMnd) {
        return `${arbeidsgiverNavn} har opplyst at de skal utbetale til deg, og ønsker betalt Fra Nav.`;
    }

    // Burde være exhaustive
    return '';
};

const NaturalytelserInfo = ({ inntektsmelding }: { inntektsmelding: InntektsmeldingDto }) => {
    if (inntektsmelding.bortfalteNaturalytelser.length === 0) {
        return 'Eventuelle naturalytelser eller “frynsegoder” som du får gjennom din arbeidsgiver vil du beholde under permisjonen.';
    }

    if (inntektsmelding.bortfalteNaturalytelser.length === 1) {
        return <BortfaltNaturalytelseTekst bortfaltNaturalytelse={inntektsmelding.bortfalteNaturalytelser[0]} />;
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
    bortfaltNaturalytelse: InntektsmeldingDto['bortfalteNaturalytelser'][0];
}) => {
    if (bortfaltNaturalytelse.tomDato === '9999-12-31') {
        // eslint-disable-next-line max-len
        return `${formatDate(bortfaltNaturalytelse.fomDato)} får du ikke lenger ${NaturalytelseType[bortfaltNaturalytelse.type]} til en verdi av ${formatCurrency(bortfaltNaturalytelse.beløpPerMnd)} kr.`;
    }

    // eslint-disable-next-line max-len
    return `Mellom ${formatDate(bortfaltNaturalytelse.fomDato)} og ${formatDate(bortfaltNaturalytelse.tomDato)} får du ikke lenger ${NaturalytelseType[bortfaltNaturalytelse.type]} til en verdi av ${formatCurrency(bortfaltNaturalytelse.beløpPerMnd)} kr.`;
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
                'rounded-large p-6 bg-surface-alt-3-subtle flex gap-4 justify-between sm:justify-normal flex-row-reverse sm:flex-row',
                className,
            )}
        >
            {Ikon && <Ikon className="text-icon-info flex-shrink-0" width={24} height={24} aria-hidden />}
            <VStack gap="1">
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
        <VStack gap="2" className="bg-surface-subtle rounded-large p-6 pb-8 col-span-2">
            <VStack>
                <Heading level="2" spacing size="small">
                    Hva er en inntektsmelding?
                </Heading>
                <BodyShort>
                    I inntektsmeldingen oppgir din arbeidsgiver hva som er din vanlige lønn rundt den tiden da du skal
                    starte permisjonen din. Inntektsmeldingen er en del av grunnlaget Nav bruker for å beregne hvor mye
                    du skal få.
                </BodyShort>
            </VStack>
            <VStack>
                <Heading level="2" spacing size="small">
                    Er det noe som ikke stemmer?
                </Heading>
                <BodyShort>
                    Hvis du ser noe som ikke stemmer er det arbeidsgiveren din du må ta kontakt med. Arbeidsgiveren din
                    kan da rette opp feilen og sende en ny inntektsmelding til Nav. Hvis den nye inntektsmeldingen
                    endrer hvordan Nav har beregnet din inntekt vil du få et nytt vedtak.
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
} satisfies Record<Naturalytelsetype, string>;
