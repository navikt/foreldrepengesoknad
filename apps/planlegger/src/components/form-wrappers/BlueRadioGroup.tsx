import { ComponentProps, useEffect } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { formatError } from 'utils/customErrorFormatter';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { BluePanel } from '@navikt/fp-ui';

type Props<T extends FieldValues> = {
    shouldFadeIn?: boolean;
    shouldAutofocus?: boolean;
} & ComponentProps<typeof RhfRadioGroup<T>>;

export const BlueRadioGroup = <T extends FieldValues>(props: Props<T>) => {
    const formMethods = useFormContext<T>();

    const value = formMethods.watch(props.name);

    useEffect(() => {
        let timeoutId = undefined;
        if (props.shouldAutofocus) {
            // Må vente til side-scrolling er ferdig
            timeoutId = setTimeout(() => {
                formMethods.setFocus(props.name);
            }, 300);
        }
        return () => timeoutId && clearTimeout(timeoutId);
    }, []);

    return (
        <BluePanel isDarkBlue={value === undefined} shouldFadeIn={props.shouldFadeIn}>
            <RhfRadioGroup {...props} customErrorFormatter={formatError}>
                {props.children}
            </RhfRadioGroup>
        </BluePanel>
    );
};
