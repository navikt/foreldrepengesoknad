import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { hentBeregningOptions } from '../../api/queries.ts';

export const BeregningPage = () => {
    const params = useParams();

    const beregning = useQuery(hentBeregningOptions(params.saksnummer!)).data;

    if (beregning === undefined) {
        return null;
    }

    return <p>Beregning</p>;
};
