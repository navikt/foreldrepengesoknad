import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { useIntl } from 'react-intl';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import getMessage from 'common/util/i18nUtils';
import { OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Block, DisplayTextWithLabel, formatDate } from '@navikt/fp-common';
import { BodyShort, Label } from '@navikt/ds-react';

interface Props {
    barn: OmBarnetFormData;
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ barn }) => {
    const intl = useIntl();

    let antallBarnSummaryText;
    if (barn.antallBarn === '1') {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.omBarnet.ettBarn');
    } else if (barn.antallBarn === '2' && barn.adopsjonAvEktefellesBarn === YesOrNo.UNANSWERED) {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.omBarnet.tvillinger');
    } else if (barn.antallBarn === '2' && barn.adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED) {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.omBarnet.toBarn');
    } else {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.omBarnet.flereBarn', {
            antall: barn.antallBarn,
        });
    }

    return (
        <div>
            <Block padBottom="l">
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.soknadenGjelder')}
                    text={antallBarnSummaryText}
                />
            </Block>
            {barn.adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED && (
                <div>
                    <Block padBottom="l">
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.medAdopsjonsdato')}
                            text={formatDate(barn.adopsjonsdato!)}
                        />
                    </Block>
                    <Block>
                        <Label className="textWithLabel__label">
                            {barn.fødselsdatoer.length > 1
                                ? getMessage(intl, 'oppsummering.text.medFødselsdatoer')
                                : getMessage(intl, 'oppsummering.text.medFødselsdato')}
                        </Label>
                    </Block>
                    <Block margin="l">
                        {barn.fødselsdatoer.map((_, index) => {
                            return (
                                <div key={index}>
                                    <BodyShort>{formatDate(barn.fødselsdatoer![index])}</BodyShort>
                                    <br />
                                </div>
                            );
                        })}
                    </Block>
                </div>
            )}
            {barn.adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED && (
                <Block padBottom="l" className="oppsummering__attachments">
                    <Label className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.vedlagtOmsorgsovertakelseBekreftelse')}
                    </Label>
                    <AttachmentList
                        attachments={barn.omsorgsovertakelse.filter((a: Attachment) => !isAttachmentWithError(a))}
                    />
                </Block>
            )}
            {barn.erBarnetFødt === YesOrNo.YES && (
                <Block padBottom="l">
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.medFødselsdato')}
                        text={formatDate(barn.fødselsdatoer[0])}
                    />
                </Block>
            )}
            {barn.erBarnetFødt === YesOrNo.NO && barn.termindato && barn.terminbekreftelsedato && (
                <div>
                    <Block padBottom="l">
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.medTermindato')}
                            text={formatDate(barn.termindato)}
                        />
                    </Block>
                    <Block padBottom="l" className="oppsummering__attachments">
                        <Label className="textWithLabel__label">
                            {getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                        </Label>
                        <AttachmentList
                            attachments={barn.terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a))}
                        />
                    </Block>
                    <Block padBottom="l">
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.somErDatert')}
                            text={formatDate(barn.terminbekreftelsedato)}
                        />
                    </Block>
                </div>
            )}
        </div>
    );
};
export default OmBarnetOppsummering;
