import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { hentSakerOptions } from './../api/api';
import { getAlleYtelser, mapSakerDTOToSaker } from './../utils/sakerUtils';

export const useGetSelectedSak = () => {
    const params = useParams();
    const saker = useQuery({
        ...hentSakerOptions(),
        select: mapSakerDTOToSaker,
    }).data;

    if (!saker) {
        return undefined;
    }

    return getAlleYtelser(saker).find((sak) => sak.saksnummer === params.saksnummer)!;
};
