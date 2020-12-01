import * as React from 'react';
import { SkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import { guid } from 'nav-frontend-js-utils';
import ValiderbarInput from 'common/lib/validation/elements/ValiderbarInput';
import throttle from 'lodash.throttle';
import { InputChangeEvent } from '../../../types/Events';
import { InputProps } from 'nav-frontend-skjema';
import LabelWithUtvidetInformasjon from 'common/components/labelWithUtvidetInformasjon/LabelWithUtvidetInformasjon';

interface OwnProps {
    throttled?: boolean;
    apneLabel?: string;
}

type InputWrapperProps = SkjemaelementProps & InputProps & OwnProps;

interface InputWrapperState {
    value: string | number | readonly string[] | undefined;
}

export default class Input extends React.Component<InputWrapperProps, InputWrapperState> {
    static defaultProps = {
        throttled: false,
    };

    static getDerivedStateFromProps(props: InputWrapperProps) {
        return {
            value: props.value,
        };
    }

    constructor(props: InputWrapperProps) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.throttledOnChange = this.throttledOnChange.bind(this);

        const { value } = props;
        this.state = {
            value: value || '',
        };

        this.throttledOnChange = throttle(this.throttledOnChange, 2000);
    }

    throttledOnChange() {
        const { onChange } = this.props;
        const { value } = this.state;
        onChange(value);
    }

    handleOnChange(e: InputChangeEvent) {
        const { throttled, onChange } = this.props;
        const { value } = e.target;
        this.setState({ value }, throttled === false ? () => onChange(value) : this.throttledOnChange);
    }

    render() {
        const { label, infotekst, throttled, apneLabel, ...otherProps } = this.props;
        const { value } = this.state;
        const id = this.props.id || guid();

        return (
            <ValiderbarInput
                {...otherProps}
                id={id}
                label={
                    <LabelWithUtvidetInformasjon info={infotekst} apneLabel={apneLabel}>
                        {label}
                    </LabelWithUtvidetInformasjon>
                }
                onChange={this.handleOnChange}
                value={value}
                autoComplete="off"
            />
        );
    }
}
