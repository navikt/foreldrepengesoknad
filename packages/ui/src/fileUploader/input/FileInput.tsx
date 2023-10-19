import React, { useCallback, useRef } from 'react';
import { Button } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { UploadIcon } from '@navikt/aksel-icons';

import './fileInput.less';

interface Props {
    onFilesSelect: (files: File[]) => void;
    multiple?: boolean;
    accept: string;
    hasUplodedAttachements: boolean;
}

const FileInput: React.FunctionComponent<Props> = ({ multiple, accept, onFilesSelect, hasUplodedAttachements }) => {
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

    const inputElement = useRef<HTMLInputElement>(null);

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
                data-testid="file-upload"
            />
            <Button
                className="upload_button"
                variant={hasUplodedAttachements ? 'secondary' : 'primary'}
                type="button"
                onClick={openFileDialog}
                icon={<UploadIcon />}
                iconPosition="right"
            >
                <FormattedMessage
                    id={
                        hasUplodedAttachements
                            ? 'FileInput.Vedlegg.Lastoppknapp.Flere'
                            : 'FileInput.Vedlegg.Lastoppknapp'
                    }
                />
            </Button>
        </>
    );
};

export default FileInput;
