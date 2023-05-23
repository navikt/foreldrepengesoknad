import { LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import OversiktRoutes from 'app/routes/routes';

import { Link } from 'react-router-dom';

import './se-hele-prosessen.css';

const SeHeleProsessen = () => {
    const bem = bemUtils('se-hele-prosessen');

    return (
        <LinkPanel as={Link} to={OversiktRoutes.TIDSLINJEN} border={false} className={bem.element('linkPanel')}>
            <LinkPanel.Title as="h2">
                <div className={bem.block}>Se hele prosessen</div>
            </LinkPanel.Title>
        </LinkPanel>
    );
};

export default SeHeleProsessen;
