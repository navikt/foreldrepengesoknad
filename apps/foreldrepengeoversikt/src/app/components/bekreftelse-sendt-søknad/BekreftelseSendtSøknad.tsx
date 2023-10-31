import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import { Block, bemUtils } from '@navikt/fp-common';
import { formatDate, formatTime } from '@navikt/fp-utils';
import './bekreftelse-sendt-søknad.css';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Tidslinjehendelse } from 'app/types/Tidslinjehendelse';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import DokumentHendelse from 'app/sections/tidslinje/DokumentHendelse';
import { DokumentType } from 'app/types/DokumentType';
import { CheckmarkIcon } from '@navikt/aksel-icons';
import { sorterTidslinjehendelser } from 'app/utils/tidslinjeUtils';

interface Props {
    oppdatertData: boolean;
    visesPåForside: boolean;
    tidslinjehendelser: Tidslinjehendelse[] | undefined;
    saksnummer: string | undefined;
}

const getTidspunktTekst = (mottattDato: Date | undefined) => {
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

const BekreftelseSendtSøknad: React.FunctionComponent<Props> = ({ oppdatertData, tidslinjehendelser, saksnummer }) => {
    const bem = bemUtils('bekreftelse-sendt-søknad');
    const søknadHendelser = [
        TidslinjehendelseType.FØRSTEGANGSSØKNAD,
        TidslinjehendelseType.FØRSTEGANGSSØKNAD_NY,
        TidslinjehendelseType.ENDRINGSSØKNAD,
    ];
    const sorterteHendelser = tidslinjehendelser
        ? [...tidslinjehendelser].sort(sorterTidslinjehendelser).reverse()
        : undefined;
    if (sorterteHendelser) {
        console.log(sorterteHendelser);
    }
    const relevantNyHendelse = sorterteHendelser
        ? sorterteHendelser.find(
              (hendelse) =>
                  søknadHendelser.includes(hendelse.tidslinjeHendelseType) &&
                  saksnummer &&
                  hendelse.dokumenter.find((dok) => dok.saksnummer === saksnummer) &&
                  dayjs(hendelse.opprettet).isSameOrAfter(dayjs().subtract(1, 'd')),
          )
        : undefined;

    const relevantDokument =
        relevantNyHendelse &&
        relevantNyHendelse.dokumenter &&
        relevantNyHendelse.dokumenter[0].type === DokumentType.INNGÅENDE_DOKUMENT
            ? relevantNyHendelse.dokumenter[0]
            : undefined;
    const mottattDato = relevantNyHendelse ? relevantNyHendelse.opprettet : undefined;
    const sendtInfoTekst = getTidspunktTekst(mottattDato);
    return (
        <Block
            className={classNames(
                `${bem.block} ${oppdatertData ? bem.modifier('bigMargin') : bem.modifier('smallMargin')}`,
            )}
        >
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
                    <DokumentHendelse dokument={relevantDokument} key={relevantDokument.url} visesITidslinjen={false} />
                </div>
            )}
        </Block>
    );
};

export default BekreftelseSendtSøknad;
