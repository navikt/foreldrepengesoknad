import React from 'react';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps,
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';
import { Props as NumberStepperProps } from 'common/components/skjema/elements/number-stepper/NumberStepper';
import UkerDagerTeller from 'common/components/skjema/elements/uker-dager-teller/UkerDagerTeller';

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
            render={(_onChange, _onBlur, feil) => (
                <UkerDagerTeller
                    ukeStepper={{ ...stepperProps[0] }}
                    dagStepper={{ ...stepperProps[1] }}
                    dagLegend={dagLegend}
                    ukeLegend={ukeLegend}
                    feil={feil !== undefined ? feil.feilmelding : undefined}
                />
            )}
        />
    );
};

export default ValiderbarUkerDagerTeller;
