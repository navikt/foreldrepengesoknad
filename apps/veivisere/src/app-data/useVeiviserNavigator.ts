import { ContextRoutes, HvaSkjerNårRoutes, HvorMyeRoutes } from 'appData/routes';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

import { VeiviserAmplitudeKey } from './veiviserAmplitudeKey';

const getApp = (contextRoute: ContextRoutes): string => {
    return contextRoute === ContextRoutes.HVA_SKJER
        ? VeiviserAmplitudeKey.HVA_SKJER_NÅR
        : VeiviserAmplitudeKey.HVOR_MYE;
};

const useVeiviserNavigator = (contextRoute: ContextRoutes) => {
    const navigate = useNavigate();

    const goToRoute = useCallback(
        (path: HvorMyeRoutes | HvaSkjerNårRoutes) => {
            const newPath = contextRoute + path;

            logAmplitudeEvent('sidevisning', {
                app: getApp(contextRoute),
                team: 'foreldrepenger',
                pageKey: newPath,
            });

            navigate(newPath);
        },
        [contextRoute, navigate],
    );

    return { goToRoute };
};

export default useVeiviserNavigator;
