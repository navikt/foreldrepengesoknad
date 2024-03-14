import { Alert } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import './noe-gikk-galt.css';

interface Props {
    children: React.ReactNode;
}

const NoeGikkGalt: React.FunctionComponent<Props> = ({ children }) => {
    const bem = bemUtils('noe-gikk-galt');

    return (
        <Alert className={bem.block} variant="info">
            {children}
        </Alert>
    );
};

export default NoeGikkGalt;
