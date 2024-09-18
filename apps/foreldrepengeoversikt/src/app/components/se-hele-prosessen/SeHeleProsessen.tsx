import { Link } from 'react-router-dom';

import { LinkPanel } from '@navikt/ds-react';

import OversiktRoutes from 'app/routes/routes';

const SeHeleProsessen = () => {
    // TODO: border
    return (
        <LinkPanel as={Link} to={OversiktRoutes.TIDSLINJEN} border={false} className="rounded-lg">
            <LinkPanel.Title as="h2">Se hele prosessen</LinkPanel.Title>
        </LinkPanel>
    );
};

export default SeHeleProsessen;
