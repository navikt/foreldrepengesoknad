import { useQuery } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

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

import { getSaveAttachment } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import { formatDate } from '@navikt/fp-utils';

import EttersendingDto from 'app/types/EttersendingDTO';
import { MinidialogInnslag } from 'app/types/MinidialogInnslag';
import { Ytelse } from 'app/types/Ytelse';
import { validateFritekstFelt } from 'app/utils/validationUtils';

import ScrollToTop from '../scroll-to-top/ScrollToTop';
import HvaLeggerNAVVektPå from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';
import MinidialogVenterPåSvar from './minidialog-venter-på-svar/MinidialogVenterPåSvar';
import { mapMinidialogInputTilDTO } from './minidialogskjemaUtils';

const mapYtelse = (sakstype: Ytelse): 'foreldrepenger' | 'svangerskapspenger' | 'engangsstonad' => {
    if (sakstype === Ytelse.ENGANGSSTØNAD) {
        return 'engangsstonad';
    }
    if (sakstype === Ytelse.FORELDREPENGER) {
        return 'foreldrepenger';
    }
    return 'svangerskapspenger';
};

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
    const [avventerVedlegg, setAvventerVedlegg] = useState(false);
    const [brukerØnskerÅUttaleSeg, settBrukerØnskerÅUttaleSeg] = useState<boolean>();
    const [tilbakemelding, settTilbakemelding] = useState<string>();
    const [tilbakemeldingValideringsfeil, settTilbakemeldingValideringsfeil] = useState<string>();

    const [fetchCounter, setFetchCounter] = useState(0);
    const [allowedToFetch, setAllowedToFetch] = useState(true);

    const updateAttachments = (vedlegg: Attachment[], hasPendingUploads: boolean) => {
        setVedlegg(vedlegg);
        setAvventerVedlegg(hasPendingUploads);
    };

    useQuery<MinidialogInnslag[]>({
        queryKey: ['minidialog'],
        queryFn: async () => {
            setFetchCounter((prev) => prev + 1);
            return await fetch(`/rest/minidialog`, { credentials: 'include' }).then((response) => response.json());
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

    const handleSubmit = (e: FormEvent<any>) => {
        e.preventDefault();

        const feilmelding = brukerØnskerÅUttaleSeg
            ? validateFritekstFelt(
                  intl,
                  intl.formatMessage({ id: 'minidialog.tilbakekreving.tilbakekreving.label' }).replace(':', ''),
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
                    <Chat avatar="NAV" name="NAV" timestamp={formatDate(minidialog.opprettet)}>
                        <Chat.Bubble>
                            <FormattedMessage id="miniDialog.tilbakekreving.tittel" values={{ sakstype }} />
                        </Chat.Bubble>
                    </Chat>
                    <HvaLeggerNAVVektPå />
                </VStack>
                <RadioGroup
                    legend={intl.formatMessage({ id: 'miniDialog.tilbakekreving.radioPanelGruppe.legend' })}
                    onChange={settBrukerØnskerÅUttaleSeg}
                >
                    <Radio value={true}>Ja</Radio>
                    <Radio value={false}>Nei</Radio>
                </RadioGroup>
                {brukerØnskerÅUttaleSeg === true && (
                    <>
                        <div>
                            <Textarea
                                label={intl.formatMessage({ id: 'minidialog.tilbakekreving.tilbakekreving.label' })}
                                onChange={(e) => settTilbakemelding(e.target.value)}
                                error={tilbakemeldingValideringsfeil}
                            />
                        </div>
                        <FileUploader
                            updateAttachments={updateAttachments}
                            attachmentType={AttachmentType.TILBAKEBETALING}
                            skjemanummer={Skjemanummer.TILBAKEBETALING}
                            saveAttachment={getSaveAttachment(mapYtelse(sakstype))}
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
                            loading={isSendingEttersendelse || avventerVedlegg}
                            disabled={isSendingEttersendelse || avventerVedlegg}
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
