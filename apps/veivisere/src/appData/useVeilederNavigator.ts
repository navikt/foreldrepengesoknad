import { ContextRoutes, FpEllerEsRoutes, HvaSkjerNårRoutes, HvorMyeRoutes } from 'appData/routes';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

const useVeilederNavigator = (contextRoute: ContextRoutes) => {
    const navigate = useNavigate();

    const goToRoute = useCallback(
        (path: HvorMyeRoutes | HvaSkjerNårRoutes | FpEllerEsRoutes) => {
            const newPath = contextRoute + path;

            logAmplitudeEvent('sidevisning', {
                app: 'veiledere',
                team: 'foreldrepenger',
                pageKey: newPath,
            });

            navigate(newPath);
        },
        [contextRoute, navigate],
    );

    return { goToRoute };
};

export default useVeilederNavigator;
