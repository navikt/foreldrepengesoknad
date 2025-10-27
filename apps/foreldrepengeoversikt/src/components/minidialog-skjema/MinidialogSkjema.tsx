import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import {
    Alert,
    Button,
    Chat,
    ErrorSummary,
    GuidePanel,
    HStack,
    Link,
    Radio,
    RadioGroup,
    Textarea,
    VStack,
} from '@navikt/ds-react';

import { getSaveAttachmentFetch } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, EttersendelseDto, TilbakekrevingUttalelseOppgave_fpoversikt, Ytelse } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import { formatDate, replaceInvisibleCharsWithSpace } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { API_URLS, søkerInfoOptions, urlPrefiks } from '../../api/api';
import { isAttachmentWithError } from '../../utils/attachmentUtils.ts';
import { validateFritekstFelt } from '../../utils/validationUtils';
import { ScrollToTop } from '../scroll-to-top/ScrollToTop';
import { HvaLeggerNAVVektPå } from './hva-legger-nav-vekt-på/HvaLeggerNAVVektPå';
import { MinidialogVenterPåSvar } from './minidialog-venter-på-svar/MinidialogVenterPåSvar';

const mapYtelse = (sakstype: Ytelse) => {
    if (sakstype === 'ENGANGSSTØNAD') {
        return API_URLS.lastOppESVedlegg;
    }
    if (sakstype === 'FORELDREPENGER') {
        return API_URLS.lastOppFPVedlegg;
    }
    return API_URLS.lastOppSVPVedlegg;
};

interface Props {
    ettersendelseErSendt: boolean;
    isSendingEttersendelse: boolean;
    minidialog: TilbakekrevingUttalelseOppgave_fpoversikt;
    onSubmit: (ettersendelse: EttersendelseDto) => void;
    sakstype: Ytelse;
    ettersendelseError: string | undefined;
}

export const MinidialogSkjema = ({
    ettersendelseErSendt,
    isSendingEttersendelse,
    sakstype,
    minidialog,
    ettersendelseError,
    onSubmit,
}: Props) => {
    const intl = useIntl();
    const søkerInfo = useQuery(søkerInfoOptions()).data;

    const [vedlegg, setVedlegg] = useState<Attachment[]>([]);
    const [avventerVedlegg, setAvventerVedlegg] = useState(false);
    const [brukerØnskerÅUttaleSeg, setBrukerØnskerÅUttaleSeg] = useState<boolean>();
    const [tilbakemelding, setTilbakemelding] = useState<string>();
    const [tilbakemeldingValideringsfeil, setTilbakemeldingValideringsfeil] = useState<string>();

    const [fetchCounter, setFetchCounter] = useState(0);
    const [allowedToFetch, setAllowedToFetch] = useState(true);

    const updateAttachments = (v: Attachment[], hasPendingUploads: boolean) => {
        setVedlegg(v);
        setAvventerVedlegg(hasPendingUploads);
    };

    useQuery({
        queryKey: ['minidialog'],
        queryFn: async () => {
            setFetchCounter((prev) => prev + 1);
            return ky.get(`${urlPrefiks}/rest/minidialog`).json<TilbakekrevingUttalelseOppgave_fpoversikt[]>();
        },
        refetchInterval: (query) => {
            const data = query.state.data;
            if (!data || data?.find((innslag) => innslag.saksnummer === minidialog?.saksnummer)) {
                return 1000;
            }

            if (ettersendelseErSendt) {
                setAllowedToFetch(false);
            }
            return false;
        },
        enabled: ettersendelseErSendt && fetchCounter < 30 && allowedToFetch,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const feilmelding = brukerØnskerÅUttaleSeg
            ? validateFritekstFelt(
                  intl,
                  intl.formatMessage({ id: 'minidialog.tilbakekreving.tilbakekreving.label' }).replace(':', ''),
                  tilbakemelding,
              )
            : undefined;

        if (feilmelding) {
            setTilbakemeldingValideringsfeil(feilmelding);
        } else if (brukerØnskerÅUttaleSeg !== undefined) {
            const submitData = {
                fnr: notEmpty(søkerInfo).person.fnr,
                vedlegg:
                    brukerØnskerÅUttaleSeg && vedlegg
                        ? vedlegg.filter((a: Attachment) => !isAttachmentWithError(a))
                        : [],
                saksnummer: minidialog.saksnummer,
                type: sakstype,
                brukerTekst: {
                    dokumentType: Skjemanummer.TILBAKEBETALING,
                    tekst:
                        brukerØnskerÅUttaleSeg && tilbakemelding !== undefined && tilbakemelding !== null
                            ? (replaceInvisibleCharsWithSpace(tilbakemelding) ?? '')
                            : 'Jeg ønsker ikke å uttale meg. Saken vil bli behandlet med de opplysningene som Nav har tilgjengelig.',
                },
            } satisfies EttersendelseDto;

            onSubmit(submitData);
        }
    };

    if (ettersendelseErSendt) {
        return (
            <MinidialogVenterPåSvar
                fetchCounter={fetchCounter}
                allowedToFetch={allowedToFetch}
                saksnummer={minidialog.saksnummer}
            />
        );
    }

    if (ettersendelseError) {
        return (
            <VStack gap="space-16">
                <ScrollToTop />
                <Alert variant="error"> {ettersendelseError}</Alert>
                <Link as={RouterLink} to={`/sak/${minidialog.saksnummer}`}>
                    <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                </Link>
            </VStack>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap="space-32">
                <VStack gap="space-20">
                    <Chat avatar="Nav" name="Nav" timestamp={formatDate(minidialog.opprettet)}>
                        <Chat.Bubble>
                            <FormattedMessage
                                id="miniDialog.tilbakekreving.tittel"
                                values={{ sakstype: sakstype.toLocaleLowerCase() }}
                            />
                        </Chat.Bubble>
                    </Chat>
                    <HvaLeggerNAVVektPå />
                </VStack>
                <RadioGroup
                    legend={intl.formatMessage({ id: 'miniDialog.tilbakekreving.radioPanelGruppe.legend' })}
                    onChange={setBrukerØnskerÅUttaleSeg}
                >
                    <Radio value={true}>Ja</Radio>
                    <Radio value={false}>Nei</Radio>
                </RadioGroup>
                {brukerØnskerÅUttaleSeg === true && (
                    <>
                        <div>
                            <Textarea
                                label={intl.formatMessage({ id: 'minidialog.tilbakekreving.tilbakekreving.label' })}
                                onChange={(e) => setTilbakemelding(e.target.value)}
                                error={tilbakemeldingValideringsfeil}
                            />
                        </div>
                        <FileUploader
                            label={intl.formatMessage({ id: 'minidialog.dokumenter' })}
                            updateAttachments={updateAttachments}
                            attachmentType={AttachmentType.TILBAKEBETALING}
                            skjemanummer={Skjemanummer.TILBAKEBETALING}
                            saveAttachment={getSaveAttachmentFetch(mapYtelse(sakstype))}
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
