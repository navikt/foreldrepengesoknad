import React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import Fieldset from 'app/components/fieldset/Fieldset';
import { Block } from '@navikt/fp-common';
import NumberStepper, { Props as NumberStepperProps } from './../number-stepper/NumberStepper';

import './ukerDagerTeller.less';
import { bemUtils } from '@navikt/fp-common';

export interface Props {
    ukeLegend: string;
    dagLegend: string;
    feil?: React.ReactNode;
    ukeStepper: NumberStepperProps;
    dagStepper: NumberStepperProps;
}

const UkerDagerTeller: React.FunctionComponent<Props> = ({ feil, ukeStepper, dagStepper, ukeLegend, dagLegend }) => {
    const bem = bemUtils('ukerDagerTeller');
    const ukeLegendId = guid();
    const dagLegendId = guid();
    return (
        <SkjemaGruppe feil={feil} legend={<Element tag="span">Varighet på perioden</Element>}>
            <div className={bem.block}>
                <div className={bem.element('ukerFelt')}>
                    <Block padBottom="l">
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
