import { ComponentProps, FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { formatError } from 'utils/customErrorFormatter';

import { RadioGroup } from '@navikt/fp-form-hooks';

import GreenPanel from '../boxes/GreenPanel';

const GreenRadioGroup: FunctionComponent<ComponentProps<typeof RadioGroup>> = (props) => {
    const formMethods = useFormContext();

    const value = formMethods.watch(props.name);

    return (
        <GreenPanel isDarkGreen={value === undefined}>
            <RadioGroup {...props} customErrorFormatter={formatError}>
                {props.children}
            </RadioGroup>
        </GreenPanel>
    );
};

export default GreenRadioGroup;
