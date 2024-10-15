import { PersonIcon, SparklesIcon, WalletIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { Office2 } from '@navikt/ds-icons';
import { BodyShort, HGrid, Heading, VStack } from '@navikt/ds-react';

import { hentGrunnbeløpOptions, hentInntektsmelding } from '../../api/api';
import { InntektsmeldingHeader } from '../../components/header/Header';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from '../../routes/routes';

export const InntektsmeldingPage = () => {
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.INNTEKTSMELDING);
    const params = useParams();
    const inntektsmeldinger = useQuery(hentInntektsmelding(params.saksnummer!)).data; //TODO: fiks !
    const inntektsmelding = inntektsmeldinger?.find((i) => i.journalpostId === '101555605');
    const GRUNNBELØP = useQuery(hentGrunnbeløpOptions()).data;

    if (!inntektsmelding) {
        return null; // TODO: what to do
    }

    const tjenerOver6G = inntektsmelding.inntektPrMnd * 12 > GRUNNBELØP * 6;
    const harRefusjon = inntektsmelding.refusjonPrMnd > 0;

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
                    {harRefusjon
                        ? `Du vil få utbetaling direkte fra fra ${inntektsmelding.arbeidsgiverIdent}. NAV betaler da foreldrepenger til ${inntektsmelding.arbeidsgiverIdent}.`
                        : 'Du får utbetaling direkte fra NAV.'}
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
                            Det er {inntektsmelding.kontaktpersonNavn} du kan ta kontakt med hvis du ser noe feil i
                            inntektsmeldingen.{' '}
                        </BodyShort>
                    </VStack>
                </InntektsmeldingInfoBlokk>
                <InntektsmeldingSpørsmålOgSvar />
            </HGrid>
        </PageRouteLayout>
    );
};

// const NaturalytelserInfo = ({ inntektsmelding }: { inntektsmelding: InntektsmeldingDto }) => {
//     const bortfalteNaturalytelser = konverterAktivePerioderTilBortfaltePerioder(inntektsmelding);
//
//     return <div />;
// };

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

/**
 * Konverterer liste aktive naturalytelser til liste av bortfalte perioder.
 * Eksempelvis vil disse aktive periodene resultere i denne bortfalte perioden:
 * Aktiv periode: {fomDato: '0001-01-01', tomDato: '2024-09-04'} og {fomDato: '2024-09-27', tomDato: '9999-12-31'}
 * bortfalt periode: {fomDato: '2024-09-05', tomDato: '2024-09-26'}
 *
 * KOPIERT FRA FP_FRONTEND
 */
// const konverterAktivePerioderTilBortfaltePerioder = (inntektsmelding: InntektsmeldingDto) => {
//     const gruppertPåType = inntektsmelding.aktiveNaturalytelser.reduce(
//         (prev, value) => {
//             const type = value.type;
//             if (type in prev) {
//                 return { ...prev, [type]: [...prev[type], value] };
//             }
//
//             return { ...prev, [type]: [value] };
//         },
//         {} as Record<string, AktivNaturalYtelse[]>,
//     );
//
//     const bortfalteNaturalytelser = {} as Record<string, AktivNaturalYtelse[]>;
//
//     Object.entries(gruppertPåType).map(([key, value]) => {
//         const sortert = value
//             .sort((a, b) =>
//                 sorterPerioder(
//                     { fom: a.periode.fomDato, tom: a.periode.tomDato },
//                     { fom: b.periode.fomDato, tom: b.periode.tomDato },
//                 ),
//             )
//             .reverse();
//
//         bortfalteNaturalytelser[key] = sortert.flatMap((current, index, array) => {
//             const next = array[index + 1];
//
//             const nyFom = current.periode.tomDato;
//             const nyTom = next?.periode.fomDato;
//
//             if (nyFom === TIDENES_ENDE) {
//                 return [];
//             }
//
//             return [
//                 {
//                     ...current,
//                     periode: {
//                         fomDato: dayjs(nyFom).add(1),
//                         tomDato: nyTom ? dayjs(nyTom).add(-1) : TIDENES_ENDE,
//                     },
//                 },
//             ];
//         });
//     });
//
//     return bortfalteNaturalytelser;
// };
