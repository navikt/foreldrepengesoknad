import * as React from 'react';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import AttachmentUploader from 'common/storage/attachment/connected-components/attachment-uploader/AttachmentUploader';

class VedleggSide extends React.Component<{}, {}> {
    render() {
        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Vedlegg" />
                <div className="blokk-m">
                    <h2>Adopsjonsvedtak</h2>
                    <AttachmentUploader group="adopsjonsvedtak" />
                </div>
                <div className="blokk-m">
                    <h2>Fødselsattest</h2>
                    <AttachmentUploader group="fødselsattest" />
                </div>
            </Applikasjonsside>
        );
    }
}

export default VedleggSide;
