import { useQuery } from '@tanstack/react-query';
import { useStønadsKontoerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { getVarighetString } from 'utils/dateUtils';
import { getAntallUkerFraStønadskontoer } from 'utils/stønadskontoerUtils';

import { FormSummary } from '@navikt/ds-react';

import { isAnnenForelderOppgitt } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

interface Props {
    onVilEndreSvar: () => void;
}

export const PeriodeMedForeldrepengerOppsummering = ({ onVilEndreSvar }: Props) => {
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="PeriodeMedForeldrepengerOppsummering.Tittel" />
                </FormSummary.Heading>
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
                        <PeriodeLabel />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
};

const PeriodeLabel = () => {
    const intl = useIntl();
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));

    const kontoerOptions = useStønadsKontoerOptions();
    const konto = useQuery({
        ...kontoerOptions,
        select: (kontoer) => {
            return kontoer[dekningsgrad];
        },
    }).data;

    if (!konto) {
        return null;
    }

    if (dekningsgrad === '100') {
        return (
            <FormattedMessage
                id="uttaksplaninfo.49Uker"
                values={{
                    varighetString: getVarighetString(getAntallUkerFraStønadskontoer(konto.kontoer) * 5, intl),
                }}
            />
        );
    }

    return (
        <FormattedMessage
            id="uttaksplaninfo.59Uker"
            values={{
                varighetString: getVarighetString(getAntallUkerFraStønadskontoer(konto.kontoer) * 5, intl),
            }}
        />
    );
};
