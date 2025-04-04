import { TextField } from '@navikt/ds-react';

import planBemUtils from '../../utils/planBemUtils';
import StepperKnapp from './StepperKnapp';
import './numberStepper.less';

export interface Props {
    value: number;
    increaseAriaLabel: string;
    decreaseAriaLabel: string;
    stepSize?: number;
    max?: number;
    min?: number;
    onChange: (value: number) => void;
    legendId?: string;
}

const bem = planBemUtils('numberStepper');

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const NumberStepper: React.FunctionComponent<Props> = ({
    value,
    min,
    max,
    stepSize = 1,
    legendId,
    onChange,
    increaseAriaLabel,
    decreaseAriaLabel,
}) => {
    const canDecrease = min === undefined || value > min;
    const canIncrease = max === undefined || value < max;
    return (
        <div className={bem.block}>
            <div className={bem.element('decrease')}>
                <StepperKnapp
                    direction="previous"
                    disabled={canDecrease === false}
                    onClick={() => onChange(value - stepSize)}
                    label={decreaseAriaLabel}
                />
            </div>
            <div className={bem.element('input')}>
                <TextField
                    label=""
                    value={value}
                    type="number"
                    aria-labelledby={legendId}
                    onChange={(evt) => onChange(parseInt(evt.target.value, 10))}
                />
            </div>
            <div className={bem.element('increase')}>
                <StepperKnapp
                    direction="next"
                    disabled={canIncrease === false}
                    onClick={() => onChange(value + stepSize)}
                    label={increaseAriaLabel}
                />
            </div>
        </div>
    );
};
// eslint-disable-next-line import/no-default-export
export default NumberStepper;
