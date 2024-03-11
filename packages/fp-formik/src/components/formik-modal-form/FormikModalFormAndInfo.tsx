import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { FormError, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import ModalFormAndInfo, { ModalFormAndInfoProps } from './modal-form-and-info/ModalFormAndInfo';

export interface FormikModalFormAndInfoProps<FieldName, InfoType, ErrorType>
    extends ModalFormAndInfoProps<InfoType>,
        UseFastFieldProps,
        TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    error?: FormError;
    defaultValue?: InfoType;
    onAfterChange?: (data: InfoType) => void;
}

function FormikModalFormAndInfo<FieldName, ItemType, ErrorType>({
    name,
    labels,
    defaultValue,
    infoRenderer,
    formRenderer,
    onAfterChange,
    renderEditButtons,
    renderDeleteButton,
    dialogWidth,
    dialogClassName,
    wrapInfoInPanel,
    wrapInfoInFieldset,
    error,
    validate,
    useFastField,
}: FormikModalFormAndInfoProps<FieldName, ItemType, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent name={name} validate={validate ? (value: any) => validate(value, name) : undefined}>
            {({ field, form }: FieldProps<ItemType>) => {
                return (
                    <ModalFormAndInfo<ItemType>
                        labels={labels}
                        data={field.value || defaultValue}
                        dialogClassName={dialogClassName}
                        dialogWidth={dialogWidth}
                        renderEditButtons={renderEditButtons}
                        renderDeleteButton={renderDeleteButton}
                        wrapInfoInPanel={wrapInfoInPanel}
                        wrapInfoInFieldset={wrapInfoInFieldset}
                        error={error || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined)}
                        onDelete={() => form.setFieldValue(field.name, undefined)}
                        onChange={(value) => {
                            form.setFieldValue(field.name, value, false);
                            if (onAfterChange) {
                                onAfterChange(value);
                            }
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        formRenderer={formRenderer}
                        infoRenderer={({ onEdit, onDelete }) => infoRenderer({ data: field.value, onDelete, onEdit })}
                    />
                );
            }}
        </FieldComponent>
    );
}

export default FormikModalFormAndInfo;
