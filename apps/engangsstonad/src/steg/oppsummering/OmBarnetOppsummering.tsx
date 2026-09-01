import { FormattedMessage } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { BarnDto, isAdopsjonDto, isFødselDto, isTerminDto } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

interface Props {
    readonly omBarnet: BarnDto;
    readonly onVilEndreSvar: () => void;
}

function AntallBarnFormattedText({ omBarnet }: { readonly omBarnet: BarnDto }) {
    const antallBarn = omBarnet.antallBarn ?? 1;

    if (antallBarn === 1) {
        return <FormattedMessage id={'OmBarnetOppsummering.EttBarn'} />;
    }
    const harAdoptert = isAdopsjonDto(omBarnet);
    if (antallBarn === 2 && !harAdoptert) {
        return <FormattedMessage id={'OmBarnetOppsummering.Tvillinger'} />;
    }
    return antallBarn === 2 && harAdoptert ? (
        <FormattedMessage id={'OmBarnetOppsummering.ToBarn'} />
    ) : (
        <FormattedMessage id={'OmBarnetOppsummering.FlereBarn'} />
    );
}

export const OmBarnetOppsummering = ({ omBarnet, onVilEndreSvar }: Props) => {
    const harAdoptert = isAdopsjonDto(omBarnet);
    const harTermin = isTerminDto(omBarnet);
    const harFødt = isFødselDto(omBarnet);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="OmBarnetOppsummering.tittel" />
                </FormSummary.Heading>
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
                {(harTermin || harFødt) && omBarnet.termindato && (
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
                                    values={{ antall: (omBarnet.fødselsdatoer ?? []).length }}
                                />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {(omBarnet.fødselsdatoer ?? []).map((dato) => formatDate(dato)).join(', ')}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </>
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
