import { HvaSkjerNårRoutes } from 'appData/routes';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

import { veiviserAmplitudeKey } from './veiviserAmplitudeKey';

const useVeiviserNavigator = () => {
    const navigate = useNavigate();

    const goToRoute = useCallback(
        (path: HvaSkjerNårRoutes) => {
            logAmplitudeEvent('sidevisning', {
                app: veiviserAmplitudeKey,
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
