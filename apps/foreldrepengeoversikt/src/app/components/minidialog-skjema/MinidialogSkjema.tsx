import { useIntl, FormattedMessage } from 'react-intl';
import HvaLeggerNAVVektPå from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { formatDate, intlUtils, Block } from '@navikt/fp-common';
import { Alert, Button, Chat, ErrorMessage, GuidePanel, Radio, RadioGroup, Textarea, VStack } from '@navikt/ds-react';
import { Ytelse } from 'app/types/Ytelse';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Link } from 'react-router-dom';
import { mapMinidialogInputTilDTO } from './minidialogskjemaUtils';
import { validateFritekstFelt } from 'app/utils/validationUtils';
import ScrollToTop from '../scroll-to-top/ScrollToTop';
import { useQuery } from '@tanstack/react-query';
import Environment from 'app/Environment';
import { useState } from 'react';
import MinidialogVenterPåSvar from './minidialog-venter-på-svar/MinidialogVenterPåSvar';
import { FileUploader } from '@navikt/fp-ui';
import { getSaveAttachment } from '@navikt/fp-api';
import { Attachment } from '@navikt/fp-types';
import { Skjemanummer } from '@navikt/fp-constants';

export interface Props {
    ettersendelseErSendt: boolean;
    isSendingEttersendelse: boolean;
    minidialog: MinidialogInnslag;
    onSubmit: (ettersendelse: EttersendingDto) => void;
    sakstype: Ytelse;
    ettersendelseError: string | undefined;
}

const MinidialogSkjema: React.FunctionComponent<Props> = ({
    ettersendelseErSendt,
    isSendingEttersendelse,
    sakstype,
    minidialog,
    ettersendelseError,
    onSubmit,
}) => {
    const intl = useIntl();

    const [vedlegg, setVedlegg] = useState<Attachment[]>([]);
    const [brukerØnskerÅUttaleSeg, settBrukerØnskerÅUttaleSeg] = useState(false);
    const [tilbakemelding, settTilbakemelding] = useState<string>();
    const [tilbakemeldingValideringsfeil, settTilbakemeldingValideringsfeil] = useState<string>();

    const [fetchCounter, setFetchCounter] = useState(0);
    const [allowedToFetch, setAllowedToFetch] = useState(true);

    const minidialogQuery = useQuery<MinidialogInnslag[]>({
        queryKey: ['minidialog'],
        queryFn: async () => {
            setFetchCounter((prev) => prev + 1);
            return await fetch(`${Environment.REST_API_URL}/minidialog`, { credentials: 'include' }).then((response) =>
                response.json(),
            );
        },
        refetchInterval: (data) => {
            if (!data || (data && data.find((innslag) => innslag.dialogId === minidialog?.dialogId))) {
                return 1000;
            }

            if (ettersendelseErSendt) {
                setAllowedToFetch(false);
            }
            return false;
        },
        enabled: ettersendelseErSendt && fetchCounter < 30 && allowedToFetch,
    });

    if (!minidialogQuery.isLoading) {
        console.log(minidialogQuery.data);
    }

    if (ettersendelseErSendt) {
        return (
            <div>
                <ScrollToTop />
                <MinidialogVenterPåSvar
                    fetchCounter={fetchCounter}
                    allowedToFetch={allowedToFetch}
                    saksnummer={minidialog.saksnr}
                />
            </div>
        );
    }

    if (ettersendelseError) {
        return (
            <div>
                <ScrollToTop />
                <Block padBottom="l">
                    <Alert variant="error"> {ettersendelseError}</Alert>
                </Block>
                <Block padBottom="l">
                    <Link to={`/sak/${minidialog.saksnr}`}>
                        <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                    </Link>
                </Block>
            </div>
        );
    }

    const finnesPendingVedlegg = vedlegg ? !!vedlegg.find((file) => file.pending) : false;

    const handleSubmit = () => {
        const feilmelding = validateFritekstFelt(
            intl,
            intlUtils(intl, 'minidialog.tilbakekreving.tilbakekreving.label').replace(':', ''),
        )(tilbakemelding);

        if (feilmelding) {
            settTilbakemeldingValideringsfeil(feilmelding);
        } else {
            const submitData = mapMinidialogInputTilDTO(
                brukerØnskerÅUttaleSeg,
                vedlegg,
                tilbakemelding,
                minidialog.saksnr,
                sakstype,
                minidialog.dialogId,
            );
            onSubmit(submitData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap="10">
                <Chat
                    avatar="NAV"
                    name="NAV"
                    avatarBgColor="rgba(255, 236, 204, 1)"
                    backgroundColor="rgba(255, 249, 240, 1)"
                    timestamp={formatDate(minidialog.opprettet)}
                >
                    <Chat.Bubble>
                        <FormattedMessage id="miniDialog.tilbakekreving.tittel" />
                    </Chat.Bubble>
                </Chat>
                <HvaLeggerNAVVektPå />
                <RadioGroup
                    legend={intlUtils(intl, 'miniDialog.tilbakekreving.radioPanelGruppe.legend')}
                    onChange={(val: any) => settBrukerØnskerÅUttaleSeg(val)}
                >
                    <Radio value={true}>Ja</Radio>
                    <Radio value={false}>Nei</Radio>
                </RadioGroup>
                {brukerØnskerÅUttaleSeg === true && (
                    <>
                        <Textarea
                            label={intlUtils(intl, 'minidialog.tilbakekreving.tilbakekreving.label')}
                            onChange={(e) => settTilbakemelding(e.target.value)}
                        />
                        {tilbakemeldingValideringsfeil && <ErrorMessage>{tilbakemeldingValideringsfeil}</ErrorMessage>}
                        <FileUploader
                            updateAttachments={(attachment: Attachment[]) =>
                                setVedlegg((oldAttachments) => oldAttachments.concat(attachment))
                            }
                            existingAttachments={[]}
                            attachmentType="tilbakebetaling"
                            skjemanummer={Skjemanummer.TILBAKEBETALING}
                            saveAttachment={getSaveAttachment(Environment.REST_API_URL)}
                        />
                    </>
                )}
                {brukerØnskerÅUttaleSeg === false && (
                    <div className="blokk-xs">
                        <GuidePanel>
                            <FormattedMessage id="minidialog.tilbakekreving.veilederpanel" />
                        </GuidePanel>
                    </div>
                )}
                {brukerØnskerÅUttaleSeg && (
                    <Button
                        type="submit"
                        loading={isSendingEttersendelse || finnesPendingVedlegg}
                        disabled={isSendingEttersendelse || finnesPendingVedlegg}
                    >
                        <FormattedMessage id="miniDialog.tilbakekreving.sendButton" />
                    </Button>
                )}
            </VStack>
        </form>
    );
};

export default MinidialogSkjema;
