import { CheckmarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';

import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

import { formatDate, formatTime } from '@navikt/fp-utils';

import DokumentHendelse from 'app/sections/tidslinje/DokumentHendelse';
import Bankkonto from 'app/types/Bankkonto';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { Ytelse } from 'app/types/Ytelse';

import KontonummerInfo from '../kontonummer-info/KontonummerInfo';

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
    const relevantDokument = relevantNyTidslinjehendelse?.dokumenter
        ? relevantNyTidslinjehendelse.dokumenter.find((dok) => dok.tittel.includes('Søknad'))
        : undefined;
    const mottattDato = relevantNyTidslinjehendelse ? relevantNyTidslinjehendelse.opprettet : undefined;
    const sendtInfoTekst = getTidspunktTekst(mottattDato);

    return (
        <VStack
            gap="6"
            style={{
                padding: 'var(--a-spacing-6)',
                background: 'white',
                borderRadius: '8px',
                boxShadow: 'var(--a-shadow-xsmall)',
            }}
        >
            <HStack gap="4">
                <div
                    style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'var(--a-green-100)',
                        paddingTop: '14px',
                        paddingLeft: '14px',
                    }}
                >
                    <CheckmarkIcon fontSize={24} style={{ color: 'var(--a-green-800)' }} aria-hidden={true} />
                </div>
                <VStack>
                    <Heading level="2" size="small">
                        Søknaden din er sendt!
                    </Heading>
                    {sendtInfoTekst && <BodyShort textColor="subtle">{sendtInfoTekst}</BodyShort>}
                </VStack>
            </HStack>
            {relevantDokument && (
                <ul style={{ padding: 0, margin: 0 }}>
                    <DokumentHendelse dokument={relevantDokument} key={relevantDokument.url} visesITidslinjen={false} />
                </ul>
            )}
            <KontonummerInfo ytelse={ytelse} bankkonto={bankkonto} />
        </VStack>
    );
};

export default BekreftelseSendtSøknad;
