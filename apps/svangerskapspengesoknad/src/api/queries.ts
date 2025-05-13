import { queryOptions } from '@tanstack/react-query';
import ky from 'ky';
import { tilSkjematilstandFraEksisterendeSak } from 'utils/endresøknadUtils';

import { Saker } from '../../../../packages/types';

export function hentSakerOptions() {
    return queryOptions({
        queryKey: ['SAKER'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`).json<Saker>(),
        select: (saker) => {
            const svpSak = saker.svangerskapspenger[0]; //TODO: gal antagelse om bare 1 sak
            if (!svpSak) {
                return undefined;
            }

            const a = tilSkjematilstandFraEksisterendeSak(svpSak);
            console.log(a);
            return a;
        },
    });
}
