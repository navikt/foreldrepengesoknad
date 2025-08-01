import { Label } from '@navikt/ds-react';

import Block from '../../common/block/Block';
import Fieldset from '../../common/fieldset/Fieldset';
import { guid } from '../../utils/guid';
import planBemUtils from '../../utils/planBemUtils';
import NumberStepper, { Props as NumberStepperProps } from './../number-stepper/NumberStepper';
import './ukerDagerTeller.less';

interface Props {
    ukeLegend: string;
    dagLegend: string;
    ukeStepper: NumberStepperProps;
    dagStepper: NumberStepperProps;
}
// eslint-disable-next-line @typescript-eslint/no-restricted-types
const UkerDagerTeller: React.FunctionComponent<Props> = ({ ukeStepper, dagStepper, ukeLegend, dagLegend }) => {
    const bem = planBemUtils('ukerDagerTeller');
    const ukeLegendId = guid();
    const dagLegendId = guid();
    return (
        <>
            <legend>
                <Label as="span">Varighet på perioden</Label>
            </legend>
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
        </>
    );
};
// eslint-disable-next-line import/no-default-export
export default UkerDagerTeller;
