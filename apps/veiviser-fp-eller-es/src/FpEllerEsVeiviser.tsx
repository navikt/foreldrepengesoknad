import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import { Satser } from '@navikt/fp-types';
import { SimpleErrorPage, Spinner } from '@navikt/fp-ui';

import { FpEllerEsRouter } from './FpEllerEsRouter';

export const FpEllerEsVeiviser = () => {
    const satserData = useQuery({
        queryKey: ['SATSER'],
        queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/satser`).json<Satser>(),
    });

    if (satserData.error) {
        return <SimpleErrorPage />;
    }

    if (!satserData.data) {
        return <Spinner />;
    }

    return <FpEllerEsRouter satser={satserData.data} />;
};
