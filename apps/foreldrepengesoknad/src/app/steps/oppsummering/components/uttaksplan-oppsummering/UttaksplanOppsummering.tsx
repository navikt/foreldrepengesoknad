import { AnnenForelder, Dekningsgrad, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort } from '@navikt/ds-react';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import UttaksplanOppsummeringsliste from './UttaksplanOppsummeringsliste';
import { Arbeidsforhold } from '@navikt/fp-types';

interface Props {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    dekningsgrad: Dekningsgrad;
    antallUkerUttaksplan: number;
    annenForelder: AnnenForelder;
    familiehendelsesdato: Date;
    termindato: string | undefined;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
    antallBarn: number;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    eksisterendeUttaksplan?: Periode[];
}

const UttaksplanOppsummering: React.FunctionComponent<Props> = ({
    dekningsgrad,
    antallUkerUttaksplan,
    ønskerJustertUttakVedFødsel,
    antallBarn,
    ...rest
}) => {
    const intl = useIntl();

    const dekningsgradTekst =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? intl.formatMessage(
                  { id: 'oppsummering.uttak.dekningsgrad.verdi100' },
                  { antallUker: antallUkerUttaksplan },
              )
            : intl.formatMessage(
                  { id: 'oppsummering.uttak.dekningsgrad.verdi80' },
                  { antallUker: antallUkerUttaksplan },
              );
    return (
        <>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.uttak.dekningsgrad.label' })}>
                <BodyShort>{dekningsgradTekst}</BodyShort>
            </OppsummeringsPunkt>
            <UttaksplanOppsummeringsliste
                ønskerJustertUttakVedFødsel={ønskerJustertUttakVedFødsel}
                {...rest}
            ></UttaksplanOppsummeringsliste>
            {ønskerJustertUttakVedFødsel !== undefined && (
                <OppsummeringsPunkt
                    title={intl.formatMessage(
                        { id: 'oppsummering.uttak.ønskerAutomatiskJustering.label' },
                        {
                            antallBarn,
                        },
                    )}
                >
                    <BodyShort>
                        <FormattedMessage id={ønskerJustertUttakVedFødsel ? 'ja' : 'nei'} />
                    </BodyShort>
                </OppsummeringsPunkt>
            )}
        </>
    );
};

export default UttaksplanOppsummering;
