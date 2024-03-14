import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps } from '@navikt/ds-react';
import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

export type FormikCheckboxGroupCheckboxProp = Omit<CheckboxProps, 'children' | 'name' | 'checked'> & {
    label: React.ReactNode;
} & TestProps;

interface OwnProps<FieldName> extends Omit<CheckboxGroupProps, 'name' | 'onChange' | 'value' | 'children'> {
    name: FieldName;
    checkboxes: FormikCheckboxGroupCheckboxProp[];
    afterOnChange?: (value: boolean | string[]) => void;
}

export type FormikCheckboxGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

const getFieldValueArray = (value: any): string[] => {
    if (value === undefined) {
        return [];
    }
    if (typeof value === 'string') {
        return [value];
    }
    return value;
};

function FormikCheckboxGroup<FieldName, ErrorType>({
    name,
    validate,
    afterOnChange,
    legend,
    error,
    checkboxes,
    useFastField,
    ...restProps
}: FormikCheckboxGroupProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <CheckboxGroup
                        {...restProps}
                        value={getFieldValueArray(field.value)}
                        legend={legend}
                        className="focusableFieldset"
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        onChange={(value) => {
                            form.setFieldValue(field.name, value);
                            if (afterOnChange) {
                                afterOnChange(value);
                            }
                        }}
                    >
                        {checkboxes.map(({ value, label, ...cbRestProps }, index) => (
                            <Checkbox
                                key={`${name}_${value || index}`}
                                {...cbRestProps}
                                name={name as any}
                                value={value}
                            >
                                {label}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                );
            }}
        </FieldComponent>
    );
}

export default FormikCheckboxGroup;
