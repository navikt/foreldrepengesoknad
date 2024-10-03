import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';

export const InntektsmeldingPage = () => {
    useSetSelectedRoute(OversiktRoutes.INNTEKTSMELDING);

    return <div>Hei</div>;
};
