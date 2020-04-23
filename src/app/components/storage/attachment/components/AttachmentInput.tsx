import * as React from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import CustomSVG from 'common/components/customSvg/CustomSVG';
import BEMHelper from 'common/util/bem';

const uploadIcon = require('./upload.svg').default;
import { AttachmentType } from '../types/AttachmentType';

import './attachment.less';

interface AttachmentInputProps {
    id: string;
    onFilesSelect: (files: File[]) => void;
    onClick: () => void;
    attachmentType: AttachmentType;
    intl: IntlShape;
}

type Props = AttachmentInputProps;

class AttachmentInput extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.isFileExtensionValid = this.isFileExtensionValid.bind(this);
        this.onFileDropHandler = this.onFileDropHandler.bind(this);
        this.onFileDragOverHandler = this.onFileDragOverHandler.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    isFileExtensionValid(filename: string): boolean {
        const validExtensions = ['pdf', 'jpeg', 'jpg', 'png'];
        const extension = filename.split('.').pop();
        if (extension) {
            return validExtensions.includes(extension.toLowerCase());
        }
        return false;
    }

    getValidFiles(files: File[]): File[] {
        return files.filter((file: File) => {
            return this.isFileExtensionValid(file.name);
        });
    }

    fileSelectHandler(fileList: FileList) {
        const validFiles = this.getValidFiles(Array.from(fileList));
        if (validFiles.length > 0) {
            this.props.onFilesSelect(validFiles);
        }
    }

    onFileDragOverHandler(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
    }

    onFileDropHandler(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        this.fileSelectHandler(e.dataTransfer.files);
    }

    onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            this.fileSelectHandler(e.target.files);
            e.target.value = '';
        }
    }

    onKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
        const { id } = this.props;
        const ENTER_KEYCODE = 13;
        const inputElement = document.getElementById(id);
        if (e.which === ENTER_KEYCODE && inputElement !== null) {
            inputElement.click();
        }
    }

    render() {
        const { id, onClick, attachmentType, intl } = this.props;
        const inputId = `${id}-input`;

        const BEM = BEMHelper('attachmentButton');

        return (
            <label
                role="button"
                aria-label={intl.formatMessage({
                    id: 'vedlegg.lastoppknapp.arialabel'
                })}
                id={id}
                tabIndex={0}
                htmlFor={inputId}
                className={BEM.block}
                onDragOver={(e) => this.onFileDragOverHandler(e)}
                onDrop={(e) => this.onFileDropHandler(e)}
                onKeyPress={(e) => this.onKeyPress(e)}
            >
                <div className={BEM.element('icon')}>
                    <CustomSVG iconRef={uploadIcon} size={22} />
                </div>
                <Element className={BEM.element('label')}>
                    <FormattedMessage id={`vedlegg.lastoppknapp.${attachmentType}`} />
                </Element>
                <input
                    id={inputId}
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={(e) => this.onFileSelect(e)}
                    multiple={true}
                    onClick={onClick}
                />
            </label>
        );
    }
}
export default injectIntl(AttachmentInput);
