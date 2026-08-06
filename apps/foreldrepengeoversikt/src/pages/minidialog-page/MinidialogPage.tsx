import { useMutation, useQuery } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import { Navigate, useParams } from 'react-router-dom';

import { Heading, Loader, VStack } from '@navikt/ds-react';

import { EttersendelseDto } from '@navikt/fp-types';
import { useDocumentTitle } from '@navikt/fp-utils';

import { minidialogOptions, sendEttersending } from '../../api/queries.ts';
import { ContentSection } from '../../components/content-section/ContentSection';
import { DinSakHeader } from '../../components/header/Header';
import { MinidialogSkjema } from '../../components/minidialog-skjema/MinidialogSkjema';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';

export const MinidialogPage = () => {
    const params = useParams();
    const minidialogQuery = useQuery({
        ...minidialogOptions(),
        select: (data) => data.find(({ saksnummer }) => saksnummer === params.saksnummer),
    });

    const sak = useGetSelectedSak();

    const intl = useIntl();
    useDocumentTitle(
        `${intl.formatMessage({ id: 'oppgaver.tittel.tilbakebetaling' })} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );
    useSetSelectedRoute(OversiktRoutes.OPPGAVER);
    useSetBackgroundColor('blue');

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: (ettersendelse: EttersendelseDto) => sendEttersending(ettersendelse),
    });

    if (minidialogQuery.isPending) {
        return <Loader />;
    }

    const minidialog = minidialogQuery.data;
    if (!minidialog || !sak) {
        return <Navigate to={`${OversiktRoutes.SAKSOVERSIKT}/${params.saksnummer}`} />;
    }

    return (
        <PageRouteLayout header={<DinSakHeader sak={sak} />}>
            <ContentSection>
                <VStack gap="space-8">
                    <Heading size="medium" level="2">
                        <FormattedMessage id="miniDialog.tilbakekreving.undertittel" />
                    </Heading>
                    <MinidialogSkjema
                        sakstype={sak.ytelse}
                        minidialog={minidialog}
                        onSubmit={mutate}
                        isSendingEttersendelse={isPending}
                        ettersendelseErSendt={isSuccess}
                        ettersendelseError={
                            isError
                                ? 'Vi klarte ikke å sende inn informasjonen din. Prøv igjen senere og hvis problemet vedvarer kontakt brukerstøtte.'
                                : undefined
                        }
                    />
                </VStack>
            </ContentSection>
        </PageRouteLayout>
    );
};
