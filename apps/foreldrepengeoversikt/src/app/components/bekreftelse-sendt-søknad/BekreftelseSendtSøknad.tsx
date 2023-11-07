import { Accordion, BodyShort, HStack, Link, VStack } from '@navikt/ds-react';
import { Block, bemUtils, links } from '@navikt/fp-common';
import { formatDate, formatTime } from '@navikt/fp-utils';
import './bekreftelse-sendt-søknad.css';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import DokumentHendelse from 'app/sections/tidslinje/DokumentHendelse';
import { CheckmarkIcon } from '@navikt/aksel-icons';
import { sorterTidslinjehendelser } from 'app/utils/tidslinjeUtils';
import Bankkonto from 'app/types/Bankkonto';
import { Ytelse } from 'app/types/Ytelse';

interface Props {
    oppdatertData: boolean;
    tidslinjehendelser: Tidslinjehendelse[] | undefined;
    bankkonto: Bankkonto | undefined;
    ytelse: Ytelse | undefined;
}

const getTidspunktTekst = (mottattDato: Date | undefined): string | undefined => {
    if (!mottattDato) {
        return undefined;
    }
    if (mottattDato && dayjs(mottattDato).isSame(dayjs(), 'd')) {
        return `Sendt i dag kl. ${formatTime(mottattDato)}`;
    } else if (mottattDato && dayjs(mottattDato).isSame(dayjs().subtract(1, 'd'), 'd')) {
        return `Sendt i går kl. ${formatTime(mottattDato)}`;
    }
    return `Sendt ${formatDate(mottattDato)} kl. ${formatTime(mottattDato)}`;
};

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

const BekreftelseSendtSøknad: React.FunctionComponent<Props> = ({
    oppdatertData,
    tidslinjehendelser,
    bankkonto,
    ytelse,
}) => {
    const bem = bemUtils('bekreftelse-sendt-søknad');
    const søknadHendelser = [
        TidslinjehendelseType.FØRSTEGANGSSØKNAD,
        TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY,
        TidslinjehendelseType.ENDRINGSSØKNAD,
    ];
    const sorterteHendelser = tidslinjehendelser
        ? [...tidslinjehendelser].sort(sorterTidslinjehendelser).reverse()
        : undefined;
    const relevantNyHendelse = sorterteHendelser
        ? sorterteHendelser.find(
              (hendelse) =>
                  søknadHendelser.includes(hendelse.tidslinjeHendelseType) &&
                  hendelse.dokumenter.find((dok) => dok.tittel.includes('Søknad')) &&
                  dayjs(hendelse.opprettet).isSameOrAfter(dayjs().subtract(1, 'd')),
          )
        : undefined;

    const relevantDokument = relevantNyHendelse?.dokumenter
        ? relevantNyHendelse.dokumenter.find((dok) => dok.tittel.includes('Søknad'))
        : undefined;
    const mottattDato = relevantNyHendelse ? relevantNyHendelse.opprettet : undefined;
    const sendtInfoTekst = getTidspunktTekst(mottattDato);

    const harKontonummer = !!bankkonto?.kontonummer && bankkonto?.kontonummer.trim().length > 0;
    const kontonummerTittel = getKontonummerTittel(ytelse);
    const kontonummerTekst = harKontonummer ? bankkonto?.kontonummer : 'NAV har ingen kontonummer registrert for deg';
    const kontonummerArbeidsgiverTekst = getKontonummerArbeidsgiverInfoTekst(ytelse);
    const kontonummerInfoTekst = getKontonummerInfoTekst(harKontonummer, ytelse);
    const kontonummerEndreTekst = harKontonummer ? 'Endre kontonummer' : 'Legg til kontonummer';

    return (
        <Block
            className={classNames(
                `${bem.block} ${oppdatertData ? bem.modifier('bigMargin') : bem.modifier('smallMargin')}`,
            )}
        >
            <VStack gap={'7'}>
                <HStack>
                    <div className={bem.element('ikon-box')}>
                        <CheckmarkIcon className={bem.element('ikon')}></CheckmarkIcon>
                    </div>
                    <VStack>
                        <BodyShort
                            size="medium"
                            className={classNames(
                                `${bem.element('tittel')} ${
                                    sendtInfoTekst ? bem.modifier('titleAndInfo') : bem.modifier('justTitle')
                                }`,
                            )}
                        >
                            Søknaden din er sendt!
                        </BodyShort>
                        {sendtInfoTekst && <p className={bem.element('tidspunkt')}>{sendtInfoTekst}</p>}
                    </VStack>
                </HStack>
                {relevantDokument && (
                    <div className={bem.element('dokument')}>
                        <DokumentHendelse
                            dokument={relevantDokument}
                            key={relevantDokument.url}
                            visesITidslinjen={false}
                        />
                    </div>
                )}
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>
                            <div>
                                <BodyShort>{kontonummerTittel}</BodyShort>
                                <BodyShort>{kontonummerTekst}</BodyShort>
                            </div>
                        </Accordion.Header>
                        <Accordion.Content>
                            <VStack gap="5">
                                <BodyShort>{kontonummerArbeidsgiverTekst + kontonummerInfoTekst}</BodyShort>
                                <Link href={links.brukerprofil}>{kontonummerEndreTekst}</Link>
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </VStack>
        </Block>
    );
};

export default BekreftelseSendtSøknad;
