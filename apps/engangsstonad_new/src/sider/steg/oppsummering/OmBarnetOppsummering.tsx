import { FormattedMessage, useIntl } from 'react-intl';
import { formatDate } from '@navikt/fp-common';
import { BodyLong, BodyShort, HStack, Label, VStack } from '@navikt/ds-react';
import AttachmentList from 'fpcommon/uploader/liste/AttachmentList';
import { isAttachmentWithError } from 'fpcommon/uploader/fileUtils';
import { OmBarnet } from 'types/OmBarnet';

interface Props {
    omBarnet: OmBarnet;
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ omBarnet }) => {
    const intl = useIntl();

    let antallBarnSummaryText;
    if (omBarnet.antallBarn === 1) {
        antallBarnSummaryText = intl.formatMessage({ id: 'oppsummering.omBarnet.ettBarn' });
    } else if (omBarnet.antallBarn === 2 && omBarnet.adopsjonAvEktefellesBarn === undefined) {
        antallBarnSummaryText = intl.formatMessage({ id: 'oppsummering.omBarnet.tvillinger' });
    } else if (omBarnet.antallBarn === 2 && omBarnet.adopsjonAvEktefellesBarn !== undefined) {
        antallBarnSummaryText = intl.formatMessage({ id: 'oppsummering.omBarnet.toBarn' });
    } else {
        antallBarnSummaryText = intl.formatMessage(
            { id: 'oppsummering.omBarnet.flereBarn' },
            {
                antall: omBarnet.antallBarn,
            },
        );
    }

    return (
        <VStack gap="4">
            <HStack gap="2">
                <BodyShort>
                    <FormattedMessage id={'oppsummering.text.soknadenGjelder'} />
                </BodyShort>
                <BodyShort>{antallBarnSummaryText}</BodyShort>
            </HStack>
            {omBarnet.adopsjonAvEktefellesBarn !== undefined && (
                <>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'oppsummering.text.medAdopsjonsdato'} />
                        </BodyShort>
                        <BodyShort>{formatDate(omBarnet.adopsjonsdato!)}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage
                                id={
                                    omBarnet.fødselsdatoer.length > 1
                                        ? intl.formatMessage({ id: 'oppsummering.text.medFødselsdatoer' })
                                        : intl.formatMessage({ id: 'oppsummering.text.medFødselsdato' })
                                }
                            />
                        </BodyShort>
                        <BodyLong>
                            {omBarnet.fødselsdatoer
                                .map((_, index) => {
                                    return formatDate(omBarnet.fødselsdatoer[index]);
                                })
                                .join(', ')}
                        </BodyLong>
                    </HStack>
                </>
            )}
            {omBarnet.adopsjonAvEktefellesBarn !== undefined && (
                <>
                    <Label>
                        <FormattedMessage id={'oppsummering.text.vedlagtOmsorgsovertakelseBekreftelse'} />
                    </Label>
                    <AttachmentList attachments={omBarnet.vedlegg.filter((a) => !isAttachmentWithError(a))} />
                </>
            )}
            {omBarnet.erBarnetFødt && omBarnet.fødselsdatoer && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.medFødselsdato'} />
                    </BodyShort>
                    <BodyShort>{formatDate(omBarnet.fødselsdatoer[0])}</BodyShort>
                </HStack>
            )}
            {omBarnet.erBarnetFødt === false && omBarnet.termindato && omBarnet.terminbekreftelsedato && (
                <>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'oppsummering.text.medTermindato'} />
                        </BodyShort>
                        <BodyShort>{formatDate(omBarnet.termindato)}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'oppsummering.text.somErDatert'} />
                        </BodyShort>
                        <BodyShort>{formatDate(omBarnet.terminbekreftelsedato)}</BodyShort>
                    </HStack>
                    <>
                        <Label>
                            <FormattedMessage id={'oppsummering.text.vedlagtTerminbekreftelse'} />
                        </Label>
                        <AttachmentList attachments={omBarnet.vedlegg.filter((a) => !isAttachmentWithError(a))} />
                    </>
                </>
            )}
        </VStack>
    );
};
export default OmBarnetOppsummering;
