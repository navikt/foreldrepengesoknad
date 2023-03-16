import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import CustomSVG from 'common/components/custom-svg/CustomSVG';
import BEMHelper from 'common/util/bem';

const uploadIcon = require('./upload.svg').default;

import './attachment.less';

interface AttachmentInputProps {
    id: string;
    onFilesSelect: (files: File[]) => void;
    onClick: () => void;
}

type Props = AttachmentInputProps;

const AttachmentInput: React.FunctionComponent<Props> = ({ id, onFilesSelect, onClick }) => {
    const intl = useIntl();
    const inputId = `${id}-input`;
    const BEM = BEMHelper('attachmentButton');

    const isFileExtensionValid = (filename: string): boolean => {
        const validExtensions = ['pdf', 'jpeg', 'jpg', 'png'];
        const extension = filename.split('.').pop();
        if (extension) {
            return validExtensions.includes(extension.toLowerCase());
        }
        return false;
    };

    const getValidFiles = (files: File[]): File[] => {
        return files.filter((file: File) => {
            return isFileExtensionValid(file.name);
        });
    };

    const fileSelectHandler = (fileList: FileList) => {
        const files = Array.from(fileList) as File[];
        const validFiles = getValidFiles(files);
        if (validFiles.length > 0) {
            onFilesSelect(validFiles);
        }
    };

    const onFileDragOverHandler = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };

    const onFileDropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        fileSelectHandler(e.dataTransfer.files);
    };

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            fileSelectHandler(e.target.files);
            e.target.value = '';
        }
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
        const ENTER_KEYCODE = 13;
        const inputElement = document.getElementById(id);
        if (e.which === ENTER_KEYCODE && inputElement !== null) {
            inputElement.click();
        }
    };

    return (
        <label
            role="button"
            aria-label={intl.formatMessage({
                id: 'vedlegg.lastoppknapp.arialabel',
            })}
            id={id}
            tabIndex={0}
            htmlFor={inputId}
            className={BEM.className}
            onDragOver={(e) => onFileDragOverHandler(e)}
            onDrop={(e) => onFileDropHandler(e)}
            onKeyPress={(e) => onKeyPress(e)}
        >
            <div className={BEM.element('icon')}>
                <CustomSVG iconRef={uploadIcon} size={22} />
            </div>
            <Element className={BEM.element('label')}>
                <FormattedMessage id="vedlegg.lastoppknapp.label" />
            </Element>
            <input
                id={inputId}
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={(e) => onFileSelect(e)}
                multiple={false}
                onClick={onClick}
            />
        </label>
    );
};
export default AttachmentInput;
