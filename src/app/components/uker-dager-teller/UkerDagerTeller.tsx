import * as React from 'react';
import { SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import NumberStepper, { Props as NumberStepperProps } from '../number-stepper/NumberStepper';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';
import Block from 'common/components/block/Block';

export interface Props {
    ukeLegend: string;
    dagLegend: string;
    feil?: Feil;
    ukeStepper: NumberStepperProps;
    dagStepper: NumberStepperProps;
}

const UkerDagerTeller: React.StatelessComponent<Props> = (props) => {
    const { ukeLegend, dagLegend, feil, ukeStepper, dagStepper } = props;
    return (
        <SkjemaGruppe feil={feil}>
            <Block margin="xxs">
                <Fieldset legend={ukeLegend}>
                    <NumberStepper {...ukeStepper} />
                </Fieldset>
            </Block>
            <Fieldset legend={dagLegend}>
                <NumberStepper {...dagStepper} />
            </Fieldset>
        </SkjemaGruppe>
    );
};

export default UkerDagerTeller;
