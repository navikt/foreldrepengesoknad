import { Buildings3Icon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';
import { Navigate, useParams } from 'react-router';

import { Alert, BodyShort, Loader, Tag, VStack } from '@navikt/ds-react';

import { formaterDatoUtenDag } from '@navikt/fp-utils';

import { hentInntektsmelding } from '../../api/queries.ts';
import { InntektsmeldingOversiktHeader } from '../../components/header/Header';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';

export const InntektsmeldingOversiktPage = () => {
    const params = useParams();
    const inntektsmeldingerQuery = useQuery(hentInntektsmelding(params.saksnummer!));

    if (inntektsmeldingerQuery.isPending) {
        return (
            <PageRouteLayout header={<InntektsmeldingOversiktHeader />}>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Loader size="2xlarge" />
                    <BodyShort>
                        <FormattedMessage id="inntektsmelding.laster" />
                    </BodyShort>
                </div>
            </PageRouteLayout>
        );
    }

    if (inntektsmeldingerQuery.isError) {
        return (
            <PageRouteLayout header={<InntektsmeldingOversiktHeader />}>
                <Alert variant="error">
                    <FormattedMessage id="felles.feil.prøvSenere" />
                </Alert>
            </PageRouteLayout>
        );
    }

    const aktiveInntektsmeldinger = inntektsmeldingerQuery.data.filter((im) => im.erAktiv);

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
                                <Tag data-color="success" size="small" variant="outline">
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
