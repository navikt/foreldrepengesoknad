import React from 'react';
import { Validator } from 'common/lib/validation/types';
import PT from 'prop-types';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

export interface ValiderbarComponentProps {
    name: string;
    validators?: Validator[];
}

export interface Props extends ValiderbarComponentProps {
    render: (validate: () => void, feil: Feil | undefined) => JSX.Element;
}

interface State {
    tests: any[];
    valid: boolean;
}

class ValiderbarComponent extends React.Component<Props, State> {
    static contextTypes = {
        validForm: PT.object
    };
    context: any;
    constructor(props: Props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.runValidation = this.runValidation.bind(this);
        this.state = {
            tests: [],
            valid: true
        };
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

    getFirstFailedVerdict() {
        return this.state.tests.find((test) => !test.verdict);
    }

    validate() {
        return this.runValidation();
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
                verdict: validator.test(),
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
        return render(this.validate, failedVerdict);
    }
}
export default ValiderbarComponent;
