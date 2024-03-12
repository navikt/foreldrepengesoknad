import React from 'react';
import { FormError } from '../../../types';
import SkjemagruppeQuestion from '../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import UploadSvg from './UploadSvg';
import './fileInput.scss';

interface FileInputProps {
    id: string;
    legend: string;
    description?: React.ReactNode;
    buttonLabel: string;
    name: string;
    onFilesSelect: (files: File[]) => void;
    multiple?: boolean;
    accept: string;
    error?: FormError;
    onClick?: () => void;
}

export default class FileInput extends React.Component<FileInputProps> {
    constructor(props: FileInputProps) {
        super(props);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.onFileDropHandler = this.onFileDropHandler.bind(this);
        this.onFileDragOverHandler = this.onFileDragOverHandler.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    fileSelectHandler(fileList: FileList) {
        const files = Array.from(fileList) as File[];
        this.props.onFilesSelect(files);
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
        const { id, name, buttonLabel, error, description, multiple, legend, onClick, accept } = this.props;
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
                    onDragOver={this.onFileDragOverHandler}
                    onDrop={this.onFileDropHandler}
                    onKeyPress={this.onKeyPress}
                    onClick={onClick}
                >
                    <div className="attachmentButton__icon">
                        <UploadSvg />
                    </div>
                    <span className="attachmentButton__label">{buttonLabel}</span>
                    <input
                        id={inputId}
                        name={name}
                        type="file"
                        accept={accept}
                        onChange={(e) => this.onFileSelect(e)}
                        multiple={multiple === true}
                    />
                </label>
            </SkjemagruppeQuestion>
        );
    }
}
