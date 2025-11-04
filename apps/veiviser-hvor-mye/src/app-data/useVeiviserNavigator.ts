import { HvorMyeRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';

export const useVeiviserNavigator = () => {
    const navigate = useNavigate();

    const goToRoute = (path: HvorMyeRoutes) => {
        navigate(path);
    };

    return { goToRoute };
};
