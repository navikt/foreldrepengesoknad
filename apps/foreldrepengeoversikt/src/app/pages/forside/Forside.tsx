import React from 'react';
import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import HarSaker from 'app/components/har-saker/HarSaker';
import { bemUtils } from '@navikt/fp-common';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';

import './forside.css';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak } from 'app/types/Sak';

interface Props {
    alleYtelser: Sak[];
    grupperteSaker: GruppertSak[];
}

const Forside: React.FunctionComponent<Props> = ({ alleYtelser, grupperteSaker }) => {
    const bem = bemUtils('forside');
    useSetSelectedRoute(OversiktRoutes.HOVEDSIDE);

    return (
        <div className={bem.block}>
            {alleYtelser.length > 0 ? <HarSaker grupperteSaker={grupperteSaker} /> : <HarIkkeSaker />}
        </div>
    );
};

export default Forside;
