import React from 'react';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';
import UkerDagerTeller from 'app/components/uker-dager-teller/UkerDagerTeller';
import { Props as NumberStepperProps } from 'app/components/number-stepper/NumberStepper';

interface ValiderbarUkerDagerTellerProps {
    stepperProps: NumberStepperProps[];
    ukeLegend: string;
    dagLegend: string;
}

type Props = ValiderbartSkjemaelementProps & ValiderbarUkerDagerTellerProps;

const ValiderbarUkerDagerTeller: React.StatelessComponent<Props> = (props) => {
    const { stepperProps, ukeLegend, dagLegend } = props;
    return (
        <ValiderbartSkjemaelement
            {...props}
            render={(onChange, onBlur, feil) => (
                <UkerDagerTeller
                    ukeStepper={{ ...stepperProps[0] }}
                    dagStepper={{ ...stepperProps[1] }}
                    dagLegend={dagLegend}
                    ukeLegend={ukeLegend}
                    feil={feil}
                />
            )}
        />
    );
};

export default ValiderbarUkerDagerTeller;
