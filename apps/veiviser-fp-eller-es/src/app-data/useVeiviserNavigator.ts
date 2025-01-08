import { FpEllerEsRoutes } from 'appData/routes';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useVeiviserNavigator = () => {
    const navigate = useNavigate();

    const goToRoute = useCallback(
        (path: FpEllerEsRoutes) => {
            navigate(path);
        },
        [navigate],
    );

    return { goToRoute };
};
