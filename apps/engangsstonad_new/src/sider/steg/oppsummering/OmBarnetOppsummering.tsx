import { FormattedMessage, useIntl } from 'react-intl';
import { formatDate } from '@navikt/fp-common';
import { BodyLong, BodyShort, HStack, Label, VStack } from '@navikt/ds-react';
import AttachmentList from 'fpcommon/uploader/liste/AttachmentList';
import { notEmpty } from 'fpcommon/validering/valideringUtil';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';

interface Props {
    omBarnet: OmBarnet;
    dokumentasjon?: Dokumentasjon;
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ omBarnet, dokumentasjon }) => {
    const intl = useIntl();

    const harAdoptert = erAdopsjon(omBarnet);
    const harTermin = erBarnetIkkeFødt(omBarnet);
    const harFødt = erBarnetFødt(omBarnet);

    let antallBarnSummaryText;
    if (omBarnet.antallBarn === 1) {
        antallBarnSummaryText = intl.formatMessage({ id: 'oppsummering.omBarnet.ettBarn' });
    } else if (omBarnet.antallBarn === 2 && !harAdoptert) {
        antallBarnSummaryText = intl.formatMessage({ id: 'oppsummering.omBarnet.tvillinger' });
    } else if (omBarnet.antallBarn === 2 && harAdoptert) {
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
            {harAdoptert && (
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
                                    return formatDate(omBarnet.fødselsdatoer[index].dato);
                                })
                                .join(', ')}
                        </BodyLong>
                    </HStack>
                    <Label>
                        <FormattedMessage id={'oppsummering.text.vedlagtOmsorgsovertakelseBekreftelse'} />
                    </Label>
                    <AttachmentList attachments={notEmpty(dokumentasjon).vedlegg} />
                </>
            )}
            {harFødt && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'oppsummering.text.medFødselsdato'} />
                    </BodyShort>
                    <BodyShort>{formatDate(omBarnet.fødselsdatoer[0].dato)}</BodyShort>
                </HStack>
            )}
            {harTermin && dokumentasjon && erTerminDokumentasjon(dokumentasjon) && (
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
                        <BodyShort>{formatDate(dokumentasjon.terminbekreftelsedato)}</BodyShort>
                    </HStack>
                    <Label>
                        <FormattedMessage id={'oppsummering.text.vedlagtTerminbekreftelse'} />
                    </Label>
                    <AttachmentList attachments={dokumentasjon.vedlegg} />
                </>
            )}
        </VStack>
    );
};
export default OmBarnetOppsummering;
