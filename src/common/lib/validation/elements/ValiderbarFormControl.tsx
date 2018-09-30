import React from 'react';
import PT from 'prop-types';

export interface Props {
    render: (validateAll: () => void) => JSX.Element;
}

interface State {
    tests: any[];
    valid: boolean;
}

class ValiderbarFormControl extends React.Component<Props, State> {
    static contextTypes = {
        validForm: PT.object
    };
    context: any;
    constructor(props: Props) {
        super(props);
        this.validate = this.validate.bind(this);
    }
    validate() {
        this.context.validForm.validateAll();
    }
    render() {
        const { render } = this.props;
        return render(this.validate);
    }
}
export default ValiderbarFormControl;
