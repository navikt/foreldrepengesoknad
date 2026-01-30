import { ComponentProps, useEffect } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { formatError } from 'utils/customErrorFormatter';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { BluePanel } from '@navikt/fp-ui';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
    shouldFadeIn?: boolean;
    shouldAutofocus?: boolean;
} & ComponentProps<typeof RhfRadioGroup<TFieldValues, TName>>;

export const BlueRadioGroup = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: Props<TFieldValues, TName>,
) => {
    const formMethods = useFormContext<TFieldValues>();

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
