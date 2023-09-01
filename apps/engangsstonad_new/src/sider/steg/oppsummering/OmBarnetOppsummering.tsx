import { useIntl } from 'react-intl';
import { Block, DisplayTextWithLabel, formatDate, guid } from '@navikt/fp-common';
import { BodyLong, Label } from '@navikt/ds-react';
import { FormValues as OmBarnetFormValues } from '../omBarnet/OmBarnetForm';

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
        <div>
            <Block padBottom="l">
                <DisplayTextWithLabel
                    label={intl.formatMessage({ id: 'oppsummering.text.soknadenGjelder' })}
                    text={antallBarnSummaryText}
                />
            </Block>
            {barn.adopsjonAvEktefellesBarn !== undefined && (
                <div>
                    <Block padBottom="l">
                        <DisplayTextWithLabel
                            label={intl.formatMessage({ id: 'oppsummering.text.medAdopsjonsdato' })}
                            text={formatDate(barn.adopsjonsdato!)}
                        />
                    </Block>
                    <Block padBottom="l">
                        <Label className="textWithLabel__label">
                            {barn.fødselsdatoer.length > 1
                                ? intl.formatMessage({ id: 'oppsummering.text.medFødselsdatoer' })
                                : intl.formatMessage({ id: 'oppsummering.text.medFødselsdato' })}
                        </Label>
                        {barn.fødselsdatoer.map((_, index) => {
                            return (
                                <Block padBottom="s" key={guid()}>
                                    <BodyLong>{formatDate(barn.fødselsdatoer[index])}</BodyLong>
                                </Block>
                            );
                        })}
                    </Block>
                </div>
            )}
            {barn.adopsjonAvEktefellesBarn !== undefined && (
                <Block padBottom="l" className="oppsummering__attachments">
                    <Label className="textWithLabel__label">
                        {intl.formatMessage({ id: 'oppsummering.text.vedlagtOmsorgsovertakelseBekreftelse' })}
                    </Label>
                    {/*<AttachmentList
                        attachments={barn.omsorgsovertakelse.filter((a: Attachment) => !isAttachmentWithError(a))}
            />*/}
                </Block>
            )}
            {barn.erBarnetFødt && (
                <Block padBottom="l">
                    <DisplayTextWithLabel
                        label={intl.formatMessage({ id: 'oppsummering.text.medFødselsdato' })}
                        text={formatDate(barn.fødselsdatoer[0])}
                    />
                </Block>
            )}
            {barn.erBarnetFødt === false && barn.termindato && barn.terminbekreftelsedato && (
                <div>
                    <Block padBottom="l">
                        <DisplayTextWithLabel
                            label={intl.formatMessage({ id: 'oppsummering.text.medTermindato' })}
                            text={formatDate(barn.termindato)}
                        />
                    </Block>
                    <Block padBottom="l" className="oppsummering__attachments">
                        <Label className="textWithLabel__label">
                            {intl.formatMessage({ id: 'oppsummering.text.vedlagtTerminbekreftelse' })}
                        </Label>
                        {/*<AttachmentList
                            attachments={barn.terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a))}
            />*/}
                    </Block>
                    <Block padBottom="l">
                        <DisplayTextWithLabel
                            label={intl.formatMessage({ id: 'oppsummering.text.somErDatert' })}
                            text={formatDate(barn.terminbekreftelsedato)}
                        />
                    </Block>
                </div>
            )}
        </div>
    );
};
export default OmBarnetOppsummering;
