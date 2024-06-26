import { ComponentProps, FunctionComponent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { formatError } from 'utils/customErrorFormatter';

import { RadioGroup } from '@navikt/fp-form-hooks';
import { GreenPanel } from '@navikt/fp-ui';

type Props = {
    shouldFadeIn?: boolean;
    shouldAutofocus?: boolean;
} & ComponentProps<typeof RadioGroup>;

const GreenRadioGroup: FunctionComponent<Props> = (props) => {
    const formMethods = useFormContext();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <GreenPanel isDarkGreen={value === undefined} shouldFadeIn={props.shouldFadeIn}>
            <RadioGroup {...props} customErrorFormatter={formatError}>
                {props.children}
            </RadioGroup>
        </GreenPanel>
    );
};

export default GreenRadioGroup;
