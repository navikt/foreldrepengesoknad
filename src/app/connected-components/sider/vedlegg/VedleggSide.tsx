import * as React from 'react';
import Applikasjonsside from '../Applikasjonsside';
import DocumentTitle from 'react-document-title';
import { DispatchProps } from 'common/redux/types';
import Søknadsvedlegg from '../../../types/søknad/Søknadsvedlegg';
import AttachmentUploader from 'storage/attachment/connected-components/attachment-uploader/AttachmentUploader';

export interface StateProps {
    vedlegg: Søknadsvedlegg;
}

export type Props = StateProps & DispatchProps;

class VedleggSide extends React.Component<Props, {}> {
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
