import * as React from 'react';
import { UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import Block from 'common/components/block/Block';
import FlervalgSpørsmål, { FlervalgAlternativ } from '../../flervalg-spørsmål/FlervalgSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl, injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import VedleggSpørsmål from '../../vedlegg-spørsmål/VedleggSpørsmål';
import { handleDuplicates } from 'common/storage/attachment/components/util';

export interface UtsettelsePgaSykdomChangePayload {
    sykdomsårsak: UtsettelseÅrsakType;
    vedlegg: Attachment[];
}

export interface OwnProps {
    forelder: Forelder;
    sykdomsårsak?: UtsettelseÅrsakType;
    vedlegg: Attachment[];
    onChange: (payload: UtsettelsePgaSykdomChangePayload) => void;
}

export const visVedlegg = (sykdomsårsak?: UtsettelseÅrsakType) => sykdomsårsak !== undefined;

const getSykdomAlternativ = (intl: InjectedIntl, årsak: UtsettelseÅrsakType): FlervalgAlternativ => {
    return {
        label: getMessage(intl, `utsettelse.sykdom.alternativ.${årsak}`),
        value: årsak
    };
};

const getSykdomVeilederInfo = (sykdomsårsak: UtsettelseÅrsakType) => {
    if (sykdomsårsak === UtsettelseÅrsakType.Sykdom) {
        return <FormattedMessage id="utsettelse.sykdom.vedlegg.info.sykdom" />;
    } else if (sykdomsårsak === UtsettelseÅrsakType.InstitusjonBarnet) {
        return <FormattedMessage id="utsettelse.sykdom.vedlegg.info.barnInnlagt" />;
    } else {
        return <FormattedMessage id="utsettelse.sykdom.vedlegg.info.innlagt" />;
    }
};

type Props = OwnProps & InjectedIntlProps;

class UtsettelsePgaSykdomPart extends React.Component<Props> {
    getAttachmentSkjemanummer() {
        const { sykdomsårsak } = this.props;
        switch (sykdomsårsak) {
            case UtsettelseÅrsakType.Sykdom:
                return Skjemanummer.DOK_OVERFØRING_FOR_SYK;
            case UtsettelseÅrsakType.InstitusjonSøker:
            case UtsettelseÅrsakType.InstitusjonBarnet:
                return Skjemanummer.DOK_INNLEGGELSE;
            default:
                return Skjemanummer.ANNET;
        }
    }

    render() {
        const { onChange, intl, sykdomsårsak, vedlegg } = this.props;
        const vedleggList = [...vedlegg];
        return (
            <>
                <Block>
                    <FlervalgSpørsmål
                        navn="utsttelsePgaSykdomÅrsak"
                        spørsmål={getMessage(intl, 'utsettelse.sykdom.alternativer.spørsmål')}
                        valgtVerdi={sykdomsårsak}
                        onChange={(årsak: UtsettelseÅrsakType) =>
                            onChange({ sykdomsårsak: årsak, vedlegg: vedleggList })
                        }
                        toKolonner={true}
                        alternativer={[
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.Sykdom),
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.InstitusjonSøker),
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.InstitusjonBarnet)
                        ]}
                    />
                </Block>
                {visVedlegg(sykdomsårsak) && (
                    <Block>
                        <Veilederinfo>{getSykdomVeilederInfo(sykdomsårsak!)}</Veilederinfo>
                        <VedleggSpørsmål
                            vedlegg={
                                vedlegg !== undefined
                                    ? (vedlegg as Attachment[]).filter(
                                          (a: Attachment) => a.type === AttachmentType.UTSETTELSE_SYKDOM
                                      )
                                    : []
                            }
                            attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
                            skjemanummer={this.getAttachmentSkjemanummer()}
                            onChange={(v: Attachment[]) =>
                                onChange({ vedlegg: handleDuplicates(vedlegg, v), sykdomsårsak: sykdomsårsak! })
                            }
                        />
                    </Block>
                )}
            </>
        );
    }
}
export default injectIntl(UtsettelsePgaSykdomPart);
