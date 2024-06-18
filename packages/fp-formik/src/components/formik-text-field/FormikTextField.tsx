import { TextField, TextFieldProps } from '@navikt/ds-react';
import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from './../../types';
import { getErrorPropForFormikInput } from './../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from './../typed-formik-form/TypedFormikForm';
import { getTextFieldWidthClassName, TextFieldWidths } from './FormikTextFieldUtils';
import './formikTextField.css';

interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'children' | 'width'> {
    name: FieldName;
    width?: TextFieldWidths;
}

export type FormikTextFieldProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

function FormikTextField<FieldName, ErrorType>({
    name,
    error,
    validate,
    width,
    className,
    autoComplete = 'off',
    useFastField,
    label,
    ...restProps
}: FormikTextFieldProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;

    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <TextField
                        {...restProps}
                        {...field}
                        label={<div>{label}</div>}
                        autoComplete={autoComplete}
                        className={getTextFieldWidthClassName(width, className)}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        value={field.value === undefined ? '' : field.value}
                    />
                );
            }}
        </FieldComponent>
    );
}

export default FormikTextField;
