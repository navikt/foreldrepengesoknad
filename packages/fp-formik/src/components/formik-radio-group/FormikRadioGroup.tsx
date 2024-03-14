import { BodyShort, Radio, RadioGroup, RadioGroupProps, RadioProps } from '@navikt/ds-react';
import { FastField, Field, FieldProps } from 'formik';
import React, { useContext } from 'react';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

export type FormikRadioProp = Omit<RadioProps, 'children' | 'name'> & {
    label: React.ReactNode;
} & TestProps;

interface OwnProps<FieldName> extends Omit<RadioGroupProps, 'name' | 'onChange' | 'children' | 'radios'> {
    name: FieldName;
    radios: FormikRadioProp[];
    afterOnChange?: (newValue: string) => void;
}

export type FormikRadioGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

function FormikRadioGroup<FieldName, ErrorType>({
    name,
    validate,
    radios,
    error,
    useFastField,
    afterOnChange,
    ...restProps
}: FormikRadioGroupProps<FieldName, ErrorType>) {
    const context = useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <RadioGroup
                        {...restProps}
                        description={
                            restProps.description ? <BodyShort as="div">{restProps.description}</BodyShort> : undefined
                        }
                        name={field.name}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        value={field.value || ''}
                    >
                        {radios.map((rb, idx) => {
                            const { label, ...rest } = rb;
                            return (
                                <Radio
                                    key={idx}
                                    {...rest}
                                    name={field.name as any}
                                    onChange={(evt) => {
                                        form.setFieldValue(field.name, evt.target.value);
                                        const newValue = evt.target.value;
                                        if (afterOnChange) {
                                            afterOnChange(newValue);
                                        }
                                        if (context) {
                                            context.onAfterFieldValueSet();
                                        }
                                    }}
                                >
                                    {label}
                                </Radio>
                            );
                        })}
                    </RadioGroup>
                );
            }}
        </FieldComponent>
    );
}

export default FormikRadioGroup;
