import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Alert, BodyShort, Loader } from '@navikt/ds-react';

import { hentBeregningOptions } from '../../api/queries.ts';
import { BeregningHeader } from '../../components/header/Header.tsx';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes.tsx';

export const BeregningPage = () => {
    const params = useParams();

    const beregningQuery = useQuery(hentBeregningOptions(params.saksnummer!));

    if (beregningQuery.isPending) {
        return (
            <PageRouteLayout header="">
                <div className="flex flex-col items-center justify-center gap-4">
                    <Loader size="2xlarge" />
                    <BodyShort>Henter beregningen din…</BodyShort>
                </div>
            </PageRouteLayout>
        );
    }
    if (beregningQuery.isError) {
        return (
            <PageRouteLayout header="">
                <Alert variant="error">Noe gikk galt. Prøv igjen senere</Alert>
            </PageRouteLayout>
        );
    }
    return (
        <PageRouteLayout header={<BeregningHeader />}>
            <p>{beregningQuery.data.skjæringsTidspunkt}</p>
        </PageRouteLayout>
    );
};
