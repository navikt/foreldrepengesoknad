import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface OwnProps<FormValues extends FieldValues> {
    formMethods: UseFormReturn<FormValues>;
    children: ReactNode;
    onSubmit?: SubmitHandler<FormValues>;
    className?: string;
}

const Form = <FormValues extends FieldValues>({ formMethods, children, onSubmit, className }: OwnProps<FormValues>) => {
    const { handleSubmit } = formMethods;

    return (
        <FormProvider {...formMethods}>
            <form className={className} onSubmit={onSubmit ? handleSubmit((values) => onSubmit(values)) : undefined}>
                {children}
            </form>
        </FormProvider>
    );
};

export default Form;
