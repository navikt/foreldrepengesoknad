import * as React from 'react';
import * as classnames from 'classnames';
import { guid } from 'nav-frontend-js-utils';

import './rangeInput.less';
import RangeStepper from './RangeStepper';
import AriaText from '../aria/AriaText';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';

export interface RangeInputValueLabelRendererOptions {
    value: number;
    min: number;
    max: number;
}

export type RangeInputValueLabelRenderer = (
    options: RangeInputValueLabelRendererOptions
) => React.ReactElement<any>;

interface Props {
    label: string | React.ReactNode;
    ariaDescription?: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    inputId?: string;
    valueLabelRenderer?: RangeInputValueLabelRenderer;
    ariaValueChangedMessage?: (value: number) => string;
    steppers?: {
        increaseLabel: string;
        reduceLabel: string;
    };
    onChange: (value: number) => void;
}

interface State {
    active: boolean;
}

const defaultValueLabelRenderer: RangeInputValueLabelRenderer = (
    options: RangeInputValueLabelRendererOptions
) => (
    <div className="rangeInput__valueLabels">
        <div className="rangeInput__valueLabels__left">{options.min}</div>
        <div className="rangeInput__valueLabels__right">{options.max}</div>
    </div>
);

class RangeInput extends React.Component<Props, State> {
    container: HTMLDivElement | null;

    constructor(props: Props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.deactivateIfOutside = this.deactivateIfOutside.bind(this);
        this.state = {
            active: false
        };
    }
    handleBlur(e: React.FocusEvent<HTMLDivElement>) {
        if (!this.container) {
            return;
        }
        setTimeout(() => this.deactivateIfOutside(), 0);
    }
    handleFocus(e: React.FocusEvent<HTMLDivElement>) {
        this.setState({
            active: true
        });
    }
    deactivateIfOutside() {
        if (
            this.container &&
            window.document.activeElement &&
            !this.container.contains(window.document.activeElement)
        ) {
            this.setState({
                active: false
            });
        }
    }
    render() {
        const {
            label,
            inputId,
            valueLabelRenderer,
            steppers,
            ariaDescription,
            ariaValueChangedMessage,
            ...rest
        } = this.props;

        const { value, min, max, onChange } = this.props;
        const id = inputId || guid();
        const labelRenderer = valueLabelRenderer || defaultValueLabelRenderer;
        return (
            <SkjemaInputElement label={label} id={id}>
                {labelRenderer({ value, min, max })}
                <div
                    className={classnames('rangeInput', {
                        'rangeInput--withSteppers': steppers !== undefined
                    })}
                    ref={(c) => (this.container = c)}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}>
                    {steppers && (
                        <div className="rangeInput__stepper rangeInput__stepper--previous">
                            <RangeStepper
                                direction="previous"
                                onClick={() =>
                                    value > min ? onChange(value - 1) : null
                                }
                                label={
                                    steppers ? steppers.reduceLabel : 'Mindre'
                                }
                            />
                        </div>
                    )}
                    <div className="rangeInput__range">
                        {ariaDescription && (
                            <AriaText id="aria">{ariaDescription}</AriaText>
                        )}
                        <input
                            {...rest}
                            id={id}
                            aria-describedby="aria"
                            className="nav-frontend-range-input"
                            type="range"
                            onChange={(e) =>
                                onChange(parseInt(e.target.value, 10))
                            }
                        />
                        <div
                            role="alert"
                            aria-live="assertive"
                            className="sr-only">
                            {ariaValueChangedMessage && this.state.active
                                ? ariaValueChangedMessage(value)
                                : undefined}
                        </div>
                    </div>
                    {steppers && (
                        <div className="rangeInput__stepper rangeInput__stepper--next">
                            <RangeStepper
                                direction="next"
                                onClick={() =>
                                    value < max ? onChange(value + 1) : null
                                }
                                label={
                                    steppers ? steppers.increaseLabel : 'Mer'
                                }
                            />
                        </div>
                    )}
                </div>
            </SkjemaInputElement>
        );
    }
}

export default RangeInput;
