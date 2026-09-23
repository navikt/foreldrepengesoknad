import { ReactNode, createContext, use } from 'react';
import { DefaultValues, FieldValues, UseFormProps, UseFormReturn, useForm } from 'react-hook-form';

export type Skjemautkast = {
    route: string;
    skjema: string;
    verdier: Record<string, unknown>;
};

type UtkastContext = {
    route: string;
    utkast?: Skjemautkast;
    lagre: (utkast: Skjemautkast | undefined) => void;
};

const SkjemautkastContext = createContext<UtkastContext | undefined>(undefined);

export const SkjemautkastProvider = ({ children, ...value }: UtkastContext & { children: ReactNode }) => (
    <SkjemautkastContext value={value}>{children}</SkjemautkastContext>
);

type UtkastHandlinger = {
    lagreUtkast?: () => void;
    oppdaterUtkast?: () => void;
};

export const LagreSkjemautkastContext = createContext<UtkastHandlinger>({});

export type FormMethodsMedUtkast<T extends FieldValues> = UseFormReturn<T> & UtkastHandlinger;

export const useFormMedUtkast = <T extends FieldValues>(
    skjema: string,
    options: UseFormProps<T>,
): FormMethodsMedUtkast<T> & { slettUtkast: () => void } => {
    const context = use(SkjemautkastContext);
    const utkast =
        context?.utkast?.route === context?.route && context?.utkast?.skjema === skjema ? context.utkast : undefined;
    const form = useForm<T>({
        ...options,
        // Utkastet brukes bare som skjemaverdier, aldri som validerte søknadsdata.
        defaultValues: utkast ? (utkast.verdier as DefaultValues<T>) : options.defaultValues,
    });
    const slettUtkast = () => {
        if (utkast) {
            context?.lagre(undefined);
        }
    };
    const lagreUtkast = context
        ? () => context.lagre({ route: context.route, skjema, verdier: form.getValues() })
        : undefined;

    return {
        ...form,
        slettUtkast,
        lagreUtkast,
        oppdaterUtkast: utkast ? lagreUtkast : undefined,
        reset: (...args) => {
            slettUtkast();
            form.reset(...args);
        },
    };
};
