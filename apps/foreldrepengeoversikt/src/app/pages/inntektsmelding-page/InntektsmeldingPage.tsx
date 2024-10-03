import { PersonIcon, SparklesIcon, WalletIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { Office2 } from '@navikt/ds-icons';
import { BodyShort, HGrid, Heading, VStack } from '@navikt/ds-react';

import { hentGrunnbeløpOptions, hentInntektsmelding } from 'app/api/api';
import { InntektsmeldingHeader } from 'app/components/header/Header';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { PageRouteLayout } from 'app/routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from 'app/routes/routes';

export const InntektsmeldingPage = () => {
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.INNTEKTSMELDING);
    const params = useParams();
    const inntektsmelding = useQuery(hentInntektsmelding(params.saksnummer!)).data; //TODO: fiks !
    const GRUNNBELØP = useQuery(hentGrunnbeløpOptions()).data;

    if (!inntektsmelding) {
        return null; // TODO: what to do
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
                            <strong>kr {inntektsmelding.inntektPrMnd}</strong>
                        </>
                    }
                    Ikon={WalletIcon}
                >
                    <VStack gap="2">
                        <BodyShort>
                            Månedsinntekten din har blitt beregnet ut fra gjennomsnittet av inntekten din de siste tre
                            månedene før inntektsmeldingen ble sendt.
                        </BodyShort>
                        {tjenerOver6G && (
                            <BodyShort>
                                NAV dekker inntekten du har, opptil {GRUNNBELØP * 6} kroner (seks ganger grunnbeløpet).
                                Siden du tjener mer enn dette vil NAV ikke dekke hele inntekten du har.
                            </BodyShort>
                        )}
                    </VStack>
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    className="col-span-2"
                    size="xsmall"
                    heading="Hvordan utbetales foreldrepengene?"
                    Ikon={WalletIcon}
                >
                    Du får utbetaling direkte fra NAV.
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    className="col-span-2"
                    size="xsmall"
                    heading="Naturalytelser eller “frynsegoder” under permisjonen"
                    Ikon={SparklesIcon}
                >
                    Eventuelle naturalytelser eller “frynsegoder” som du får gjennom din arbeidsgiver vil du beholde
                    under permisjonen.
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    size="xsmall"
                    heading="Din arbeidsgiver"
                    Ikon={Office2}
                    className="col-span-2 md:col-span-1"
                >
                    <VStack>
                        {inntektsmelding.arbeidsgiverIdent}
                        7586 Usikker om vi har dette
                    </VStack>
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk
                    size="xsmall"
                    heading="Innsender"
                    Ikon={PersonIcon}
                    className="col-span-2 md:col-span-1"
                >
                    <VStack gap="1">
                        <span>
                            {inntektsmelding.kontaktpersonNavn}, {inntektsmelding.kontaktpersonNummer}
                        </span>
                        <BodyShort>
                            Det er Navn Navnesen du kan ta kontakt med hvis du ser noe feil i inntektsmeldingen.{' '}
                        </BodyShort>
                    </VStack>
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingSpørsmålOgSvar />
            </HGrid>
        </PageRouteLayout>
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
                    starte uttak av foreldrepenger. Inntektsmeldingen er en del av grunnlaget NAV bruker for å beregne
                    hvor mye du skal få.
                </BodyShort>
            </VStack>
            <VStack>
                <Heading level="2" spacing size="small">
                    Er det noe som ikke stemmer?
                </Heading>
                <BodyShort>
                    Hvis du ser noe som ikke stemmer er det arbeidsgiveren din du må ta kontakt med. Arbeidsgiveren din
                    kan da rette opp feilen og sende en ny inntektsmelding til NAV. Hvis den nye inntektsmeldingen
                    endrer hvordan NAV har beregnet din inntekt vil du få et nytt vedtak.
                </BodyShort>
            </VStack>
        </VStack>
    );
};
