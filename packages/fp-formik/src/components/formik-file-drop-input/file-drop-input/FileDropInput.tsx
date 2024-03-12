import { BodyShort } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { UploadIcon } from '@navikt/aksel-icons';
import { FormError } from '../../../types';
import bemUtils from '../../../utils/bemUtils';
import SkjemagruppeQuestion from '../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import './fileDropInput.scss';

interface Props {
    id: string;
    legend: string;
    description?: React.ReactNode;
    buttonLabel: string;
    acceptLabel?: string;
    rejectLabel?: string;
    name: string;
    multiple?: boolean;
    accept?: Accept;
    error?: FormError;
    onFilesSelect: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
    onClick?: () => void;
}

const bem = bemUtils('fileDropInput');

const FileDropInput: React.FunctionComponent<Props> = (props) => {
    const { id, name, buttonLabel, error, description, multiple, legend, rejectLabel, acceptLabel, accept } = props;
    const inputId = `${id}-input`;

    const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        props.onFilesSelect(acceptedFiles, rejectedFiles);
    };

    const { getRootProps, getInputProps, isFocused, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept,
        multiple,
        onDrop,
    });

    const className = useMemo(
        () => `${bem.block}
            ${bem.modifierConditional('withError', error !== undefined) || ''}
            ${bem.modifierConditional('dragActive', isDragActive) || ''}
            ${bem.modifierConditional('dragAccept', isDragAccept) || ''}
            ${bem.modifierConditional('dragReject', isDragReject) || ''}
            ${bem.modifierConditional('focused', isFocused) || ''}`,
        [isDragActive, isDragAccept, isDragReject, error, isFocused],
    );

    const getLabel = () => {
        if (rejectLabel && isDragActive && isDragReject) {
            return rejectLabel;
        }
        if (acceptLabel && isDragActive && isDragAccept) {
            return acceptLabel;
        }

        return buttonLabel;
    };
    return (
        <SkjemagruppeQuestion error={error} legend={legend} description={description}>
            <div {...getRootProps({ className })} role="button">
                <div className={bem.element('icon')}>
                    <UploadIcon role="presentation" />
                </div>
                <BodyShort as="div" className={bem.element('label')}>
                    {getLabel()}
                </BodyShort>

                <input id={inputId} name={name} {...getInputProps()} />
            </div>
        </SkjemagruppeQuestion>
    );
};

export default FileDropInput;
