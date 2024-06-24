import { Checkbox, CheckboxProps } from '@navikt/ds-react';
import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { FormError, TestProps, TypedFormInputValidationProps, UseFastFieldProps } from './../../types';
import { getErrorPropForFormikInput } from './../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from './../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<CheckboxProps, 'name' | 'error' | 'children'> {
    name: FieldName;
    label: React.ReactNode;
    error?: FormError;
    afterOnChange?: (newValue: boolean) => void;
}

export type FormikCheckboxProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

function FormikCheckbox<FieldName, ErrorType>({
    name,
    label,
    validate,
    afterOnChange,
    error,
    useFastField,
    ...restProps
}: FormikCheckboxProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                const hasError = getErrorPropForFormikInput({ field, form, context, error });
                return (
                    <Checkbox
                        {...restProps}
                        {...field}
                        error={hasError !== undefined}
                        checked={field.value === true}
                        autoComplete="off"
                        onChange={(evt) => {
                            const newValue = evt.target.checked;
                            form.setFieldValue(field.name, newValue);
                            if (afterOnChange) {
                                afterOnChange(newValue);
                            }
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                    >
                        {label}
                    </Checkbox>
                );
            }}
        </FieldComponent>
    );
}

export default FormikCheckbox;
