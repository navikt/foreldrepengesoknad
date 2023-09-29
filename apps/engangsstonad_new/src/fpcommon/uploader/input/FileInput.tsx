import React, { useCallback, useRef } from 'react';
import { Button } from '@navikt/ds-react';
import { UploadIcon } from '@navikt/aksel-icons';

import './fileInput.less';

interface Props {
    buttonLabel: string;
    onFilesSelect: (files: File[]) => void;
    multiple?: boolean;
    accept: string;
}

const FileInput: React.FunctionComponent<Props> = ({ buttonLabel, multiple, accept, onFilesSelect }) => {
    const onFileSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const files = Array.from(e.target.files) as File[];
                onFilesSelect(files);
                e.target.value = '';
            }
        },
        [onFilesSelect],
    );

    const inputElement = useRef<HTMLInputElement>();

    const openFileDialog = useCallback(() => {
        if (inputElement.current) {
            inputElement.current.click();
        }
    }, [inputElement.current]);

    return (
        <>
            <input
                ref={inputElement}
                className="fileInput"
                type="file"
                accept={accept}
                onChange={(e) => onFileSelect(e)}
                multiple={multiple === true}
            />
            <Button
                className="upload_button"
                variant="primary"
                type="button"
                onClick={openFileDialog}
                icon={<UploadIcon />}
                iconPosition="right"
            >
                {buttonLabel}
            </Button>
        </>
    );
};

export default FileInput;
