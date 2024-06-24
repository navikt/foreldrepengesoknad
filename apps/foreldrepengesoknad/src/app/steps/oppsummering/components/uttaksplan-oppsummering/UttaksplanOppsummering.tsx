import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import {
    AnnenForelder,
    Dekningsgrad,
    NavnPåForeldre,
    Periode,
    Situasjon,
    getUkerOgDagerFromDager,
} from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';

import OppsummeringsPunkt from '../OppsummeringsPunkt';
import UttaksplanOppsummeringsliste from './UttaksplanOppsummeringsliste';

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

    const antallUkerOgDagerIUttaksplan = getUkerOgDagerFromDager(antallUkerUttaksplan * 5);

    let dekningsgradTekst = undefined;

    if (antallUkerOgDagerIUttaksplan.dager > 0) {
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT) {
            dekningsgradTekst = intl.formatMessage(
                { id: 'oppsummering.uttak.dekningsgrad.verdi100.ukerOgDager' },
                { antallUker: antallUkerOgDagerIUttaksplan.uker, antallDager: antallUkerOgDagerIUttaksplan.dager },
            );
        } else {
            dekningsgradTekst = intl.formatMessage(
                { id: 'oppsummering.uttak.dekningsgrad.verdi80.ukerOgDager' },
                { antallUker: antallUkerOgDagerIUttaksplan.uker, antallDager: antallUkerOgDagerIUttaksplan.dager },
            );
        }
    } else {
        dekningsgradTekst =
            dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
                ? intl.formatMessage(
                      { id: 'oppsummering.uttak.dekningsgrad.verdi100.bareUker' },
                      {
                          antallUker: antallUkerOgDagerIUttaksplan.uker,
                          antallDager: antallUkerOgDagerIUttaksplan.dager,
                      },
                  )
                : intl.formatMessage(
                      { id: 'oppsummering.uttak.dekningsgrad.verdi80.bareUker' },
                      {
                          antallUker: antallUkerOgDagerIUttaksplan.uker,
                          antallDager: antallUkerOgDagerIUttaksplan.dager,
                      },
                  );
    }

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
