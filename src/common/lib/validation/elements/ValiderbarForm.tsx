import * as React from 'react';
import PT from 'prop-types';
import { ValidationResult, SummaryError } from '../types/index';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export interface ValiderbarFormProps {
    onSubmit?: (evt: FormSubmitEvent) => void;
    children: React.ReactNode;
    summaryTitle?: string;
    noSummary?: boolean;
}

interface ValiderbarFormState {
    results: ValidationResult[];
    valid: boolean;
    failedSubmit: boolean;
}

class ValiderbarForm extends React.Component<
    ValiderbarFormProps,
    ValiderbarFormState
> {
    static childContextTypes = {
        validForm: PT.object
    };
    components: any[];

    constructor(props: ValiderbarFormProps) {
        super(props);

        this.state = {
            results: [],
            valid: true,
            failedSubmit: false
        };

        this.components = [];
        this.onSubmit = this.onSubmit.bind(this);
    }

    getChildContext() {
        return {
            validForm: {
                register: this.registerComponent.bind(this),
                unregister: this.unRegisterComponent.bind(this),
                onChange: this.onChange.bind(this),
                onBlur: this.onBlur.bind(this)
            }
        };
    }

    onChange(e: any, component: React.ComponentType) {
        if (this.state.failedSubmit) {
            this.validateOne(component);
        }
    }

    onBlur(e: any, component: React.ComponentType) {
        if (this.state.failedSubmit) {
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
            setTimeout(() => {
                const results = this.state.results.slice();
                const fieldResult = this.components[index].validate();
                results[index] = fieldResult;
                const valid = results.every((result) => result.valid === true);

                this.setState({
                    results,
                    valid,
                    failedSubmit: this.state.failedSubmit && !valid
                });
            });
        }
    }

    validateAll() {
        const results = this.components.map((component) =>
            component.validate()
        );
        const valid = results.every((result) => result.valid === true);

        this.setState({
            results: results.slice(),
            valid,
            failedSubmit: this.state.failedSubmit && !valid
        });

        return valid;
    }

    registerComponent(component: React.Component) {
        if (this.components.indexOf(component) === -1) {
            this.components.push(component);
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

    mapResultsToErrorSummary(): SummaryError[] {
        return this.state.results
            .filter((result) => !result.valid)
            .map((result) => ({
                name: result.name,
                text: result.tests.find((test: any) => !test.verdict).failText
            }));
    }

    render() {
        const {
            onSubmit,
            noSummary = false,
            summaryTitle,
            ...other
        } = this.props;
        let summaryBox;
        if (this.state.failedSubmit && !this.state.valid && !noSummary) {
            summaryBox = (
                <Feiloppsummering
                    title={summaryTitle || ''}
                    show={true}
                    errors={this.mapResultsToErrorSummary()}
                />
            );
        }

        return (
            <form onSubmit={this.onSubmit} {...other}>
                {summaryBox}
                {this.props.children}
            </form>
        );
    }
}

export default ValiderbarForm;
