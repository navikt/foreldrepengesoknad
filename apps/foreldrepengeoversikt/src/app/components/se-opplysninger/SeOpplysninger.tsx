import { LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import OversiktRoutes from 'app/routes/routes';
import React from 'react';
import { Link } from 'react-router-dom';

import './se-opplysninger.css';

const SeOpplysninger = () => {
    const bem = bemUtils('se-opplysninger');

    return (
        <LinkPanel as={Link} to={OversiktRoutes.OPPLYSNINGER} border={false} className={bem.element('linkPanel')}>
            <LinkPanel.Title as="h2">
                <div className={bem.block}>Se opplysninger om saken</div>
            </LinkPanel.Title>
        </LinkPanel>
    );
};

export default SeOpplysninger;
