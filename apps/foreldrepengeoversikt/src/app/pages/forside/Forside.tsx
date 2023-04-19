import React from 'react';
import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import HarSaker from 'app/components/har-saker/HarSaker';
import { bemUtils } from '@navikt/fp-common';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak } from 'app/types/Sak';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import SakLink from 'app/components/sak-link/SakLink';

import './forside.css';

interface Props {
    alleYtelser: Sak[];
    grupperteSaker: GruppertSak[];
    avslåttSvangerskapspengesak: SvangerskapspengeSak | undefined;
}

const Forside: React.FunctionComponent<Props> = ({ alleYtelser, grupperteSaker, avslåttSvangerskapspengesak }) => {
    const bem = bemUtils('forside');
    useSetSelectedRoute(OversiktRoutes.HOVEDSIDE);

    return (
        <div className={bem.block}>
            {alleYtelser.length > 0 ? <HarSaker grupperteSaker={grupperteSaker} /> : <HarIkkeSaker />}
            {avslåttSvangerskapspengesak && <SakLink sak={avslåttSvangerskapspengesak} />}
        </div>
    );
};

export default Forside;
