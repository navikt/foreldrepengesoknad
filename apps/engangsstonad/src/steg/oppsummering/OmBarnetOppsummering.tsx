import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';

import { FormSummary } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

interface Props {
    omBarnet: OmBarnet;
}

function omBarnetOppsummeringIntlId(omBarnet: OmBarnet) {
    const harAdoptert = erAdopsjon(omBarnet);

    if (omBarnet.antallBarn === 1) {
        return 'OmBarnetOppsummering.EttBarn';
    } else if (omBarnet.antallBarn === 2 && !harAdoptert) {
        return 'OmBarnetOppsummering.Tvillinger';
    } else if (omBarnet.antallBarn === 2 && harAdoptert) {
        return 'OmBarnetOppsummering.ToBarn';
    } else {
        return 'OmBarnetOppsummering.FlereBarn';
    }
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ omBarnet }) => {
    const intl = useIntl();

    const harAdoptert = erAdopsjon(omBarnet);
    const harTermin = erBarnetIkkeFødt(omBarnet);
    const harFødt = erBarnetFødt(omBarnet);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    {intl.formatMessage({ id: 'OppsummeringSteg.OmBarnet' })}
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id={'OmBarnetOppsummering.SoknadenGjelder'} />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <FormattedMessage id={omBarnetOppsummeringIntlId(omBarnet)} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {harFødt && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id={'OmBarnetOppsummering.MedFødselsdato'} />
                        </FormSummary.Label>
                        <FormSummary.Value>{formatDate(omBarnet.fødselsdato)}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {harTermin && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id={'OmBarnetOppsummering.MedTermindato'} />
                        </FormSummary.Label>
                        <FormSummary.Value>{formatDate(omBarnet.termindato)}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {harAdoptert && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id={'OmBarnetOppsummering.MedAdopsjonsdato'} />
                            </FormSummary.Label>
                            <FormSummary.Value>{formatDate(omBarnet.adopsjonsdato)}</FormSummary.Value>
                        </FormSummary.Answer>

                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage
                                    id={
                                        omBarnet.fødselsdatoer.length > 1
                                            ? 'OmBarnetOppsummering.MedFødselsdatoer'
                                            : 'OmBarnetOppsummering.MedFødselsdato'
                                    }
                                />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {omBarnet.fødselsdatoer.map(({ dato }) => formatDate(dato)).join(', ')}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};
export default OmBarnetOppsummering;
