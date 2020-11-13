import * as React from 'react';
import BEMHelper from 'common/util/bem';
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

const bem = BEMHelper('numberStepper');

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
                <input
                    className="skjemaelement__input input--fullbredde"
                    type="number"
                    value={value}
                    onChange={(evt) => onChange(parseInt(evt.target.value, 10))}
                    aria-labelledby={legendId}
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

export default NumberStepper;
