import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { trimStringValues } from './formUtils';

interface Props<FormValues extends FieldValues> {
    formMethods: UseFormReturn<FormValues>;
    children: ReactNode;
    onSubmit?: SubmitHandler<FormValues>;
    className?: string;
    shouldUseFlexbox?: boolean;
    id?: string;
}

export const RhfForm = <FormValues extends FieldValues>({
    formMethods,
    children,
    onSubmit,
    className,
    shouldUseFlexbox = false,
    id,
}: Props<FormValues>) => {
    const { handleSubmit } = formMethods;

    return (
        <FormProvider {...formMethods}>
            <form
                style={shouldUseFlexbox ? { display: 'flex', flexDirection: 'column', flex: '1' } : undefined}
                className={className}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={onSubmit ? handleSubmit((values) => onSubmit(trimStringValues(values))) : undefined}
                id={id}
            >
                {children}
            </form>
        </FormProvider>
    );
};
