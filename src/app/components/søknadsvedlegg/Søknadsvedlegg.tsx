import * as React from 'react';
import AttachmentUploader from 'storage/attachment/connected-components/attachment-uploader/AttachmentUploader';
import { SøknadsvedleggType } from '../../types/søknad/Søknad';

export interface Props {
    type: SøknadsvedleggType;
}

const Søknadsvedlegg: React.StatelessComponent<Props> = ({ type }) => (
    <AttachmentUploader group={type} />
);

export default Søknadsvedlegg;
