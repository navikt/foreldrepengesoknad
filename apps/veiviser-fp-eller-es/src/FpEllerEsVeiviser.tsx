import { useQuery } from '@tanstack/react-query';
import { hentSatserOptions } from 'appData/queries';

import { SimpleErrorPage, Spinner } from '@navikt/fp-ui';

import { FpEllerEsRouter } from './FpEllerEsRouter';

export const FpEllerEsVeiviser = () => {
    const satserData = useQuery(hentSatserOptions());

    if (satserData.error) {
        return <SimpleErrorPage />;
    }

    if (!satserData.data) {
        return <Spinner />;
    }

    return <FpEllerEsRouter satser={satserData.data} />;
};
