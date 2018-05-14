import * as React from 'react';
import Bolk from '../components/layout/Bolk';
import AttachmentInput from '../components/attachment-input/AttachmentInput';

export interface VedleggChangeEvent {
    type: string;
    files: File[];
}

interface Props {
    id: string;
    vedlegg: File[];
    onAdd: (files: File[]) => void;
    onDelete: (files: File) => void;
}

const VedleggBolk: React.StatelessComponent<Props> = (props: Props) => {
    const { id, vedlegg, onAdd, onDelete } = props;
    return (
        <Bolk
            tittel="Last opp dokumentasjon på omsorgsovertakelse"
            render={() => (
                <AttachmentInput
                    id={id}
                    vedlegg={vedlegg}
                    onFilesSelect={(files: File[]) => onAdd(files)}
                    onFileDelete={(file: File) => onDelete(file)}
                />
            )}
        />
    );
};
export default VedleggBolk;
