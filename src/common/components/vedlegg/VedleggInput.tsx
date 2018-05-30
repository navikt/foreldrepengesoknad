import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import CustomSVG from '../custom-svg/CustomSVG';

const uploadIcon = require('./upload.svg').default;

import './vedlegg.less';

interface OwnProps {
    id: string;
    onFilesSelect: (files: File[]) => void;
}

type Props = OwnProps & InjectedIntlProps;

class VedleggInput extends React.Component<Props> {
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
        const files = Array.from(fileList) as File[];
        const validFiles = this.getValidFiles(files);
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
        const { id, intl } = this.props;
        const inputId = `${id}-input`;
        return (
            <label
                role="button"
                aria-label={intl.formatMessage({
                    id: 'vedlegg.lastoppknapp.arialabel'
                })}
                id={id}
                tabIndex={0}
                htmlFor={inputId}
                className="vedleggKnapp"
                onDragOver={(e) => this.onFileDragOverHandler(e)}
                onDrop={(e) => this.onFileDropHandler(e)}
                onKeyPress={(e) => this.onKeyPress(e)}>
                <div className="vedleggKnapp__ikon">
                    <CustomSVG iconRef={uploadIcon} size={22} />
                </div>
                <Element className="vedleggKnapp__label">
                    <FormattedMessage id="vedlegg.lastoppknapp.label" />
                </Element>
                <input
                    id={inputId}
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={(e) => this.onFileSelect(e)}
                    multiple={true}
                />
            </label>
        );
    }
}
export default injectIntl(VedleggInput);
