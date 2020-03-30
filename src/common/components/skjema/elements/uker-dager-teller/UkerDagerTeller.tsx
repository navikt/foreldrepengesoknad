import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import NumberStepper, { Props as NumberStepperProps } from '../number-stepper/NumberStepper';
import Block from 'common/components/block/Block';
import BEMHelper from 'common/util/bem';
import Fieldset from 'app/temp-components/Fieldset';

import './ukerDagerTeller.less';
import { SkjemaelementFeil } from 'common/lib/validation/types';

export interface Props {
    ukeLegend: string;
    dagLegend: string;
    feil?: SkjemaelementFeil;
    ukeStepper: NumberStepperProps;
    dagStepper: NumberStepperProps;
}

const UkerDagerTeller: React.StatelessComponent<Props> = (props) => {
    const { ukeLegend, dagLegend, feil, ukeStepper, dagStepper } = props;
    const bem = BEMHelper('ukerDagerTeller');
    return (
        <SkjemaGruppe feil={feil}>
            <div className={bem.block}>
                <div className={bem.element('ukerFelt')}>
                    <Block margin="xxs">
                        <Fieldset legend={ukeLegend}>
                            <NumberStepper {...ukeStepper} />
                        </Fieldset>
                    </Block>
                </div>
                <Fieldset legend={dagLegend}>
                    <NumberStepper {...dagStepper} />
                </Fieldset>
            </div>
        </SkjemaGruppe>
    );
};

export default UkerDagerTeller;
