import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler } from 'react-hook-form';

import { FormMethodsMedUtkast, LagreSkjemautkastContext } from '../skjemautkast/Skjemautkast';

interface Props<FormValues extends FieldValues> {
    formMethods: FormMethodsMedUtkast<FormValues>;
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
        <LagreSkjemautkastContext
            value={{ lagreUtkast: formMethods.lagreUtkast, oppdaterUtkast: formMethods.oppdaterUtkast }}
        >
            <FormProvider {...formMethods}>
                <form
                    style={shouldUseFlexbox ? { display: 'flex', flexDirection: 'column', flex: '1' } : undefined}
                    className={className}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={onSubmit ? handleSubmit((values) => onSubmit(values)) : undefined}
                    id={id}
                >
                    {children}
                </form>
            </FormProvider>
        </LagreSkjemautkastContext>
    );
};
