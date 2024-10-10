import { useMutation, useQuery } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import { Heading, VStack } from '@navikt/ds-react';

import { useDocumentTitle } from '@navikt/fp-utils';

import { minidialogOptions, sendEttersending } from './../../api/api';
import ContentSection from './../../components/content-section/ContentSection';
import { DinSakHeader } from './../../components/header/Header';
import MinidialogSkjema from './../../components/minidialog-skjema/MinidialogSkjema';
import { useSetBackgroundColor } from './../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from './../../hooks/useSelectedRoute';
import { useGetSelectedSak } from './../../hooks/useSelectedSak';
import { PageRouteLayout } from './../../routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from './../../routes/routes';
import EttersendingDto from './../../types/EttersendingDTO';

interface Props {
    fnr: string;
}

const MinidialogPage: React.FunctionComponent<Props> = ({ fnr }) => {
    const params = useParams();
    const minidialog = useQuery({
        ...minidialogOptions(),
        select: (data) =>
            data.find(({ saksnr, dialogId }) => saksnr === params.saksnummer && dialogId === params.oppgaveId),
    }).data;
    const sak = useGetSelectedSak();

    const navigate = useNavigate();
    const intl = useIntl();
    useDocumentTitle(
        `${intl.formatMessage({ id: 'oppgaver.tittel.tilbakebetaling' })} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );
    useSetSelectedRoute(OversiktRoutes.OPPGAVER);
    useSetBackgroundColor('blue');

    const { mutate, isPending, isError, isSuccess } = useMutation({
        //TODO FIX eslint-feil
        // eslint-disable-next-line @typescript-eslint/no-shadow
        mutationFn: ({ ettersendelse, fnr }: { ettersendelse: EttersendingDto; fnr: string }) =>
            sendEttersending(ettersendelse, fnr),
    });

    const sendEttersendelse = (ettersendelse: EttersendingDto) => {
        mutate({ ettersendelse, fnr });
    };

    if (!minidialog || !sak) {
        navigate(`${OversiktRoutes.SAKSOVERSIKT}/${params.saksnummer}`);
        return null;
    }

    return (
        <PageRouteLayout header={<DinSakHeader sak={sak} />}>
            <ContentSection>
                <VStack gap="2">
                    <Heading size="medium" level="2">
                        <FormattedMessage id="miniDialog.tilbakekreving.undertittel" />
                    </Heading>
                    <MinidialogSkjema
                        sakstype={sak.ytelse}
                        minidialog={minidialog}
                        onSubmit={sendEttersendelse}
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

export default MinidialogPage;
