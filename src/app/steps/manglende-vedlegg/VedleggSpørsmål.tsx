import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import AttachmentsUploader from './AttachmentUploader';

interface OwnProps {
    vedlegg?: Attachment[];
    attachmentType: AttachmentType;
    onChange: (vedlegg: Attachment[]) => void;
    skjemanummer: Skjemanummer;
    intl: IntlShape;
}

type Props = OwnProps;

class VedleggSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.updateVedleggList = this.updateVedleggList.bind(this);
        this.updateVedleggItem = this.updateVedleggItem.bind(this);
        this.deleteVedleggItem = this.deleteVedleggItem.bind(this);
    }

    updateVedleggItem(vedleggItem: Attachment) {
        const { vedlegg } = this.props;
        let vedleggList: Attachment[] = vedlegg || [];
        const index = vedleggList.indexOf(vedleggItem);
        if (index >= 0) {
            vedleggList[index] = vedleggItem;
        } else {
            vedleggList = [vedleggItem];
        }
        this.updateVedleggList(vedleggList);
    }

    deleteVedleggItem(vedleggItem: Attachment) {
        const { vedlegg } = this.props;
        const vedleggList: Attachment[] = vedlegg || [];
        const index = vedleggList.indexOf(vedleggItem);
        vedleggList.splice(index, 1);
        this.updateVedleggList(vedleggList);
    }

    updateVedleggList(vedlegg: Attachment[]) {
        this.props.onChange(vedlegg);
    }

    render() {
        const { vedlegg, skjemanummer, attachmentType } = this.props;
        return (
            <AttachmentsUploader
                attachments={vedlegg ? vedlegg.filter((a: Attachment) => a.type === attachmentType) : []}
                onFilesUploadStart={(nyeVedlegg) => {
                    this.updateVedleggList([...(vedlegg || []), ...nyeVedlegg]);
                }}
                onFileUploadFinish={this.updateVedleggItem}
                onFileDelete={this.deleteVedleggItem}
                attachmentType={attachmentType}
                skjemanummer={skjemanummer}
            />
        );
    }
}

export default injectIntl(VedleggSpørsmål);
