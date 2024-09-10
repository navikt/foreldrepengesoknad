import { Accordion, BodyShort, Detail, Link, VStack } from '@navikt/ds-react';

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

const getKontonummerInfoTekst = (harKontonummer: boolean, ytelse: Ytelse | undefined) => {
    if (!harKontonummer) {
        return 'Hvis søknaden din blir innvilget, må du ha kontonummer registrert for å motta utbetaling fra NAV.';
    }
    if (harKontonummer && ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'NAV vil utbetale engangsstønaden til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du endre det.';
    }
    if (harKontonummer && ytelse === Ytelse.FORELDREPENGER) {
        return 'NAV vil utbetale foreldrepengene til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du endre det.';
    }
    if (harKontonummer && ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return 'NAV vil utbetale svangerskapspengene til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du endre det.';
    }
    return 'NAV vil utbetale til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du endre det.';
};

const KontonummerInfo: React.FunctionComponent<Props> = ({ bankkonto, ytelse }) => {
    const harKontonummer = !!bankkonto?.kontonummer && bankkonto?.kontonummer.trim().length > 0;
    const kontonummerTittel = getKontonummerTittel(ytelse);
    const kontonummerTekst = harKontonummer ? bankkonto?.kontonummer : 'Du har ikke kontonummer registrert hos NAV. ';
    const kontonummerInfoTekst = getKontonummerInfoTekst(harKontonummer, ytelse);
    const kontonummerEndreTekst = harKontonummer ? 'Endre kontonummer' : 'Registrer kontonummer';

    return (
        <Accordion>
            <Accordion.Item title={kontonummerTittel}>
                <Accordion.Header>
                    <Detail>{kontonummerTittel}</Detail>
                    <BodyShort>{kontonummerTekst}</BodyShort>
                </Accordion.Header>
                <Accordion.Content>
                    <VStack gap="7">
                        <BodyShort>{kontonummerInfoTekst}</BodyShort>
                        <Link href={links.brukerprofil}>{kontonummerEndreTekst}</Link>
                    </VStack>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default KontonummerInfo;
