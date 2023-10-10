import { FunctionComponent } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage as AkselErrorMessage } from '@navikt/ds-react';

interface Props {
    name: string;
}

const ErrorMessageHookForm: FunctionComponent<Props> = ({ name }) => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <AkselErrorMessage>{message}</AkselErrorMessage>}
        />
    );
};

export default ErrorMessageHookForm;
