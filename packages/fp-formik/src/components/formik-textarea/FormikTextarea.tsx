import { Textarea, TextareaProps } from '@navikt/ds-react';
import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<TextareaProps, 'name' | 'defaultValue'> {
    name: FieldName;
}

export type FormikTextareaProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

function FormikTextarea<FieldName, ErrorType>({
    name,
    validate,
    error,
    useFastField,
    ...restProps
}: FormikTextareaProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Textarea
                        {...restProps}
                        {...field}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        onChange={(evt) => {
                            form.setFieldValue(field.name, evt.target.value);
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        autoComplete="off"
                        value={field.value || ''}
                    />
                );
            }}
        </FieldComponent>
    );
}

export default FormikTextarea;
