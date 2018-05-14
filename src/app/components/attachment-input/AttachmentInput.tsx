import * as React from 'react';
import AttachmentButton from '../attachment/AttachmentButton';
import AttachmentList from '../attachment/AttachmentList';
import LabelText from '../labeltekst/Labeltekst';
import { FormattedMessage } from 'react-intl';
import { bytesString, getTotalFileSize } from '../../util/attachment';

export interface AttachmentInputProps {
    id: string;
    vedlegg: File[];
    visFilstørrelse?: boolean;
    onFilesSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
}

class AttachmentInput extends React.Component<AttachmentInputProps> {
    render() {
        const {
            id,
            vedlegg,
            visFilstørrelse,
            onFileDelete,
            onFilesSelect
        } = this.props;

        return (
            <div className="attachments">
                <div className="blokk-m">
                    <AttachmentButton
                        id={id}
                        onFileSelected={(files: File[]) => {
                            onFilesSelect(files);
                        }}
                    />
                </div>
                {vedlegg.length > 0 && (
                    <div>
                        <div className="blokk-xs" id={id}>
                            <LabelText>
                                <FormattedMessage
                                    id="vedlegg.liste.tittel"
                                    values={{
                                        størrelse: bytesString(
                                            getTotalFileSize(vedlegg)
                                        )
                                    }}
                                />
                            </LabelText>
                        </div>
                        <AttachmentList
                            vedlegg={vedlegg}
                            visFilstørrelse={visFilstørrelse}
                            onDelete={(file: File) => onFileDelete(file)}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default AttachmentInput;
