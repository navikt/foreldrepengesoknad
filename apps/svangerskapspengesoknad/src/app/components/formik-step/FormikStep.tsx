import React, { FunctionComponent, ReactElement } from 'react';
import { CustomFormikProps } from 'app/types/Formik';
import Step from '../step/Step';

import SøknadStep from 'app/types/SøknadStep';
import useFormikSubmit from 'app/hooks/useFormikSubmit';
import { useIsValid } from 'app/connectedComponents/formik-wrapper/FormikWrapper';

interface Props {
    step: SøknadStep;
    formikProps: CustomFormikProps;
    onValidFormSubmit?: () => void;
    showNesteknapp: boolean;
    className?: string;
    children: ReactElement | ReactElement[];
}

const FormikStep: FunctionComponent<Props> = (props) => {
    const { formikProps, onValidFormSubmit } = props;

    const isValid = useIsValid(formikProps.values);

    useFormikSubmit(formikProps.isSubmitting, isValid, () => {
        if (onValidFormSubmit) {
            onValidFormSubmit();
        }
    });

    return <Step {...props} />;
};

export default FormikStep;
