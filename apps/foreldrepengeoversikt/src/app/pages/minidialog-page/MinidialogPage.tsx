import { useState } from 'react';
import { Block, intlUtils } from '@navikt/fp-common';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import MinidialogSkjema from 'app/components/minidialog-skjema/MinidialogSkjema';
import { SakOppslag } from 'app/types/SakOppslag';
import { useNavigate, useParams } from 'react-router-dom';
import OversiktRoutes from 'app/routes/routes';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import EttersendingDto from 'app/types/EttersendingDTO';
import { useIntl } from 'react-intl';
import ContentSection from 'app/components/content-section/ContentSection';
import Api from 'app/api/api';
import { Heading } from '@navikt/ds-react';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';

interface Props {
    fnr: string;
    minidialoger: MinidialogInnslag[] | undefined;
    saker: SakOppslag;
}

const MinidialogPage: React.FunctionComponent<Props> = ({ fnr, minidialoger, saker }) => {
    const params = useParams();
    const navigate = useNavigate();
    useSetSelectedRoute(OversiktRoutes.OPPGAVER);
    const alleSaker = getAlleYtelser(saker);
    const sak = alleSaker.find((s) => s.saksnummer === params.saksnummer);
    const minidialog = minidialoger ? minidialoger.find((d) => d.saksnr === params.saksnummer) : undefined;
    const [isSendingEttersendelse, setIsSendingEttersendelse] = useState(false);
    const [ettersendelseErSendt, setEttersendelseErSendt] = useState(false);
    useSetBackgroundColor('blue');
    const intl = useIntl();

    const sendEttersendelse = (ettersendelse: EttersendingDto) => {
        setIsSendingEttersendelse(true);
        Api.sendEttersending(ettersendelse, fnr)
            .then(() => {
                setIsSendingEttersendelse(false);
                setEttersendelseErSendt(true);
            })
            .catch((_error) => {
                throw new Error(
                    `Vi klarte ikke å sende inn informasjonen din. Prøv igjen senere og hvis problemet vedvarer kontakt brukerstøtte.`
                );
            });
    };

    if (!minidialog || !sak) {
        navigate(OversiktRoutes.SAKSOVERSIKT);
        return null;
    }

    const sakstype = sak ? sak.ytelse : undefined;

    return (
        <ContentSection>
            <Block padBottom="xl">
                <Heading size="medium" level="2">
                    {intlUtils(intl, 'miniDialog.tilbakekreving.undertittel')}
                </Heading>
            </Block>
            <MinidialogSkjema
                sakstype={sakstype!}
                minidialog={minidialog}
                onSubmit={sendEttersendelse}
                isSendingEttersendelse={isSendingEttersendelse}
                ettersendelseErSendt={ettersendelseErSendt}
            />
        </ContentSection>
    );
};

export default MinidialogPage;
