import { Alert } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const NoeGikkGalt = ({ children, className }: Props) => {
    return (
        <Alert className={className} variant="info">
            {children}
        </Alert>
    );
};
