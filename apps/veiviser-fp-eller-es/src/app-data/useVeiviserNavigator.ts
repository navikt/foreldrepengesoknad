import { FpEllerEsRoutes } from 'appData/routes';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

const useVeiviserNavigator = () => {
    const navigate = useNavigate();

    const goToRoute = useCallback(
        (path: FpEllerEsRoutes) => {
            logAmplitudeEvent('sidevisning', {
                app: path,
                team: 'foreldrepenger',
                pageKey: path,
            });

            navigate(path);
        },
        [navigate],
    );

    return { goToRoute };
};

export default useVeiviserNavigator;
