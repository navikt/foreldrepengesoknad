import { ContextDataType, useContextGetData } from 'appData/SvpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { formatDate, getCountryName } from '@navikt/fp-utils';

interface Props {
    readonly onVilEndreSvar: () => void;
}

export const JobbetIUtlandetOppsummering = ({ onVilEndreSvar }: Props) => {
    const arbeidIUtlandet = useContextGetData(ContextDataType.ARBEID_I_UTLANDET);
    const intl = useIntl();
    if (!arbeidIUtlandet) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="steps.label.arbeidIUtlandet" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage
                            id="oppsummering.arbeidIUtlandet.tittel"
                            values={{ antall: arbeidIUtlandet.arbeidIUtlandet.length }}
                        />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <FormSummary.Answers>
                            {arbeidIUtlandet.arbeidIUtlandet.map((arbeid) => (
                                <FormSummary.Answer key={`${arbeid.arbeidsgiverNavn}-${arbeid.land}`}>
                                    <FormSummary.Label>
                                        {arbeid.arbeidsgiverNavn} i {getCountryName(arbeid.land, intl.locale)}
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage
                                            id="ArbeidsforholdOppsummering.arbeidsforhold.periode"
                                            values={{
                                                fom: formatDate(arbeid.fom),
                                                tom: arbeid.tom
                                                    ? formatDate(arbeid.tom)
                                                    : intl.formatMessage({ id: 'pågående' }),
                                            }}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            ))}
                        </FormSummary.Answers>
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};
