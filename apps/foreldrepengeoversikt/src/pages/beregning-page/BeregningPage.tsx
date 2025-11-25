import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Alert, BodyShort, Loader, VStack } from '@navikt/ds-react';

import { BeregningV1_fpoversikt, BeregningsAndel_fpoversikt } from '@navikt/fp-types';
import { formatCurrency, formatDate } from '@navikt/fp-utils';

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
            <VStack gap="2">
                <BeregningStatuser beregning={beregning} />
                <BodyShort>
                    Dette er bestemt utifra hvilke aktiviteter du hadde {formatDate(beregning.skjæringsTidspunkt)}
                </BodyShort>
                <BodyShort>Beregningen din er gjort utifra disse andelene</BodyShort>
                <VStack gap="2">
                    {beregning.beregningsAndeler.map((andel) => (
                        <BeregningAndel andel={andel} key={andel.aktivitetStatus} />
                    ))}
                </VStack>
            </VStack>
        </PageRouteLayout>
    );
};

const BeregningAndel = ({ andel }: { andel: BeregningsAndel_fpoversikt }) => {
    return (
        <VStack>
            <BodyShort>
                {finnStatus(andel.aktivitetStatus)} - {andel.arbeidsforhold?.arbeidsgiverIdent}
            </BodyShort>
            <BodyShort>
                Din inntekt for denne andelen er satt til {formatCurrency(andel.fastsattPrMnd ?? 0)} kroner per måned.
            </BodyShort>
            <BodyShort>Denne andelen har en dagsats på {formatCurrency(andel.dagsats ?? 0)} kroner.</BodyShort>
            <BodyShort>
                Denne dagsatsen vil bli utbetalt{' '}
                {(andel.arbeidsforhold?.refusjonPrMnd ?? 0) > 0 ? 'til arbeidsgiver' : 'direkte til deg'}
            </BodyShort>
        </VStack>
    );
};
// TODO enum
const finnStatus = (status: string) => {
    switch (status) {
        case 'AT':
            return 'arbeidstaker';
        case 'FL':
            return 'frilans';
        case 'AT_FL':
            return 'kombinert arbeidstaker og frilanser';
        default:
            return '';
        // TODO mere greier
    }
};

const BeregningStatuser = ({ beregning }: { beregning: BeregningV1_fpoversikt }) => {
    const statuser = beregning.beregningAktivitetStatuser.map((status) => {
        return finnStatus(status.aktivitetStatus);
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
