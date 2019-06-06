import * as React from 'react';
import BEMHelper from 'common/util/bem';
import StepperKnapp from './StepperKnapp';

import './numberStepper.less';

export interface Props {
    value: number;
    ariaLabel: string;
    stepSize?: number;
    max?: number;
    min?: number;
    onChange: (value: number) => void;
}

const bem = BEMHelper('numberStepper');

const NumberStepper: React.StatelessComponent<Props> = ({ value, min, max, stepSize = 1, ariaLabel, onChange }) => {
    const canDecrease = min === undefined || value > min;
    const canIncrease = max === undefined || value < max;
    return (
        <div className={bem.block}>
            <div className={bem.element('decrease')}>
                <StepperKnapp
                    direction="previous"
                    disabled={canDecrease === false}
                    onClick={() => onChange(value - stepSize)}
                    label="decrease"
                />
            </div>
            <div className={bem.element('input')}>
                <input
                    className="skjemaelement__input input--fullbredde"
                    aria-label={ariaLabel}
                    type="number"
                    value={value}
                    onChange={(evt) => onChange(parseInt(evt.target.value, 10))}
                />
            </div>
            <div className={bem.element('increase')}>
                <StepperKnapp
                    direction="next"
                    disabled={canIncrease === false}
                    onClick={() => onChange(value + stepSize)}
                    label="increase"
                />
            </div>
        </div>
    );
};

export default NumberStepper;
