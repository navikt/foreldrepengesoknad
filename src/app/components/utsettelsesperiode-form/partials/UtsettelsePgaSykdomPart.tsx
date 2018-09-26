import * as React from 'react';
import { UtsettelseSykdomÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import Block from 'common/components/block/Block';
import FlervalgSpørsmål, { FlervalgAlternativ } from '../../flervalg-spørsmål/FlervalgSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl, injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';

export interface OwnProps {
    forelder: Forelder;
    sykdomsårsak?: UtsettelseSykdomÅrsakType;
    vedlegg: Attachment[];
    onChange: (payload: { sykdomsårsak?: UtsettelseSykdomÅrsakType; vedlegg?: Attachment[] }) => void;
}

const getSykdomAlternativ = (intl: InjectedIntl, årsak: UtsettelseSykdomÅrsakType): FlervalgAlternativ => {
    return {
        label: getMessage(intl, `utsettelse.sykdom.alternativ.${årsak}`),
        value: årsak
    };
};

type Props = OwnProps & InjectedIntlProps;

class UtsettelsePgaSykdomPart extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleSykdomÅrsakChange = this.handleSykdomÅrsakChange.bind(this);
    }

    updateVedleggList(vedlegg: Attachment[]) {
        this.props.onChange({ vedlegg });
    }

    updateVedleggItem(vedlegg: Attachment) {
        this.props.onChange({ vedlegg: [...this.props.vedlegg.filter((v) => v.id !== vedlegg.id), ...[vedlegg]] });
    }

    handleSykdomÅrsakChange(sykdomsårsak: UtsettelseSykdomÅrsakType) {
        this.props.onChange({ sykdomsårsak });
    }

    render() {
        const { intl, sykdomsårsak } = this.props;
        const vedleggList = [...this.props.vedlegg];
        return (
            <>
                <Block>
                    <FlervalgSpørsmål
                        navn="utsttelsePgaSykdomÅrsak"
                        spørsmål={getMessage(intl, 'utsettelse.sykdom.alternativer.spørsmål')}
                        valgtVerdi={sykdomsårsak}
                        onChange={(årsak: UtsettelseSykdomÅrsakType) => this.handleSykdomÅrsakChange(årsak)}
                        toKolonner={true}
                        alternativer={[
                            getSykdomAlternativ(intl, UtsettelseSykdomÅrsakType.Sykdom),
                            getSykdomAlternativ(intl, UtsettelseSykdomÅrsakType.InstitusjonSøker),
                            getSykdomAlternativ(intl, UtsettelseSykdomÅrsakType.InstitusjonBarnet)
                        ]}
                    />
                </Block>
                <Block visible={sykdomsårsak !== undefined}>
                    <Veilederinfo>
                        <FormattedMessage id="utsettelse.sykdom.vedlegg.info" />
                    </Veilederinfo>
                    <AttachmentsUploader
                        attachments={vedleggList}
                        onFilesUploadStart={(attachments: Attachment[]) => {
                            this.updateVedleggList([...(vedleggList || []), ...attachments]);
                        }}
                        onFileUploadFinish={(vedlegg: Attachment) => this.updateVedleggItem(vedlegg)}
                        onFileDeleteStart={(vedlegg: Attachment) => {
                            this.updateVedleggItem(vedlegg);
                        }}
                        onFileDeleteFinish={(vedlegg: Attachment) => {
                            const index = vedleggList.indexOf(vedlegg);
                            vedleggList.splice(index, 1);
                            this.updateVedleggList(vedleggList);
                        }}
                        attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
                        skjemanummer={Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM}
                    />
                </Block>
            </>
        );
    }
}
export default injectIntl(UtsettelsePgaSykdomPart);
