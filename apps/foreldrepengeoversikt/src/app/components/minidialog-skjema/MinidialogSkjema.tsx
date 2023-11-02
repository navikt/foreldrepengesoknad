import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import {
    Alert,
    Button,
    Chat,
    ErrorSummary,
    GuidePanel,
    HStack,
    Radio,
    RadioGroup,
    Textarea,
    VStack,
} from '@navikt/ds-react';
import { formatDate, intlUtils } from '@navikt/fp-common';
import { FileUploader } from '@navikt/fp-ui';
import { getSaveAttachment } from '@navikt/fp-api';
import { Attachment } from '@navikt/fp-types';
import { Skjemanummer, AttachmentType } from '@navikt/fp-constants';
import { Ytelse } from 'app/types/Ytelse';
import EttersendingDto from 'app/types/EttersendingDTO';
import { validateFritekstFelt } from 'app/utils/validationUtils';
import Environment from 'app/Environment';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import HvaLeggerNAVVektPå from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';
import ScrollToTop from '../scroll-to-top/ScrollToTop';
import { mapMinidialogInputTilDTO } from './minidialogskjemaUtils';
import MinidialogVenterPåSvar from './minidialog-venter-på-svar/MinidialogVenterPåSvar';

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
    const [brukerØnskerÅUttaleSeg, settBrukerØnskerÅUttaleSeg] = useState<boolean>();
    const [tilbakemelding, settTilbakemelding] = useState<string>();
    const [tilbakemeldingValideringsfeil, settTilbakemeldingValideringsfeil] = useState<string>();

    const [fetchCounter, setFetchCounter] = useState(0);
    const [allowedToFetch, setAllowedToFetch] = useState(true);

    useQuery<MinidialogInnslag[]>({
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

    const finnesPendingVedlegg = vedlegg ? vedlegg.some((file) => file.pending) : false;

    const handleSubmit = (e: FormEvent<any>) => {
        e.preventDefault();

        const feilmelding = brukerØnskerÅUttaleSeg
            ? validateFritekstFelt(
                  intl,
                  intlUtils(intl, 'minidialog.tilbakekreving.tilbakekreving.label').replace(':', ''),
                  tilbakemelding,
              )
            : undefined;

        if (feilmelding) {
            settTilbakemeldingValideringsfeil(feilmelding);
        } else if (brukerØnskerÅUttaleSeg !== undefined) {
            const submitData = mapMinidialogInputTilDTO(
                minidialog.saksnr,
                sakstype,
                minidialog.dialogId,
                brukerØnskerÅUttaleSeg,
                vedlegg,
                tilbakemelding,
            );
            onSubmit(submitData);
        }
    };

    if (ettersendelseErSendt) {
        return (
            <MinidialogVenterPåSvar
                fetchCounter={fetchCounter}
                allowedToFetch={allowedToFetch}
                saksnummer={minidialog.saksnr}
            />
        );
    }

    if (ettersendelseError) {
        return (
            <VStack gap="4">
                <ScrollToTop />
                <Alert variant="error"> {ettersendelseError}</Alert>
                <Link to={`/sak/${minidialog.saksnr}`}>
                    <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                </Link>
            </VStack>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap="8">
                <VStack gap="5">
                    <Chat
                        avatar="NAV"
                        name="NAV"
                        avatarBgColor="rgba(255, 236, 204, 1)"
                        backgroundColor="rgba(255, 249, 240, 1)"
                        timestamp={formatDate(minidialog.opprettet)}
                    >
                        <Chat.Bubble>
                            <FormattedMessage id="miniDialog.tilbakekreving.tittel" values={{ sakstype }} />
                        </Chat.Bubble>
                    </Chat>
                    <HvaLeggerNAVVektPå />
                </VStack>
                <RadioGroup
                    legend={intlUtils(intl, 'miniDialog.tilbakekreving.radioPanelGruppe.legend')}
                    onChange={settBrukerØnskerÅUttaleSeg}
                >
                    <Radio value={true}>Ja</Radio>
                    <Radio value={false}>Nei</Radio>
                </RadioGroup>
                {brukerØnskerÅUttaleSeg === true && (
                    <>
                        <div>
                            <Textarea
                                label={intlUtils(intl, 'minidialog.tilbakekreving.tilbakekreving.label')}
                                onChange={(e) => settTilbakemelding(e.target.value)}
                                error={tilbakemeldingValideringsfeil}
                            />
                        </div>
                        <FileUploader
                            updateAttachments={setVedlegg}
                            attachmentType={AttachmentType.TILBAKEBETALING}
                            skjemanummer={Skjemanummer.TILBAKEBETALING}
                            saveAttachment={getSaveAttachment(Environment.REST_API_URL)}
                        />
                    </>
                )}
                {brukerØnskerÅUttaleSeg === false && (
                    <GuidePanel>
                        <FormattedMessage id="minidialog.tilbakekreving.veilederpanel" />
                    </GuidePanel>
                )}
                {brukerØnskerÅUttaleSeg !== undefined && (
                    <HStack>
                        <Button
                            type="submit"
                            loading={isSendingEttersendelse || finnesPendingVedlegg}
                            disabled={isSendingEttersendelse || finnesPendingVedlegg}
                        >
                            <FormattedMessage id="miniDialog.tilbakekreving.sendButton" />
                        </Button>
                    </HStack>
                )}
                {brukerØnskerÅUttaleSeg && tilbakemeldingValideringsfeil && (
                    <ErrorSummary heading="Feil i skjema">
                        <ErrorSummary.Item href="#1">{tilbakemeldingValideringsfeil}</ErrorSummary.Item>
                    </ErrorSummary>
                )}
            </VStack>
        </form>
    );
};

export default MinidialogSkjema;
