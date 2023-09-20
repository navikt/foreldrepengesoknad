import React, { useCallback } from 'react';
import UploadSvg from './UploadSvg';
import SkjemagruppeQuestion from './SkjemagruppeQuestion';

import './fileInput.less';

interface Props {
    id: string;
    legend: string;
    description?: React.ReactNode;
    buttonLabel: string;
    onFilesSelect: (files: File[]) => void;
    multiple?: boolean;
    accept: string;
    error?: React.ReactNode | boolean;
    onClick?: () => void;
}

const FileInput: React.FunctionComponent<Props> = ({
    id,
    buttonLabel,
    error,
    description,
    multiple,
    legend,
    onClick,
    accept,
    onFilesSelect,
}) => {
    const fileSelectHandler = (fileList: FileList) => {
        const files = Array.from(fileList) as File[];
        onFilesSelect(files);
    };

    const onFileDragOverHandler = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    }, []);

    const onFileDropHandler = useCallback(
        (e: React.DragEvent<HTMLLabelElement>) => {
            e.preventDefault();
            fileSelectHandler(e.dataTransfer.files);
        },
        [onFilesSelect],
    );

    const onFileSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                fileSelectHandler(e.target.files);
                e.target.value = '';
            }
        },
        [onFilesSelect],
    );

    const onKeyPress = useCallback((e: React.KeyboardEvent<HTMLLabelElement>) => {
        const ENTER_KEYCODE = 13;
        const inputElement = document.getElementById(id);
        if (e.which === ENTER_KEYCODE && inputElement !== null) {
            inputElement.click();
        }
    }, []);

    const inputId = `${id}-input`;

    return (
        <SkjemagruppeQuestion
            error={error}
            legend={legend}
            description={description}
            className={`fileInput ${error !== undefined ? 'fileInput--withError' : ''}`}
        >
            <label
                role="button" // eslint-disable-line
                id={id}
                tabIndex={0}
                htmlFor={inputId}
                className="attachmentButton"
                onDragOver={onFileDragOverHandler}
                onDrop={onFileDropHandler}
                onKeyPress={onKeyPress}
                onClick={onClick}
            >
                <div className="attachmentButton__icon">
                    <UploadSvg />
                </div>
                <span className="attachmentButton__label">{buttonLabel}</span>
                <input
                    id={inputId}
                    type="file"
                    accept={accept}
                    onChange={(e) => onFileSelect(e)}
                    multiple={multiple === true}
                />
            </label>
        </SkjemagruppeQuestion>
    );
};

export default FileInput;
