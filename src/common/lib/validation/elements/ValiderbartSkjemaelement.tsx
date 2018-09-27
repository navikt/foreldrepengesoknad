import React, { ReactNode } from 'react';
import { Validator } from '../types/index';
import PT from 'prop-types';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

type ValiderEvent = (evt: any) => void;

export interface ValiderbartSkjemaelementProps {
    name: string;
    optional?: boolean;
    validators?: Validator[];
    label?: ReactNode;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onChange?: ValiderEvent;
    onBlur?: ValiderEvent;
    onValidate?: ValiderEvent;
}

export interface Props extends ValiderbartSkjemaelementProps {
    render: (onChange: ValiderEvent, onBlur: ValiderEvent, feil: Feil | undefined) => {};
}

export interface ValiderbartSkjemaelementState {
    tests: any[];
    valid: boolean;
    hasBlurred: boolean;
    optional?: boolean;
}

class ValiderbartSkjemaelement extends React.Component<Props, ValiderbartSkjemaelementState> {
    static contextTypes = {
        validForm: PT.object
    };

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
            this.props.onChange(e);
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
            this.props.onBlur(e);
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

    runValidation() {
        if (!this.props.validators || !this.props.validators.length) {
            return {
                valid: true
            };
        }

        let valid = true;
        const testsCopy = this.props.validators.map((validator) => {
            const validatorResult = {
                verdict: validator.test(this.element),
                failText: validator.failText
            };

            if (!validatorResult.verdict) {
                valid = false;
            }
            return validatorResult;
        });

        this.setState({
            tests: testsCopy.slice(),
            valid
        });

        return {
            name: this.props.name,
            tests: testsCopy.slice(),
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
