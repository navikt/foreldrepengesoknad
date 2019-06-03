import React from 'react';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';
import { Props as NumberStepperProps } from 'app/components/skjema/number-stepper/NumberStepper';
import UkerDagerTeller from 'app/components/skjema/uker-dager-teller/UkerDagerTeller';

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
