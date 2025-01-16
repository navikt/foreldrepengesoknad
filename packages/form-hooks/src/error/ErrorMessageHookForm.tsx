import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import { ErrorMessage as AkselErrorMessage } from '@navikt/ds-react';

interface Props {
    name: string;
}

export const ErrorMessageHookForm = ({ name }: Props) => {
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
