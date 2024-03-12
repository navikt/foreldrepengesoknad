import { CheckmarkIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { bemUtils, formatDate, formatTime } from '@navikt/fp-utils';

import DokumentHendelse from 'app/sections/tidslinje/DokumentHendelse';
import Bankkonto from 'app/types/Bankkonto';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { Ytelse } from 'app/types/Ytelse';

import KontonummerInfo from '../kontonummer-info/KontonummerInfo';
import './bekreftelse-sendt-søknad.css';

interface Props {
    relevantNyTidslinjehendelse: Tidslinjehendelse | undefined;
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

const BekreftelseSendtSøknad: React.FunctionComponent<Props> = ({ relevantNyTidslinjehendelse, bankkonto, ytelse }) => {
    const bem = bemUtils('bekreftelse-sendt-søknad');

    const relevantDokument = relevantNyTidslinjehendelse?.dokumenter
        ? relevantNyTidslinjehendelse.dokumenter.find((dok) => dok.tittel.includes('Søknad'))
        : undefined;
    const mottattDato = relevantNyTidslinjehendelse ? relevantNyTidslinjehendelse.opprettet : undefined;
    const sendtInfoTekst = getTidspunktTekst(mottattDato);

    return (
        <VStack gap="4">
            <HStack>
                <div className={bem.element('ikon-box')}>
                    <CheckmarkIcon className={bem.element('ikon')} aria-hidden={true}></CheckmarkIcon>
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
                <ul className={bem.element('dokument')}>
                    <DokumentHendelse dokument={relevantDokument} key={relevantDokument.url} visesITidslinjen={false} />
                </ul>
            )}
            <KontonummerInfo ytelse={ytelse} bankkonto={bankkonto} />
        </VStack>
    );
};

export default BekreftelseSendtSøknad;
