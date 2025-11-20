import { Formik, FormikConfig, FormikProps } from 'formik';
import React from 'react';

export interface TypedFormikWrapperProps<FormValues> extends Omit<Partial<FormikProps<FormValues>>, 'initialValues'> {
    innerRef?: any;
    initialValues: Partial<FormValues>;
    renderForm: (formik: FormikProps<Partial<FormValues>>) => React.ReactNode;
    onSubmit: (values: Partial<FormValues>) => void;
}

type Props<FormValues> = TypedFormikWrapperProps<FormValues> & FormikConfig<Partial<FormValues>>;

function TypedFormikWrapper<FormValues>(props: Props<FormValues>) {
    const { onSubmit, initialValues, renderForm, ...restProps } = props;
    return (
        <Formik<Partial<FormValues>>
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, setTouched }) => {
                void setTouched({});
                setSubmitting(false);
                onSubmit(values);
            }}
            {...restProps}
        >
            {(formik: FormikProps<Partial<FormValues>>) => renderForm(formik)}
        </Formik>
    );
}
// eslint-disable-next-line import/no-default-export
export default TypedFormikWrapper;
