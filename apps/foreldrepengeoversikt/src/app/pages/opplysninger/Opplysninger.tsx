import { Alert } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import Sorry from 'assets/Sorry';
import React from 'react';

import './opplysninger.css';

const Opplysninger = () => {
    const bem = bemUtils('opplysninger');
    useSetSelectedRoute(OversiktRoutes.OPPLYSNINGER);

    return (
        <div className={bem.block}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Sorry />
            </div>
            <Alert variant="info" fullWidth>
                Vi jobber med å implementere denne siden. Vi beklager problemer det kan medføre.
            </Alert>
        </div>
    );
};

export default Opplysninger;
