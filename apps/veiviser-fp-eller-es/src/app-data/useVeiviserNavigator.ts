import { FpEllerEsRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';

export const useVeiviserNavigator = () => {
    const navigate = useNavigate();

    const goToRoute = (path: FpEllerEsRoutes) => {
        navigate(path);
    };

    return { goToRoute };
};
