import React, { ReactNode } from 'react';
import { Validator, ValidationResult } from '../types/index';
import { runValidators } from 'common/lib/validation/utils/runValidFormValidation';
import { Feil } from 'common/types';

type ValiderEvent = (evt: any) => void;

export interface ValiderbartSkjemaelementProps {
    name: string;
    optional?: boolean;
    validators?: Validator[];
    label?: ReactNode;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onChange?: any;
    onBlur?: any;
    onValidate?: any;
}

export interface Props extends ValiderbartSkjemaelementProps {
    render: (onChange: ValiderEvent, onBlur: ValiderEvent, feil: Feil | undefined) => JSX.Element;
}

export interface ValiderbartSkjemaelementState {
    tests: any[];
    valid: boolean;
    hasBlurred: boolean;
    optional?: boolean;
}

class ValiderbartSkjemaelement extends React.Component<Props, ValiderbartSkjemaelementState> {
    element: any;
    context: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            tests: [],
            valid: true,
            hasBlurred: false,
            optional: this.props.optional
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillMount() {
        if (this.context.validForm) {
            this.context.validForm.register(this);
        }
    }

    componentWillUnmount() {
        if (this.context.validForm) {
            this.context.validForm.unregister(this);
        }
    }

    onChange(e: any) {
        if (this.state.hasBlurred) {
            setTimeout(() => {
                this.validate();
            });
        }
        if (this.context.validForm) {
            this.context.validForm.onChange(e, this);
        }

        if (this.props.onChange) {
            const args = Array.prototype.slice.call(arguments);
            this.props.onChange(...args);
        }
    }

    onBlur(e: React.FocusEvent<any>) {
        this.setState({
            hasBlurred: true
        });

        if (this.context.validForm) {
            this.context.validForm.onBlur(e, this);
        } else {
            setTimeout(() => {
                this.validate();
            });
        }

        if (this.props.onBlur) {
            const args = Array.prototype.slice.call(arguments);
            this.props.onBlur(...args);
        }
    }

    getFirstFailedVerdict() {
        return this.state.tests.find((test) => !test.verdict);
    }

    validate() {
        const result = this.runValidation();

        if (this.props.onValidate) {
            this.props.onValidate(result);
        }

        return result;
    }

    runValidation(): ValidationResult {
        if (!this.props.validators || !this.props.validators.length) {
            this.setState({
                valid: true
            });
            return {
                valid: true,
                name: this.props.name,
                tests: []
            };
        }

        const results = runValidators(this.props.validators, this.props.name);
        const tests = results.tests.slice();
        const valid = results.valid;

        this.setState({
            tests,
            valid
        });
        return {
            name: this.props.name,
            tests,
            valid
        };
    }

    render() {
        const { render } = this.props;
        const failedVerdict = !this.state.valid ? { feilmelding: this.getFirstFailedVerdict().failText } : undefined;
        return render(this.onChange, this.onBlur, failedVerdict);
    }
}
export default ValiderbartSkjemaelement;
