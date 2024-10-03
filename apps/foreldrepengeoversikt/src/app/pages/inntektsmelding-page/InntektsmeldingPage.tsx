import { WalletIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import { hentInntektsmelding } from 'app/api/api';
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

    if (!inntektsmelding) {
        return null; // TODO: what to do
    }

    return (
        <PageRouteLayout header={<InntektsmeldingHeader inntektsmelding={inntektsmelding} />}>
            <div>
                <InntektsmeldingInfoBlokk
                    size="large"
                    heading={
                        <>
                            <span className="font-normal">Månedsinntekt før skatt:</span>{' '}
                            <strong>kr {inntektsmelding.inntektPrMnd}</strong>
                        </>
                    }
                    Ikon={WalletIcon}
                >
                    Månedsinntekten din har blitt beregnet ut fra gjennomsnittet av inntekten din de siste tre månedene
                    før inntektsmeldingen ble sendt.
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingInfoBlokk size="xsmall" heading="Hvordan utbetales foreldrepengene?" Ikon={WalletIcon}>
                    Du får utbetaling direkte fra NAV.
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingSpørsmålOgSvar />
            </div>
        </PageRouteLayout>
    );
};

const InntektsmeldingInfoBlokk = ({
    size,
    Ikon,
    heading,
    children,
}: {
    size: 'xsmall' | 'large';
    Ikon: typeof WalletIcon;
    heading: ReactNode;
    children: ReactNode;
}) => {
    return (
        <div className="rounded-large p-6 bg-surface-alt-3-subtle flex gap-4 justify-between sm:justify-normal flex-row-reverse sm:flex-row">
            {Ikon && <Ikon className="text-icon-info flex-shrink-0" width={24} height={24} aria-hidden />}
            <VStack>
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
        <VStack gap="2" className="bg-surface-subtle rounded-large p-6 pb-8">
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
