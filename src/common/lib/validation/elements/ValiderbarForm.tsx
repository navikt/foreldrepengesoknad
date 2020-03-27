import * as React from 'react';
import PropTypes from 'prop-types';
import { ValidationResult, SummaryError, ValidatorFailText } from '../types/index';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export interface ValiderbarFormProps {
    className?: string;
    summaryTitle?: string;
    noSummary?: boolean;
    validateBeforeSubmit?: boolean;
    onSubmit?: (evt: FormSubmitEvent) => void;
    id?: string;
    onValidationResult?: (result: SummaryError[]) => void;
    runValidationOnRegister?: boolean;
}

export interface ValidFormContext {
    validForm: {
        register: (component: React.Component) => void;
        unregister: (component: React.Component) => void;
        onChange: (e: any, component: React.ComponentType) => void;
        onBlur: (e: any, component: React.ComponentType) => void;
        validateField: (componentId: string, forceValidation?: boolean) => void;
        validateAll: () => void;
    };
}

interface ValiderbarFormState {
    results: ValidationResult[];
    valid: boolean;
    failedSubmit: boolean;
}

type Props = ValiderbarFormProps & InjectedIntlProps;

class ValiderbarForm extends React.Component<Props, ValiderbarFormState> {
    static childContextTypes = {
        validForm: PropTypes.shape({
            register: PropTypes.func,
            unregister: PropTypes.func,
            onChange: PropTypes.func,
            onBlur: PropTypes.func,
            validateField: PropTypes.func,
            validateAll: PropTypes.func
        })
    };
    components: any[];

    constructor(props: Props) {
        super(props);

        this.components = [];
        this.onSubmit = this.onSubmit.bind(this);
        this.shouldValidate = this.shouldValidate.bind(this);

        this.state = {
            results: [],
            valid: true,
            failedSubmit: false
        };
    }

    getChildContext() {
        return {
            validForm: {
                register: this.registerComponent.bind(this),
                unregister: this.unRegisterComponent.bind(this),
                onChange: this.onChange.bind(this),
                onBlur: this.onBlur.bind(this),
                validateField: this.validateField.bind(this),
                validateAll: this.validateAll.bind(this)
            }
        };
    }

    shouldValidate() {
        return this.state.failedSubmit || this.props.validateBeforeSubmit;
    }

    onChange(e: any, component: React.ComponentType) {
        if (this.shouldValidate()) {
            this.validateOne(component);
        }
    }

    onBlur(e: any, component: React.ComponentType) {
        if (this.shouldValidate()) {
            this.validateOne(component);
        }
    }

    onSubmit(e: FormSubmitEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (this.validateAll()) {
            if (this.props.onSubmit) {
                this.props.onSubmit(e);
            }
        } else {
            this.setState({
                failedSubmit: true
            });
        }
    }

    validateOne(component: React.ComponentType) {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            this.validateComponentAtIndex(index);
        }
    }

    validateField(componentId: string, forceValidate: boolean | undefined) {
        if (this.shouldValidate() || forceValidate) {
            const index = this.components.findIndex((c) => c.props.id === componentId);
            if (index >= 0) {
                this.validateComponentAtIndex(index);
            }
        }
    }

    validateComponentAtIndex(index: number) {
        setTimeout(() => {
            if (this.components[index]) {
                const results = this.state.results.slice();
                const fieldResult = this.components[index].validate();
                results[index] = fieldResult;
                const valid = results.every((result) => result.valid === true);

                this.setState({
                    results,
                    valid,
                    failedSubmit: this.state.failedSubmit && !valid
                });
                if (this.props.onValidationResult) {
                    this.props.onValidationResult(this.mapResultsToErrorSummary());
                }
            }
        });
    }

    validateAll() {
        const results = this.components.map((component) => component.validate());
        const valid = results.every((result) => result.valid === true);

        this.setState({
            results: results.slice(),
            valid,
            failedSubmit: this.state.failedSubmit && !valid
        });
        if (this.props.onValidationResult) {
            this.props.onValidationResult(this.mapResultsToErrorSummary());
        }
        return valid;
    }

    registerComponent(component: React.ComponentType) {
        if (this.components.indexOf(component) === -1) {
            this.components.push(component);
            if (this.props.runValidationOnRegister) {
                this.validateOne(component);
            }
        }
    }

    unRegisterComponent(component: React.Component) {
        // Fjern komponent fra komponent-listen
        const index = this.components.indexOf(component);
        this.components.splice(index, 1);

        // Fjern resultatene vi tidligere har lagret for komponenten
        const results = this.state.results.slice();
        results.splice(index, 1);

        // Sjekk om skjemaet er gyldig (valig)
        const valid = results.every((result) => result.valid === true);

        // Oppdater state
        this.setState({
            results,
            valid
        });
    }

    getFailedText(failText: ValidatorFailText): string {
        if (typeof failText === 'string') {
            return failText;
        }
        const intlText = failText;
        return this.props.intl.formatMessage({ id: intlText.intlKey }, intlText.values);
    }

    mapResultsToErrorSummary(): SummaryError[] {
        return this.state.results.filter((result) => !result.valid).map((result) => {
            const failedTest = result.tests.find((test: any) => !test.verdict);
            const text =
                failedTest !== undefined
                    ? this.getFailedText(failedTest.failText)
                    : this.props.intl.formatMessage({ id: 'validerbarForm.ukjentFeil' });
            return {
                name: result.name,
                text
            };
        });
    }

    render() {
        const { noSummary = false, summaryTitle, className } = this.props;
        let summaryBox;
        if (this.state.failedSubmit && !this.state.valid && !noSummary) {
            summaryBox = (
                <Feiloppsummering title={summaryTitle || ''} show={true} errors={this.mapResultsToErrorSummary()} />
            );
        }
        return (
            <form onSubmit={this.onSubmit} className={className}>
                <div role="alert">{summaryBox}</div>
                {this.props.children}
            </form>
        );
    }
}

export default injectIntl(ValiderbarForm);
