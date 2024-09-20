import { Alert } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
}

const NoeGikkGalt: React.FunctionComponent<Props> = ({ children }) => {
    return <Alert variant="info">{children}</Alert>;
};

export default NoeGikkGalt;
