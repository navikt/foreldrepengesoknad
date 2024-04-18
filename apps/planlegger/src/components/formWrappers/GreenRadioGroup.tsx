import { ComponentProps, FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { formatError } from 'utils/customErrorFormatter';

import { RadioGroup } from '@navikt/fp-form-hooks';

import GreenPanel from '../boxes/GreenPanel';

type Props = {
    shouldFadeIn?: boolean;
} & ComponentProps<typeof RadioGroup>;

const GreenRadioGroup: FunctionComponent<Props> = (props) => {
    const formMethods = useFormContext();

    const value = formMethods.watch(props.name);

    return (
        <GreenPanel isDarkGreen={value === undefined} shouldFadeIn={props.shouldFadeIn}>
            <RadioGroup {...props} customErrorFormatter={formatError}>
                {props.children}
            </RadioGroup>
        </GreenPanel>
    );
};

export default GreenRadioGroup;
