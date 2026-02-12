import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { getUkerOgDagerFromDager } from 'utils/dateUtils';

import { FormSummary } from '@navikt/ds-react';

import { AnnenForelder, NavnPåForeldre, Situasjon } from '@navikt/fp-common';
import { Dekningsgrad, EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanOppsummeringsliste } from './UttaksplanOppsummeringsliste';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    dekningsgrad: Dekningsgrad;
    annenForelder: AnnenForelder;
    familiehendelsesdato: Date;
    termindato: string | undefined;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
    antallBarn: number;
    onVilEndreSvar: () => void;
}

export const UttaksplanOppsummering = ({ dekningsgrad, antallBarn, onVilEndreSvar, ...rest }: Props) => {
    const intl = useIntl();

    const uttaksplanMetadata = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA));
    const antallUkerUttaksplan = notEmpty(uttaksplanMetadata.antallUkerIUttaksplan);

    const ønskerJustertUttakVedFødsel = notEmpty(uttaksplanMetadata).ønskerJustertUttakVedFødsel;

    const antallUkerOgDagerIUttaksplan = getUkerOgDagerFromDager(antallUkerUttaksplan * 5);

    let dekningsgradTekst = undefined;

    if (antallUkerOgDagerIUttaksplan.dager > 0) {
        if (dekningsgrad === '100') {
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
            dekningsgrad === '100'
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
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
};
