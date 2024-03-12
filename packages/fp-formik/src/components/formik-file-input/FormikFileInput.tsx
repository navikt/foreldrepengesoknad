import { TextFieldProps } from '@navikt/ds-react';
import React from 'react';
import { ArrayHelpers, Field, FieldArray, FieldProps } from 'formik';
import { FormError, TypedFormInputValidationProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import FileInput from './file-input/FileInput';

/**
 * Denne er deprecated.
 * Bruk heller FileDropInput - denne ligger er fortsatt
 * her pga. bakoverkompabilitet på accept prop.
 * */

interface OwnProps<FieldName> {
    name: FieldName;
    legend: string;
    description?: React.ReactNode;
    buttonLabel: string;
    accept: string;
    multiple?: boolean;
    error?: FormError;
    onFilesSelect: (files: File[], arrayHelpers: ArrayHelpers) => void;
    onClick?: () => void;
}

export type FormikFileInputProps<FieldName> = OwnProps<FieldName> & Omit<TextFieldProps, 'label'>;

function FormikFileInput<FieldName, ErrorType>({
    name,
    legend,
    description,
    buttonLabel,
    accept,
    multiple = true,
    validate,
    onFilesSelect,
    error,
    onClick,
}: FormikFileInputProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);

    return (
        <FieldArray
            name={`${name}`}
            render={(arrayHelpers) => (
                <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
                    {({ field, form }: FieldProps) => {
                        return (
                            <FileInput
                                id={field.name}
                                name={field.name}
                                legend={legend}
                                description={description}
                                buttonLabel={buttonLabel}
                                onClick={onClick}
                                onFilesSelect={(files) => onFilesSelect(files, arrayHelpers)}
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

export default FormikFileInput;
