import { TextFieldProps } from '@navikt/ds-react';
import React, { useRef } from 'react';
import classNames from 'classnames';
import { FastField, Field, FieldProps } from 'formik';
import { InputTime, TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import bemUtils from '../../utils/bemUtils';
import { focusFirstElement } from '../../utils/focusUtils';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import TimeInput, { TimeInputLabels, TimeInputLayoutProps, TimeInputRefProps } from './TimeInput';

interface OwnProps<FieldName> extends Omit<TextFieldProps, 'name' | 'onChange'> {
    name: FieldName;
    maxHours?: number;
    maxMinutes?: number;
    timeInputLayout?: TimeInputLayoutProps;
    timeInputLabels?: TimeInputLabels;
}

export type FormikTimeInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TimeInputRefProps &
    TestProps;

const bem = bemUtils('formikTimeInput');

export const Div = (props: any) => <div {...props} />;

function FormikTimeInput<FieldName, ErrorType>({
    label,
    name,
    validate,
    error,
    timeInputLayout,
    useFastField,
    description,
    timeInputLabels,
    ...restProps
}: FormikTimeInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const ref = useRef<any>();
    const FieldComponent = useFastField ? FastField : Field;

    const skjemagruppeClassName = classNames(
        bem.block,
        bem.modifierConditional(timeInputLayout?.direction, timeInputLayout?.direction !== undefined),
    );

    if (restProps.disabled) {
        return (
            <SkjemagruppeQuestion className={skjemagruppeClassName} ref={ref} legend={label} description={description}>
                <TimeInput
                    {...restProps}
                    {...timeInputLayout}
                    justifyContent="left"
                    onChange={() => null}
                    labels={timeInputLabels}
                />
            </SkjemagruppeQuestion>
        );
    }

    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemagruppeQuestion
                        className={skjemagruppeClassName}
                        ref={ref}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        id={field.name as any}
                        onFocus={(evt) => {
                            if (evt.target.id === ref.current.props?.id) {
                                focusFirstElement(evt.target);
                            }
                        }}
                        legend={label}
                        description={description}
                    >
                        <TimeInput
                            {...restProps}
                            {...field}
                            {...timeInputLayout}
                            justifyContent="left"
                            time={field.value || undefined}
                            onChange={(time: Partial<InputTime> | undefined) => {
                                form.setFieldValue(field.name, time);
                                if (context) {
                                    context.onAfterFieldValueSet();
                                }
                            }}
                            labels={timeInputLabels}
                        />
                    </SkjemagruppeQuestion>
                );
            }}
        </FieldComponent>
    );
}

export default FormikTimeInput;
