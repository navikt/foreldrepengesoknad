import React from 'react';
import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import HarSaker from 'app/components/har-saker/HarSaker';
import { getAlleYtelser, grupperSakerPåBarn } from 'app/utils/sakerUtils';
import { SakOppslag } from 'app/types/SakOppslag';
import { bemUtils } from '@navikt/fp-common';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';

import './forside.css';

interface Props {
    saker: SakOppslag;
}

const Forside: React.FunctionComponent<Props> = ({ saker }) => {
    const grupperteSaker = grupperSakerPåBarn(saker);
    const bem = bemUtils('forside');
    const alleYtelser = getAlleYtelser(saker);
    useSetSelectedRoute(OversiktRoutes.HOVEDSIDE);

    return (
        <div className={bem.block}>
            {alleYtelser.length > 0 ? <HarSaker grupperteSaker={grupperteSaker} /> : <HarIkkeSaker />}
        </div>
    );
};

export default Forside;
