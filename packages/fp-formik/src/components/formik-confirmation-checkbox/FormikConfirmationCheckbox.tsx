import { ConfirmationPanel, ConfirmationPanelProps } from '@navikt/ds-react';
import React from 'react';
import { Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<ConfirmationPanelProps, 'name' | 'onChange' | 'checked'> {
    name: FieldName;
}

export type FormikConfirmationCheckboxProps<FieldName, ErrorType> = OwnProps<FieldName> &
    Omit<TypedFormInputValidationProps<FieldName, ErrorType>, 'info'> &
    TestProps;

function FormikConfirmationCheckbox<FieldName, ErrorType>({
    children,
    name,
    error,
    validate,
    ...restProps
}: FormikConfirmationCheckboxProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <ConfirmationPanel
                        {...restProps}
                        {...field}
                        checked={field.value === true}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        onChange={(evt) => {
                            form.setFieldValue(`${name}`, (evt as React.ChangeEvent<HTMLInputElement>).target.checked);
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                    >
                        {children}
                    </ConfirmationPanel>
                );
            }}
        </Field>
    );
}

export default FormikConfirmationCheckbox;
