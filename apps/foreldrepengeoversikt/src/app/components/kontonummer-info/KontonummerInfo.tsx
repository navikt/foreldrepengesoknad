import { bemUtils, links } from '@navikt/fp-common';
import Bankkonto from 'app/types/Bankkonto';
import { Ytelse } from 'app/types/Ytelse';
import { Accordion, BodyShort, Detail, Link, VStack } from '@navikt/ds-react';
import './kontonummer-info.css';

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

const getKontonummerArbeidsgiverInfoTekst = (ytelse: Ytelse | undefined) => {
    if (ytelse === Ytelse.FORELDREPENGER || ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return 'Arbeidsgiveren din vil opplyse i inntektsmeldingen om de betaler deg direkte eller om du får utbetaling fra NAV.';
    }
    return '';
};

const getKontonummerInfoTekst = (harKontonummer: boolean, ytelse: Ytelse | undefined) => {
    if (!ytelse) {
        return '';
    }
    if (!harKontonummer && ytelse === Ytelse.FORELDREPENGER) {
        return 'Hvis NAV utbetaler til deg, vil NAV trenge et kontonummer å utbetale foreldrepengene dine til.';
    }
    if (!harKontonummer && ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return 'Hvis NAV utbetaler til deg, vil NAV trenge et kontonummer å utbetale svangerskapspengene dine til.';
    }
    if (!harKontonummer && ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'Du må registrere et kontonummer som NAV skal utbetale engangsstønaden din til.';
    }
    if (harKontonummer && ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'Dette er kontonummeret NAV kommer til å betale ut engangstønaden til. Hvis det er feil, kan du endre det.';
    }
    return 'Dersom NAV utbetaler til deg, vil kontonummeret som er registrert være det du får utbetaling til.';
};

const KontonummerInfo: React.FunctionComponent<Props> = ({ bankkonto, ytelse }) => {
    const bem = bemUtils('kontonummer-info');

    const harKontonummer = !!bankkonto?.kontonummer && bankkonto?.kontonummer.trim().length > 0;
    const kontonummerTittel = getKontonummerTittel(ytelse);
    const kontonummerTekst = harKontonummer ? bankkonto?.kontonummer : 'NAV har ingen kontonummer registrert for deg';
    const kontonummerArbeidsgiverTekst = getKontonummerArbeidsgiverInfoTekst(ytelse);
    const kontonummerInfoTekst = getKontonummerInfoTekst(harKontonummer, ytelse);
    const kontonummerEndreTekst = harKontonummer ? 'Endre kontonummer' : 'Legg til kontonummer';

    return (
        <Accordion className={bem.block}>
            <Accordion.Item>
                <Accordion.Header>
                    <div className={bem.element('accordeonHeader')}>
                        <Detail className={bem.element('tittelTekst')}>{kontonummerTittel}</Detail>
                        <BodyShort className={bem.element('kontonummer')}>{kontonummerTekst}</BodyShort>
                    </div>
                </Accordion.Header>
                <Accordion.Content>
                    <VStack gap="7">
                        <BodyShort>{kontonummerArbeidsgiverTekst + ' ' + kontonummerInfoTekst}</BodyShort>
                        <Link href={links.brukerprofil}>{kontonummerEndreTekst}</Link>
                    </VStack>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default KontonummerInfo;
