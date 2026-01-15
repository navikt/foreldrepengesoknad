import { Buildings3Icon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

import { Tag, VStack } from '@navikt/ds-react';

import { formaterDatoUtenDag } from '@navikt/fp-utils';

import { hentInntektsmelding } from '../../api/queries.ts';
import { InntektsmeldingOversiktHeader } from '../../components/header/Header';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';

export const InntektsmeldingOversiktPage = () => {
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.INNTEKTSMELDING);

    const params = useParams();
    const inntektsmeldinger = useQuery(hentInntektsmelding(params.saksnummer!)).data ?? [];
    const aktiveInntektsmeldinger = inntektsmeldinger.filter((im) => im.erAktiv);

    if (aktiveInntektsmeldinger.length === 0) {
        return <Navigate replace to={'..'} />;
    }

    return (
        <PageRouteLayout header={<InntektsmeldingOversiktHeader />}>
            <VStack gap="space-16">
                {aktiveInntektsmeldinger.map((im) => (
                    <LenkePanel
                        key={im.journalpostId}
                        tittel={im.arbeidsgiverNavn}
                        undertittel={`Sendt ${formaterDatoUtenDag(im.mottattTidspunkt)}`}
                        tag={
                            im.stillingsprosent ? (
                                <Tag size="small" variant="success">
                                    {im.stillingsprosent}% stilling
                                </Tag>
                            ) : null
                        }
                        to={im.journalpostId}
                        Ikon={Buildings3Icon}
                    />
                ))}
            </VStack>
        </PageRouteLayout>
    );
};
