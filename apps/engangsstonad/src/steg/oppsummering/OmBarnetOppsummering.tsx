import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';

import { BodyLong, BodyShort, FormSummary, HStack, VStack } from '@navikt/ds-react';

import { AttachmentList } from '@navikt/fp-ui';
import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

interface Props {
    omBarnet: OmBarnet;
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ omBarnet }) => {
    const intl = useIntl();

    const harAdoptert = erAdopsjon(omBarnet);
    const harTermin = erBarnetIkkeFødt(omBarnet);
    const harFødt = erBarnetFødt(omBarnet);

    let antallBarnSummaryText;
    if (omBarnet.antallBarn === 1) {
        antallBarnSummaryText = intl.formatMessage({ id: 'OmBarnetOppsummering.EttBarn' });
    } else if (omBarnet.antallBarn === 2 && !harAdoptert) {
        antallBarnSummaryText = intl.formatMessage({ id: 'OmBarnetOppsummering.Tvillinger' });
    } else if (omBarnet.antallBarn === 2 && harAdoptert) {
        antallBarnSummaryText = intl.formatMessage({ id: 'OmBarnetOppsummering.ToBarn' });
    } else {
        antallBarnSummaryText = intl.formatMessage(
            { id: 'OmBarnetOppsummering.FlereBarn' },
            {
                antall: omBarnet.antallBarn,
            },
        );
    }

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
                    <FormSummary.Value>{antallBarnSummaryText}</FormSummary.Value>
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
                                {omBarnet.fødselsdatoer
                                    .map((_, index) => {
                                        return formatDate(omBarnet.fødselsdatoer[index].dato);
                                    })
                                    .join(', ')}
                            </FormSummary.Value>
                        </FormSummary.Answer>

                        {/*TODO: dette vedlegget */}
                        {/*<BodyShort style={{ fontWeight: 'bold' }}>*/}
                        {/*    <FormattedMessage id={'OmBarnetOppsummering.VedlagtOmsorgsovertakelseBekreftelse'} />*/}
                        {/*</BodyShort>*/}
                        {/*<AttachmentList attachments={notEmpty(dokumentasjon).vedlegg} />*/}
                    </>
                )}
            </FormSummary.Answers>

            {/*TODO: dette vedlegget*/}
            {/*{dokumentasjon && erTerminDokumentasjon(dokumentasjon) && (*/}
            {/*    <>*/}
            {/*        <HStack gap="2">*/}
            {/*            <BodyShort>*/}
            {/*                <FormattedMessage id={'OmBarnetOppsummering.SomErDatert'} />*/}
            {/*            </BodyShort>*/}
            {/*            <BodyShort>{formatDate(dokumentasjon.terminbekreftelsedato)}</BodyShort>*/}
            {/*        </HStack>*/}
            {/*        <BodyShort style={{ fontWeight: 'bold' }}>*/}
            {/*            <FormattedMessage id={'OmBarnetOppsummering.VedlagtTerminbekreftelse'} />*/}
            {/*        </BodyShort>*/}
            {/*        <AttachmentList attachments={dokumentasjon.vedlegg} />*/}
            {/*    </>*/}
            {/*)}*/}
        </FormSummary>
    );
};
export default OmBarnetOppsummering;
