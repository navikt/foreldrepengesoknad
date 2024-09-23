import { FormattedMessage, useIntl } from 'react-intl';
import { getUkerOgDagerFromDager } from 'utils/dateUtils';

import { FormSummary } from '@navikt/ds-react';

import { AnnenForelder, Dekningsgrad, NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';

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
    onVilEndreSvar: () => void;
}

const UttaksplanOppsummering: React.FunctionComponent<Props> = ({
    dekningsgrad,
    antallUkerUttaksplan,
    ønskerJustertUttakVedFødsel,
    antallBarn,
    onVilEndreSvar,
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
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="oppsummering.uttak" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="oppsummering.uttak.dekningsgrad.label" />
                    </FormSummary.Label>
                    <FormSummary.Value>{dekningsgradTekst}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <UttaksplanOppsummeringsliste ønskerJustertUttakVedFødsel={ønskerJustertUttakVedFødsel} {...rest} />
                </FormSummary.Answer>
                {ønskerJustertUttakVedFødsel !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage
                                id="oppsummering.uttak.ønskerAutomatiskJustering.label"
                                values={{ antallBarn }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {ønskerJustertUttakVedFødsel ? <FormattedMessage id="ja" /> : <FormattedMessage id="nei" />}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default UttaksplanOppsummering;
