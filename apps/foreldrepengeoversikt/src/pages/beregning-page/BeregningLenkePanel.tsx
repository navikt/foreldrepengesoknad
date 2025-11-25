import { SackKronerIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { hentBeregningOptions } from '../../api/queries.ts';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { OversiktRoutes } from '../../routes/routes';

export const BeregningLenkePanel = () => {
    const params = useParams();

    const beregning = useQuery(hentBeregningOptions(params.saksnummer!)).data;

    if (beregning === undefined) {
        return null;
    }

    return <LenkePanel tittel="Din beregning" to={OversiktRoutes.BEREGNING} Ikon={SackKronerIcon} />;
};
