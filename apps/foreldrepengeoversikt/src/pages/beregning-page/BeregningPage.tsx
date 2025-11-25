import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Alert, BodyShort, Loader, VStack } from '@navikt/ds-react';

import { BeregningV1_fpoversikt } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

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
    const beregning = beregningQuery.data;
    return (
        <PageRouteLayout header={<BeregningHeader />}>
            <BeregningStatuser beregning={beregning} />
            <p>Dette er bestemt utifra hvilke aktiviteter du hadde {formatDate(beregning.skjæringsTidspunkt)}</p>
        </PageRouteLayout>
    );
};

const BeregningStatuser = ({ beregning }: { beregning: BeregningV1_fpoversikt }) => {
    const statuser = beregning.beregningAktivitetStatuser.map((status) => {
        switch (status.aktivitetStatus) {
            case 'AT':
                return 'arbeidstaker';
            case 'AT_FL':
                return 'kombinert arbeidstaker og frilanser';
            default:
                return '';
            // TODO mere greier
        }
    });
    const hjemler = beregning.beregningAktivitetStatuser.map((status) => {
        switch (status.hjemmel) {
            case 'F_14_7_8_40':
                return 'folketrygdloven kapittel 14 paragraf 7 og kapittel 8 paragraf 40';
            default:
                return 'regler';
            // TODO mere greier
        }
    });

    return (
        <VStack>
            <BodyShort>Du er blitt beregnet som {statuser.join(', ')}</BodyShort>
            <BodyShort>Dette er hjemlet i {hjemler.join(', ')}</BodyShort>
        </VStack>
    );
};
