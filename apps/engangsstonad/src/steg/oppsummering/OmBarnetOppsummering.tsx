import { FormattedMessage, useIntl } from 'react-intl';
import Dokumentasjon, { erTerminDokumentasjon } from 'types/Dokumentasjon';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';

import { BodyLong, BodyShort, HStack, VStack } from '@navikt/ds-react';

import { AttachmentList } from '@navikt/fp-ui';
import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

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
        <VStack gap="4">
            <HStack gap="2">
                <BodyShort>
                    <FormattedMessage id={'OmBarnetOppsummering.SoknadenGjelder'} />
                </BodyShort>
                <BodyShort>{antallBarnSummaryText}</BodyShort>
            </HStack>
            {harAdoptert && (
                <>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'OmBarnetOppsummering.MedAdopsjonsdato'} />
                        </BodyShort>
                        <BodyShort>{formatDate(omBarnet.adopsjonsdato)}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort>
                            {omBarnet.fødselsdatoer.length > 1
                                ? intl.formatMessage({ id: 'OmBarnetOppsummering.MedFødselsdatoer' })
                                : intl.formatMessage({ id: 'OmBarnetOppsummering.MedFødselsdato' })}
                        </BodyShort>
                        <BodyLong>
                            {omBarnet.fødselsdatoer
                                .map((_, index) => {
                                    return formatDate(omBarnet.fødselsdatoer[index].dato);
                                })
                                .join(', ')}
                        </BodyLong>
                    </HStack>
                    <BodyShort style={{ fontWeight: 'bold' }}>
                        <FormattedMessage id={'OmBarnetOppsummering.VedlagtOmsorgsovertakelseBekreftelse'} />
                    </BodyShort>
                    <AttachmentList attachments={notEmpty(dokumentasjon).vedlegg} />
                </>
            )}
            {harFødt && (
                <HStack gap="2">
                    <BodyShort>
                        <FormattedMessage id={'OmBarnetOppsummering.MedFødselsdato'} />
                    </BodyShort>
                    <BodyShort>{formatDate(omBarnet.fødselsdato)}</BodyShort>
                </HStack>
            )}
            {harTermin && dokumentasjon && erTerminDokumentasjon(dokumentasjon) && (
                <>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'OmBarnetOppsummering.MedTermindato'} />
                        </BodyShort>
                        <BodyShort>{formatDate(omBarnet.termindato)}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort>
                            <FormattedMessage id={'OmBarnetOppsummering.SomErDatert'} />
                        </BodyShort>
                        <BodyShort>{formatDate(dokumentasjon.terminbekreftelsedato)}</BodyShort>
                    </HStack>
                    <BodyShort style={{ fontWeight: 'bold' }}>
                        <FormattedMessage id={'OmBarnetOppsummering.VedlagtTerminbekreftelse'} />
                    </BodyShort>
                    <AttachmentList attachments={dokumentasjon.vedlegg} />
                </>
            )}
        </VStack>
    );
};
export default OmBarnetOppsummering;
