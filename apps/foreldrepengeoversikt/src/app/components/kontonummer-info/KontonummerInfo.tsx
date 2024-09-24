import { Accordion, BodyLong, BodyShort, Button, Detail, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import Bankkonto from 'app/types/Bankkonto';
import { Ytelse } from 'app/types/Ytelse';

interface Props {
    bankkonto: Bankkonto | undefined;
    ytelse: Ytelse | undefined;
}

export const KontonummerInfo: React.FunctionComponent<Props> = ({ bankkonto, ytelse }) => {
    const harKontonummer = !!bankkonto?.kontonummer && bankkonto?.kontonummer.trim().length > 0;
    const kontonummerTekst = harKontonummer ? bankkonto?.kontonummer : 'NAV mangler kontonummeret ditt';
    const kontonummerEndreTekst = harKontonummer ? 'Endre kontonummer' : 'Registrer kontonummer';

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <Detail textColor="subtle">KONTONUMMER</Detail>
                    <BodyShort weight="semibold">{kontonummerTekst}</BodyShort>
                </Accordion.Header>
                <Accordion.Content>
                    <VStack gap="4">
                        <KontonummerInfoTekst harKontonummer={harKontonummer} ytelse={ytelse} />
                        <Button
                            size="small"
                            className="w-fit no-underline"
                            variant="secondary"
                            as={Link}
                            href={links.brukerprofil}
                        >
                            {kontonummerEndreTekst}
                        </Button>
                    </VStack>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

const KontonummerInfoTekst = ({ harKontonummer, ytelse }: { harKontonummer: boolean; ytelse: Ytelse | undefined }) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        if (harKontonummer) {
            return (
                <BodyLong size="small">
                    Dette er kontonummeret NAV kommer til å betale engangsstønaden til, hvis søknaden blir innvilget.
                    Hvis det er feil kan du endre det.
                </BodyLong>
            );
        } else {
            return (
                <BodyLong size="small">
                    NAV mangler kontonummeret som engangsstønaden vil bli betalt til hvis du får søknaden din innvilget.
                </BodyLong>
            );
        }
    }
    if (!harKontonummer) {
        return (
            <>
                <BodyLong size="small">
                    Arbeidsgiveren din vil opplyse i inntektsmeldingen om de betaler deg eller om du får utbetalt fra
                    NAV.
                </BodyLong>
                <BodyLong size="small">
                    Hvis du får utbetaling direkte fra NAV, vil NAV trenge et kontonummer for å utbetale foreldrepengene
                    dine til deg.
                </BodyLong>
            </>
        );
    }

    if (ytelse === Ytelse.FORELDREPENGER || ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return (
            <BodyLong size="small">
                Arbeidsgiveren din vil opplyse i inntektsmeldingen om de betaler deg eller om du får utbetalt fra NAV.
                Hvis du får utbetaling direkte fra NAV, vil pengene komme til det registrerte kontonummeret.
            </BodyLong>
        );
    }

    // Kan kun inntreffe dersom ytelse ikke er tilgjengelig fra saken.
    return (
        <BodyLong size="small">
            NAV vil utbetale til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du
            endre det.
        </BodyLong>
    );
};
