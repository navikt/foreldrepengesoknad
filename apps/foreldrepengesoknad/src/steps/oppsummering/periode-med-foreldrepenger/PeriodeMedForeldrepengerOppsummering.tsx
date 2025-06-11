import { useQuery } from '@tanstack/react-query';
import { getStønadskontoParams } from 'api/getStønadskontoParams';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { annenPartVedtakOptions, tilgjengeligeStønadskontoerOptions } from 'appData/api';
import { FormattedMessage, useIntl } from 'react-intl';
import { getAnnenPartVedtakParam } from 'utils/annenForelderUtils';
import { getVarighetString } from 'utils/dateUtils';
import { getAntallUkerFraStønadskontoer } from 'utils/stønadskontoerUtils';

import { FormSummary } from '@navikt/ds-react';

import { isAnnenForelderOppgitt } from '@navikt/fp-common';
import { Dekningsgrad } from '@navikt/fp-types';
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
                        <PeriodeLabel />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

const PeriodeLabel = () => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);

    const annenPartVedtakParams = getAnnenPartVedtakParam(annenForelder, barn);
    const annenPartVedtakQuery = useQuery(annenPartVedtakOptions(annenPartVedtakParams, true));

    const stønadskontoParams = getStønadskontoParams(
        barn,
        annenForelder,
        søkersituasjon,
        barnFraNesteSak,
        annenPartVedtakQuery.data,
        eksisterendeSak,
    );
    const konto = useQuery({
        ...tilgjengeligeStønadskontoerOptions(stønadskontoParams, true),
        select: (kontoer) => {
            return kontoer[dekningsgrad];
        },
    }).data;

    if (!konto) {
        return null;
    }

    if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT) {
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
