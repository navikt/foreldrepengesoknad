import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface OwnProps<FormValues extends FieldValues> {
    formMethods: UseFormReturn<FormValues>;
    children: ReactNode;
    onSubmit?: SubmitHandler<FormValues>;
    className?: string;
    shouldUseFlexbox?: boolean;
    id?: string;
}

const RhfForm = <FormValues extends FieldValues>({
    formMethods,
    children,
    onSubmit,
    className,
    shouldUseFlexbox = false,
    id,
}: OwnProps<FormValues>) => {
    const { handleSubmit } = formMethods;

    return (
        <FormProvider {...formMethods}>
            <form
                style={shouldUseFlexbox ? { display: 'flex', flexDirection: 'column', flex: '1' } : undefined}
                className={className}
                onSubmit={onSubmit ? handleSubmit((values) => onSubmit(values)) : undefined}
                id={id}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default RhfForm;
