import React, { ReactNode } from 'react';
import { Validator, ValidationResult, SkjemaelementFeil } from '../types/index';
import { runValidators } from 'common/lib/validation/utils/runValidFormValidation';
import { ValidFormContext, ValidFormContextInterface, ValidatableComponent } from './ValiderbarForm';

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
    id?: string;
}

export interface Props extends ValiderbartSkjemaelementProps {
    render: (onChange: ValiderEvent, onBlur: ValiderEvent, feil: SkjemaelementFeil) => JSX.Element;
}

export interface ValiderbartSkjemaelementState {
    tests: any[];
    valid: boolean;
    hasBlurred: boolean;
    optional?: boolean;
}

type FormContextProps = Props & {
    formContext: ValidFormContextInterface;
};

class ValiderbartSkjemaelement extends React.Component<FormContextProps, ValiderbartSkjemaelementState>
    implements ValidatableComponent {
    element: any;

    constructor(props: FormContextProps) {
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
        if (this.props.formContext) {
            this.props.formContext.register(this);
        }
    }

    componentWillUnmount() {
        if (this.props.formContext) {
            this.props.formContext.unregister(this);
        }
    }

    onChange(e: any) {
        if (this.state.hasBlurred) {
            setTimeout(() => {
                this.validate();
            });
        }
        if (this.props.formContext) {
            this.props.formContext.onChange(e, this);
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

        if (this.props.formContext) {
            this.props.formContext.onBlur(e, this);
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
        const failedVerdict: SkjemaelementFeil = !this.state.valid ? this.getFirstFailedVerdict().failText : undefined;
        return render(this.onChange, this.onBlur, failedVerdict);
    }
}

const ValiderbartSkjemaelementContextWrapper = (props: Props) => {
    const formContext = React.useContext(ValidFormContext);

    return <ValiderbartSkjemaelement {...props} formContext={formContext} />;
};

export default ValiderbartSkjemaelementContextWrapper;
