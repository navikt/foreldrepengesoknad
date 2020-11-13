import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import NumberStepper, { Props as NumberStepperProps } from '../number-stepper/NumberStepper';
import Block from 'common/components/block/Block';
import BEMHelper from 'common/util/bem';
import Fieldset from 'app/temp-components/Fieldset';

import './ukerDagerTeller.less';
import { Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

export interface Props {
    ukeLegend: string;
    dagLegend: string;
    feil?: React.ReactNode;
    ukeStepper: NumberStepperProps;
    dagStepper: NumberStepperProps;
}

const UkerDagerTeller: React.FunctionComponent<Props> = ({ ukeLegend, dagLegend, feil, ukeStepper, dagStepper }) => {
    const bem = BEMHelper('ukerDagerTeller');
    const ukeLegendId = guid();
    const dagLegendId = guid();
    return (
        <SkjemaGruppe feil={feil} legend={<Element tag="span">Varighet på perioden</Element>}>
            <div className={bem.block}>
                <div className={bem.element('ukerFelt')}>
                    <Block margin="xxs">
                        <Fieldset legend={<span id={ukeLegendId}>{ukeLegend}</span>}>
                            <NumberStepper {...ukeStepper} legendId={ukeLegendId} />
                        </Fieldset>
                    </Block>
                </div>
                <Fieldset legend={<span id={dagLegendId}>{dagLegend}</span>}>
                    <NumberStepper {...dagStepper} legendId={dagLegendId} />
                </Fieldset>
            </div>
        </SkjemaGruppe>
    );
};

export default UkerDagerTeller;
