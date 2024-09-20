import { FormattedMessage } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { Dekningsgrad } from '@navikt/fp-types';

interface Props {
    onVilEndreSvar: () => void;
    dekningsgrad?: Dekningsgrad;
    annenForelder?: AnnenForelder;
}

export const PeriodeMedForeldrepengerOppsummering = ({ dekningsgrad, annenForelder, onVilEndreSvar }: Props) => {
    if (!dekningsgrad || !annenForelder) {
        return null;
    }

    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="PeriodeMedForeldrepengerOppsummering.Tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        {erDeltUttak ? (
                            <FormattedMessage id="uttaksplaninfo.dekningsgrad.label.deltUttak" />
                        ) : (
                            <FormattedMessage id="uttaksplaninfo.dekningsgrad.label.ikkeDeltUttak" />
                        )}
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? (
                            <FormattedMessage id="PeriodeMedForeldrepengerOppsummering.100" />
                        ) : (
                            <FormattedMessage id="PeriodeMedForeldrepengerOppsummering.80" />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};
