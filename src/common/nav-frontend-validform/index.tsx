import React from 'react';
import { Input, Textarea, Select } from 'nav-frontend-skjema';
import { Validator } from './types';
import SkjemaelementFeilmelding from './SkjemaelementFeilmelding';

export interface ValidBaseProps {
    id?: string;
    name?: string;
    optional?: boolean;
    validators?: Validator[];
    feil?: SkjemaelementFeilmelding;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    onChange?: (evt: any) => void;
    onBlur?: (evt: any) => void;
    onValidate?: (evt: any) => void;
}

export interface Props extends ValidBaseProps {
    component: any;
}

export interface State {
    tests: any[];
    valid: boolean;
    hasBlurred: boolean;
    optional?: boolean;
}

class ValidBase extends React.Component<Props, State> {
    element: any;

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
            return;
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
        const {
            component,
            onChange,
            onBlur,
            onValidate,
            validateOnChange,
            validateOnBlur,
            feil,
            optional,
            validators,
            ...other
        } = this.props;

        const failedVerdict = !this.state.valid
            ? { feilmelding: this.getFirstFailedVerdict().failText }
            : undefined;

        const elementRef: any = {};
        switch (component) {
            case Input:
                elementRef.inputRef = (node: any) => {
                    this.element = node;
                };
                break;
            case Select:
                elementRef.selectRef = (node: any) => {
                    this.element = node;
                };
                break;
            case Textarea:
                elementRef.textareaRef = (node: any) => {
                    this.element = node;
                };
                break;
        }

        return (
            <this.props.component
                onChange={this.onChange}
                onBlur={this.onBlur}
                feil={feil || failedVerdict}
                {...other}
            />
        );
    }
}
export default ValidBase;

export { default as ValidForm } from './ValidForm';
export { default as ValidInput } from './ValidInput';
export { default as ValidGroup } from './ValidGroup';
export { default as ValidSelect } from './ValidSelect';
export { default as Feiloppsummering } from './Feiloppsummering';
