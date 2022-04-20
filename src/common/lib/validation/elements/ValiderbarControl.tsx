import React from 'react';
import { ValidFormContext } from 'common/lib/validation/elements/ValiderbarForm';

export interface Props {
    render: (validateField: (componentId: string) => void, validateAll: () => void) => JSX.Element;
}

const ValiderbarControl: React.FunctionComponent<Props> = ({ render }) => {
    const formContext = React.useContext(ValidFormContext);
    const validateField = React.useCallback(
        (componentId: string) => formContext.validateField(componentId, true),
        [formContext]
    );

    return render(validateField, formContext.validateAll);
};

export default ValiderbarControl;
