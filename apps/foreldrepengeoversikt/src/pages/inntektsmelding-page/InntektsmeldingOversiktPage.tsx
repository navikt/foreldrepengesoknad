import { Buildings3Icon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

import { VStack } from '@navikt/ds-react';

import { formaterDatoUtenDag } from '@navikt/fp-utils';

import { hentInntektsmelding } from '../../api/api';
import { InntektsmeldingOversiktHeader } from '../../components/header/Header';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from '../../routes/routes';

export const InntektsmeldingOversiktPage = () => {
    useSetBackgroundColor('white');

    const params = useParams();
    const inntektsmeldinger = useQuery(hentInntektsmelding(params.saksnummer!)).data ?? [];
    const aktiveInntektsmeldinger = inntektsmeldinger.filter((im) => im.erAktiv);

    if (aktiveInntektsmeldinger.length === 0) {
        return null; // TODO
    }
    if (aktiveInntektsmeldinger.length === 1) {
        return (
            <Navigate replace to={`${OversiktRoutes.INNTEKTSMELDING}/${aktiveInntektsmeldinger[0].journalpostId}`} />
        );
    }

    return (
        <PageRouteLayout header={<InntektsmeldingOversiktHeader />}>
            <VStack gap="4">
                {aktiveInntektsmeldinger.map((im) => (
                    <LenkePanel
                        key={im.journalpostId}
                        tittel={im.arbeidsgiverNavn}
                        undertittel={`Sendt ${formaterDatoUtenDag(im.mottattTidspunkt)}`}
                        to={im.journalpostId}
                        Ikon={Buildings3Icon}
                    />
                ))}
            </VStack>
        </PageRouteLayout>
    );
};
