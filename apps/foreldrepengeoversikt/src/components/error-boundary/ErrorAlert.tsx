import { Alert } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
}

export const ErrorAlert = ({ children }: Props) => {
    return (
        <Alert variant="info" className="m-8 mr-auto ml-auto w-[704px]">
            {children}
        </Alert>
    );
};
