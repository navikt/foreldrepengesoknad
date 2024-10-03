import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { hentInntektsmelding } from 'app/api/api';
import { InntektsmeldingHeader } from 'app/components/header/Header';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { PageRouteLayout } from 'app/routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from 'app/routes/routes';

export const InntektsmeldingPage = () => {
    useSetSelectedRoute(OversiktRoutes.INNTEKTSMELDING);
    const params = useParams();

    const inntektsmelding = useQuery(hentInntektsmelding(params.saksnummer!)).data; //TODO: fiks !

    if (!inntektsmelding) {
        return null; // TODO: what to do
    }

    return <PageRouteLayout header={<InntektsmeldingHeader inntektsmelding={inntektsmelding} />}>Hei</PageRouteLayout>;
};
