import * as React from 'react';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import NumberStepper, { Props as NumberStepperProps } from '../number-stepper/NumberStepper';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

export interface Props extends NumberStepperProps {
    legend: string;
    feil?: Feil;
}

const SkjemaNumberStepper: React.StatelessComponent<Props> = (props) => {
    const { legend, feil, ...stepperProps } = props;
    return (
        <SkjemaGruppe feil={feil}>
            <Fieldset legend={legend}>
                <NumberStepper {...stepperProps} />
            </Fieldset>
        </SkjemaGruppe>
    );
};

export default SkjemaNumberStepper;
