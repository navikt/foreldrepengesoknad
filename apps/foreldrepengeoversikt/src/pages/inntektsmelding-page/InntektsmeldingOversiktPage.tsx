import { Buildings3Icon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { groupBy } from 'lodash';
import { Navigate, useParams } from 'react-router-dom';

import { Tag, VStack } from '@navikt/ds-react';

import { formaterDatoUtenDag } from '@navikt/fp-utils';

import { hentInntektsmelding } from '../../api/api';
import { InntektsmeldingOversiktHeader } from '../../components/header/Header';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from '../../routes/routes';

export const InntektsmeldingOversiktPage = () => {
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.INNTEKTSMELDING);

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

    const imPerArbeidsgiver = groupBy(aktiveInntektsmeldinger, (im) => im.arbeidsgiverNavn);

    return (
        <PageRouteLayout header={<InntektsmeldingOversiktHeader />}>
            <VStack gap="4">
                {Object.values(imPerArbeidsgiver).map((ims) =>
                    ims.map((im) => (
                        <LenkePanel
                            key={im.journalpostId}
                            tittel={im.arbeidsgiverNavn}
                            undertittel={`Sendt ${formaterDatoUtenDag(im.mottattTidspunkt)}`}
                            tag={
                                ims.length > 1 && im.stillingsprosent ? (
                                    <Tag size="small" variant="success">
                                        {im.stillingsprosent}% stilling
                                    </Tag>
                                ) : null
                            }
                            to={im.journalpostId}
                            Ikon={Buildings3Icon}
                        />
                    )),
                )}
            </VStack>
        </PageRouteLayout>
    );
};
