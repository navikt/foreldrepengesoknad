import React from 'react';
import classnames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import { Element } from 'nav-frontend-typografi';
import { bemUtils, UtvidetInformasjon } from '@navikt/fp-common';
import Fieldset from 'app/components/fieldset/Fieldset';
import AriaText from './AriaText';
import RangeStepper from './RangeStepper';
import './rangeInput.less';

export interface RangeInputElementRendererOptions {
    value: number;
    min: number;
    max: number;
}

export type RangeInputElementRenderer = (options: RangeInputElementRendererOptions) => React.ReactElement<any>;

export type RangeValueLabelPlacement = 'above' | 'below';

interface Props {
    label: string;
    hjelpetekst?: React.ReactNode;
    ariaLabelText: string;
    hjelpetekstApneLabel: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    inputId?: string;
    bottomContentRenderer?: RangeInputElementRenderer;
    valueLabelRenderer?: RangeInputElementRenderer;
    valueLabelPlacement?: RangeValueLabelPlacement;
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

const defaultValueLabelRenderer: RangeInputElementRenderer = (options: RangeInputElementRendererOptions) => (
    <div className="rangeInput__valueLabels">
        <div className="rangeInput__valueLabels__left">{options.min}</div>
        <div className="rangeInput__valueLabels__right">{options.max}</div>
    </div>
);

const defaultBottomContentRenderer: RangeInputElementRenderer = (options: RangeInputElementRendererOptions) => (
    <div className="rangeInput__bottomContent">
        <span className="typo-normaltekst">{options.max - options.min}</span>
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
            active: false,
        };
    }
    handleBlur(_e: React.FocusEvent<HTMLDivElement>) {
        if (!this.container) {
            return;
        }
        setTimeout(() => this.deactivateIfOutside(), 0);
    }
    handleFocus(_e: React.FocusEvent<HTMLDivElement>) {
        this.setState({
            active: true,
        });
    }
    deactivateIfOutside() {
        if (
            this.container &&
            window.document.activeElement &&
            !this.container.contains(window.document.activeElement)
        ) {
            this.setState({
                active: false,
            });
        }
    }
    render() {
        const {
            label,
            hjelpetekst,
            ariaLabelText,
            inputId,
            valueLabelRenderer,
            steppers,
            ariaValueChangedMessage,
            bottomContentRenderer,
            hjelpetekstApneLabel,
            valueLabelPlacement = 'above',
            ...rest
        } = this.props;

        const { value, min, max, onChange } = this.props;
        const id = inputId || guid();
        const labelRenderer = valueLabelRenderer || defaultValueLabelRenderer;
        const ariaLabelId = `${id}_label`;
        const bottomRenderer = bottomContentRenderer || defaultBottomContentRenderer;

        const bemWrapper = bemUtils('rangeInputWrapper');
        const bemRangeInput = bemUtils('rangeInput');
        const bemStepper = bemUtils('rangeInput__stepper');

        return (
            <div className={bemWrapper.block}>
                <Fieldset
                    legend={
                        <>
                            <Element>{label}</Element>
                            <UtvidetInformasjon apneLabel={hjelpetekstApneLabel}>{hjelpetekst}</UtvidetInformasjon>
                        </>
                    }
                    className={'uttakfordeler'}
                >
                    <div aria-live="polite">
                        {valueLabelPlacement === 'above' && labelRenderer({ value, min, max })}
                    </div>
                    <div
                        className={classnames(bemRangeInput.block, {
                            [bemRangeInput.modifier('withSteppers')]: steppers !== undefined,
                        })}
                        ref={(c) => (this.container = c)}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                    >
                        {steppers && (
                            <div className={`${bemStepper.block} ${bemStepper.modifier('previous')}`}>
                                <RangeStepper
                                    direction="previous"
                                    onClick={() => (value > min ? onChange(value - 1) : null)}
                                    label={steppers ? steppers.reduceLabel : 'Mindre'}
                                />
                            </div>
                        )}
                        <div className={bemRangeInput.element('range')}>
                            <AriaText id={ariaLabelId}>{ariaLabelText}</AriaText>
                            <input
                                {...rest}
                                id={id}
                                aria-labelledby={ariaLabelId}
                                className="nav-frontend-range-input"
                                type="range"
                                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                            />
                            <div role="alert" aria-live="assertive" className="sr-only">
                                {ariaValueChangedMessage && this.state.active
                                    ? ariaValueChangedMessage(value)
                                    : undefined}
                            </div>
                        </div>
                        {steppers && (
                            <div className={`${bemStepper.block} ${bemStepper.modifier('next')}`}>
                                <RangeStepper
                                    direction="next"
                                    onClick={() => (value < max ? onChange(value + 1) : null)}
                                    label={steppers ? steppers.increaseLabel : 'Mer'}
                                />
                            </div>
                        )}
                    </div>
                    <div aria-live="polite">
                        {valueLabelPlacement === 'below' && labelRenderer({ value, min, max })}
                    </div>
                    {bottomRenderer({ value, min, max })}
                </Fieldset>
            </div>
        );
    }
}

export default RangeInput;
