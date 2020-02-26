import React from 'react';
import { ValidFormContext } from 'common/lib/validation/elements/ValiderbarForm';

export interface Props {
    render: (validateField: (componentId: string) => void, validateAll: () => void) => JSX.Element;
}

class ValiderbarControl extends React.Component<Props> {
    context: ValidFormContext;

    constructor(props: Props) {
        super(props);
        this.validateField = this.validateField.bind(this);
        this.validateAll = this.validateAll.bind(this);
    }

    validateField(componentId: string) {
        if (this.context) {
            this.context.validForm.validateField(componentId, true);
        }
    }

    validateAll() {
        if (this.context) {
            this.context.validForm.validateAll();
        }
    }

    render() {
        const { render } = this.props;
        return render(this.validateField, this.validateAll);
    }
}
export default ValiderbarControl;
