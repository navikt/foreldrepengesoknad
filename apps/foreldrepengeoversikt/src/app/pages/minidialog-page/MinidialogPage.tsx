import { useMutation } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import { Heading, VStack } from '@navikt/ds-react';

import { useDocumentTitle } from '@navikt/fp-utils';

import { sendEttersending } from 'app/api/api';
import ContentSection from 'app/components/content-section/ContentSection';
import MinidialogSkjema from 'app/components/minidialog-skjema/MinidialogSkjema';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import EttersendingDto from 'app/types/EttersendingDTO';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { SakOppslag } from 'app/types/SakOppslag';
import { getAlleYtelser } from 'app/utils/sakerUtils';

interface Props {
    fnr: string;
    minidialoger: MinidialogInnslag[];
    saker: SakOppslag;
}

const MinidialogPage: React.FunctionComponent<Props> = ({ fnr, minidialoger, saker }) => {
    const params = useParams();
    const navigate = useNavigate();
    const intl = useIntl();
    useDocumentTitle(
        `${intl.formatMessage({ id: 'oppgaver.tittel.tilbakebetaling' })} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );
    useSetSelectedRoute(OversiktRoutes.OPPGAVER);
    const alleSaker = getAlleYtelser(saker);
    const sak = alleSaker.find((s) => s.saksnummer === params.saksnummer);
    const minidialog = minidialoger.find((d) => d.saksnr === params.saksnummer);
    useSetBackgroundColor('blue');

    const { mutate, isPending, isError, isSuccess } = useMutation({
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

    const sakstype = sak ? sak.ytelse : undefined;

    return (
        <ContentSection>
            <VStack gap="2">
                <Heading size="medium" level="2">
                    <FormattedMessage id="miniDialog.tilbakekreving.undertittel" />
                </Heading>
                <MinidialogSkjema
                    sakstype={sakstype!}
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
    );
};

export default MinidialogPage;
