import { FormattedMessage } from 'react-intl';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';

import { FormSummary } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

interface Props {
    omBarnet: OmBarnet;
    onVilEndreSvar: () => void;
}

function AntallBarnFormattedText({ omBarnet }: { readonly omBarnet: OmBarnet }) {
    const harAdoptert = erAdopsjon(omBarnet);

    if (omBarnet.antallBarn === 1) {
        return <FormattedMessage id={'OmBarnetOppsummering.EttBarn'} />;
    } else if (omBarnet.antallBarn === 2 && !harAdoptert) {
        return <FormattedMessage id={'OmBarnetOppsummering.Tvillinger'} />;
    } else if (omBarnet.antallBarn === 2 && harAdoptert) {
        return <FormattedMessage id={'OmBarnetOppsummering.ToBarn'} />;
    } else {
        return <FormattedMessage id={'OmBarnetOppsummering.FlereBarn'} />;
    }
}

const OmBarnetOppsummering = ({ omBarnet, onVilEndreSvar }: Props) => {
    const harAdoptert = erAdopsjon(omBarnet);
    const harTermin = erBarnetIkkeFødt(omBarnet);
    const harFødt = erBarnetFødt(omBarnet);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="OmBarnetOppsummering.tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id={'OmBarnetOppsummering.SoknadenGjelder'} />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <AntallBarnFormattedText omBarnet={omBarnet} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {harFødt && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id={'OmBarnetOppsummering.MedFødselsdato'} values={{ antall: 1 }} />
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
                                    id="OmBarnetOppsummering.MedFødselsdato"
                                    values={{ antall: omBarnet.fødselsdatoer.length }}
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
