import { Accordion, BodyLong, BodyShort, Button, Detail, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import Bankkonto from 'app/types/Bankkonto';
import { Ytelse } from 'app/types/Ytelse';

interface Props {
    bankkonto: Bankkonto | undefined;
    ytelse: Ytelse | undefined;
}

const getKontonummerTittel = (ytelse: Ytelse | undefined) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'KONTONUMMER FOR UTBETALING';
    }
    return 'KONTONUMMER';
};

const KontonummerInfo: React.FunctionComponent<Props> = ({ bankkonto, ytelse }) => {
    const harKontonummer = !!bankkonto?.kontonummer && bankkonto?.kontonummer.trim().length > 0;
    console.log(bankkonto);
    const kontonummerTittel = getKontonummerTittel(ytelse);
    const kontonummerTekst = harKontonummer ? bankkonto?.kontonummer : 'Du har ikke kontonummer registrert hos NAV. ';
    const kontonummerEndreTekst = harKontonummer ? 'Endre kontonummer' : 'Registrer kontonummer';

    return (
        <Accordion headingSize="small" size="large">
            <Accordion.Item title={kontonummerTittel}>
                <Accordion.Header>
                    <Detail textColor="subtle">{kontonummerTittel}</Detail>
                    <BodyShort size="large" weight="semibold">
                        {kontonummerTekst}
                    </BodyShort>
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
    if (harKontonummer && ytelse === Ytelse.ENGANGSSTØNAD) {
        return (
            <BodyLong size="small">
                NAV vil utbetale engangsstønaden til dette kontonummeret, hvis søknaden blir innvilget. Hvis
                kontonummeret er feil kan du endre det.
            </BodyLong>
        );
    }
    if ((harKontonummer && ytelse === Ytelse.FORELDREPENGER) || ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return (
            <BodyLong size="small">
                Arbeidsgiveren din vil opplyse i inntektsmeldingen om de betaler deg eller om du får utbetalt fra NAV.
                Hvis du får utbetaling direkte fra NAV, vil pengene komme til det registrerte kontonummeret.
            </BodyLong>
        );
    }
    return (
        <BodyLong size="small">
            NAV vil utbetale til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du
            endre det.
        </BodyLong>
    );
};

export default KontonummerInfo;
