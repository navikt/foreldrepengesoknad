import { TextFieldProps } from '@navikt/ds-react';
import React from 'react';
import { Accept, FileRejection } from 'react-dropzone';
import { ArrayHelpers, Field, FieldArray, FieldProps } from 'formik';
import { FormError, TypedFormInputValidationProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import FileDropInput from './file-drop-input/FileDropInput';

interface OwnProps<FieldName> {
    name: FieldName;
    legend: string;
    description?: React.ReactNode;
    buttonLabel: string;
    acceptLabel?: string;
    rejectLabel?: string;
    accept?: Accept;
    multiple?: boolean;
    error?: FormError;
    onFilesSelect: (files: File[], rejectedFiles: FileRejection[], arrayHelpers: ArrayHelpers) => void;
    onClick?: () => void;
}

export type FormikFileDropInputProps<FieldName> = OwnProps<FieldName> & Omit<TextFieldProps, 'label' | 'accept'>;

function FormikFileDropInput<FieldName, ErrorType>({
    name,
    legend,
    description,
    buttonLabel,
    acceptLabel,
    rejectLabel,
    accept,
    multiple = true,
    validate,
    onFilesSelect,
    error,
    onClick,
}: FormikFileDropInputProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);

    return (
        <FieldArray
            name={`${name}`}
            render={(arrayHelpers) => (
                <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
                    {({ field, form }: FieldProps) => {
                        return (
                            <FileDropInput
                                id={field.name}
                                name={field.name}
                                legend={legend}
                                description={description}
                                buttonLabel={buttonLabel}
                                acceptLabel={acceptLabel}
                                rejectLabel={rejectLabel}
                                onClick={onClick}
                                onFilesSelect={(files, rejectedFiled) =>
                                    onFilesSelect(files, rejectedFiled, arrayHelpers)
                                }
                                multiple={multiple}
                                accept={accept}
                                error={getErrorPropForFormikInput({ field, form, context, error })}
                            />
                        );
                    }}
                </Field>
            )}
        />
    );
}

export default FormikFileDropInput;
