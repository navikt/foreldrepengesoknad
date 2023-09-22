import { FormattedMessage, useIntl } from 'react-intl';
import { formatDate } from '@navikt/fp-common';
import { BodyLong, BodyShort, HStack, Label, VStack } from '@navikt/ds-react';
import { FormValues as OmBarnetFormValues } from '../omBarnet/OmBarnetForm';
import AttachmentList from 'fpcommon/uploader/liste/AttachmentList';
import { isAttachmentWithError } from 'fpcommon/uploader/fileUtils';

interface Props {
    barn: OmBarnetFormValues;
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ barn }) => {
    const intl = useIntl();

    let antallBarnSummaryText;
    if (barn.antallBarn === 1) {
        antallBarnSummaryText = intl.formatMessage({ id: 'oppsummering.omBarnet.ettBarn' });
    } else if (barn.antallBarn === 2 && barn.adopsjonAvEktefellesBarn === undefined) {
        antallBarnSummaryText = intl.formatMessage({ id: 'oppsummering.omBarnet.tvillinger' });
    } else if (barn.antallBarn === 2 && barn.adopsjonAvEktefellesBarn !== undefined) {
        antallBarnSummaryText = intl.formatMessage({ id: 'oppsummering.omBarnet.toBarn' });
    } else {
        antallBarnSummaryText = intl.formatMessage(
            { id: 'oppsummering.omBarnet.flereBarn' },
            {
                antall: barn.antallBarn,
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
            {barn.adopsjonAvEktefellesBarn !== undefined && (
                <>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'oppsummering.text.medAdopsjonsdato'} />
                        </BodyShort>
                        <BodyShort>{formatDate(barn.adopsjonsdato!)}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage
                                id={
                                    barn.fødselsdatoer.length > 1
                                        ? intl.formatMessage({ id: 'oppsummering.text.medFødselsdatoer' })
                                        : intl.formatMessage({ id: 'oppsummering.text.medFødselsdato' })
                                }
                            />
                        </BodyShort>
                        <BodyLong>
                            {barn.fødselsdatoer
                                .map((_, index) => {
                                    return formatDate(barn.fødselsdatoer[index]);
                                })
                                .join(', ')}
                        </BodyLong>
                    </HStack>
                </>
            )}
            {barn.adopsjonAvEktefellesBarn !== undefined && (
                <>
                    <Label>
                        <FormattedMessage id={'oppsummering.text.vedlagtOmsorgsovertakelseBekreftelse'} />
                    </Label>
                    <AttachmentList attachments={barn.vedlegg.filter((a) => !isAttachmentWithError(a))} />
                </>
            )}
            {barn.erBarnetFødt && barn.fødselsdatoer && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.medFødselsdato'} />
                    </BodyShort>
                    <BodyShort>{formatDate(barn.fødselsdatoer[0])}</BodyShort>
                </HStack>
            )}
            {barn.erBarnetFødt === false && barn.termindato && barn.terminbekreftelsedato && (
                <>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'oppsummering.text.medTermindato'} />
                        </BodyShort>
                        <BodyShort>{formatDate(barn.termindato)}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'oppsummering.text.somErDatert'} />
                        </BodyShort>
                        <BodyShort>{formatDate(barn.terminbekreftelsedato)}</BodyShort>
                    </HStack>
                    <>
                        <Label>
                            <FormattedMessage id={'oppsummering.text.vedlagtTerminbekreftelse'} />
                        </Label>
                        <AttachmentList attachments={barn.vedlegg.filter((a) => !isAttachmentWithError(a))} />
                    </>
                </>
            )}
        </VStack>
    );
};
export default OmBarnetOppsummering;
