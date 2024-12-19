import { FormattedMessage } from 'react-intl';

import { Accordion, BodyLong, BodyShort, Button, Detail, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Bankkonto } from '@navikt/fp-types';

import { Ytelse } from './../../types/Ytelse';

interface Props {
    bankkonto: Bankkonto | undefined;
    ytelse: Ytelse | undefined;
    harMinstEttArbeidsforhold: boolean;
}

export const KontonummerInfo = ({ bankkonto, ytelse, harMinstEttArbeidsforhold }: Props) => {
    const harKontonummer = !!bankkonto?.kontonummer && bankkonto?.kontonummer.trim().length > 0;
    const kontonummerTekst = harKontonummer ? bankkonto?.kontonummer : 'Nav mangler kontonummeret ditt';
    const kontonummerEndreTekst = harKontonummer ? 'Endre kontonummer' : 'Registrer kontonummer';

    return (
        <Accordion.Item>
            <Accordion.Header>
                <VStack gap="1">
                    <Detail textColor="subtle">KONTONUMMER</Detail>
                    <BodyShort weight="semibold">{kontonummerTekst}</BodyShort>
                </VStack>
            </Accordion.Header>
            <Accordion.Content>
                <VStack gap="4">
                    <KontonummerInfoTekst
                        harKontonummer={harKontonummer}
                        ytelse={ytelse}
                        harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                    />
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
    );
};

interface KontonummerInfoTekstProps {
    harKontonummer: boolean;
    ytelse: Ytelse | undefined;
    harMinstEttArbeidsforhold: boolean;
}

const KontonummerInfoTekst = ({ harKontonummer, ytelse, harMinstEttArbeidsforhold }: KontonummerInfoTekstProps) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD || !harMinstEttArbeidsforhold) {
        if (harKontonummer) {
            return (
                <BodyLong size="small">
                    <FormattedMessage id="KontonummerInfoTekst.NavUtbetaling" values={{ ytelse }} />
                </BodyLong>
            );
        } else {
            return (
                <BodyLong size="small">
                    <FormattedMessage id="KontonummerInfoTekst.Mangler" values={{ ytelse }} />
                </BodyLong>
            );
        }
    }
    if (!harKontonummer) {
        return (
            <>
                <BodyLong size="small">
                    Arbeidsgiveren din vil opplyse i inntektsmeldingen om de betaler deg eller om du får utbetalt fra
                    Nav.
                </BodyLong>
                <BodyLong size="small">
                    Hvis du får utbetaling direkte fra Nav, vil Nav trenge et kontonummer for å utbetale foreldrepengene
                    dine til deg.
                </BodyLong>
            </>
        );
    }

    if (ytelse === Ytelse.FORELDREPENGER || ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return (
            <BodyLong size="small">
                Arbeidsgiveren din vil opplyse i inntektsmeldingen om de betaler deg eller om du får utbetalt fra Nav.
                Hvis du får utbetaling direkte fra Nav, vil pengene komme til det registrerte kontonummeret.
            </BodyLong>
        );
    }

    // Kan kun inntreffe dersom ytelse ikke er tilgjengelig fra saken.
    return (
        <BodyLong size="small">
            Nav vil utbetale til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du
            endre det.
        </BodyLong>
    );
};
