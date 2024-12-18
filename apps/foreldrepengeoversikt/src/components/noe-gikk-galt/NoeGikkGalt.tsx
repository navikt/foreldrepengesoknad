import { Alert } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const NoeGikkGalt: React.FunctionComponent<Props> = ({ children, className }) => {
    return (
        <Alert className={className} variant="info">
            {children}
        </Alert>
    );
};
