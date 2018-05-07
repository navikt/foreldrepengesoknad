import * as React from 'react';
import AttachmentButton from '../attachment/AttachmentButton';
import AttachmentList from '../attachment/AttachmentList';
import LabelText from '../labeltext/LabelText';
import { ValidGroup } from '../../lib';
import { Validator } from '../../lib/types';
import { FormattedMessage } from 'react-intl';
import { bytesString, getTotalFileSize } from 'util/attachment/utils';

export interface Props {
    vedlegg: File[];
    visFilstørrelse?: boolean;
    onFilesSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
    uploadValidation: {
        name: string;
        validators: Validator[];
    };
    listValidation: {
        name: string;
        validators: Validator[];
    };
}

class AttachmentInput extends React.Component<Props> {
    render() {
        const {
            vedlegg,
            visFilstørrelse,
            onFileDelete,
            onFilesSelect,
            uploadValidation,
            listValidation
        } = this.props;

        const totalSize = getTotalFileSize(vedlegg);

        return (
            <div className="attachments">
                <div className="blokk-m">
                    <ValidGroup
                        validators={uploadValidation.validators}
                        name={uploadValidation.name}>
                        <AttachmentButton
                            id={uploadValidation.name}
                            onFileSelected={(files: File[]) => {
                                onFilesSelect(files);
                            }}
                        />
                    </ValidGroup>
                </div>
                {vedlegg.length > 0 && (
                    <ValidGroup
                        validators={listValidation.validators}
                        name={listValidation.name}>
                        <div className="blokk-xs" id={listValidation.name}>
                            <LabelText>
                                <FormattedMessage
                                    id="vedlegg.liste.tittel"
                                    values={{
                                        størrelse: bytesString(totalSize)
                                    }}
                                />
                            </LabelText>
                        </div>
                        <AttachmentList
                            vedlegg={vedlegg}
                            visFilstørrelse={visFilstørrelse}
                            onDelete={(file: File) => onFileDelete(file)}
                        />
                    </ValidGroup>
                )}
            </div>
        );
    }
}

export default AttachmentInput;
