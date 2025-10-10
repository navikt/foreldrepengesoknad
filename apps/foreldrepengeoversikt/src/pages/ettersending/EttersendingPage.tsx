import { PlusIcon } from '@navikt/aksel-icons';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Link, useLocation, useParams } from 'react-router-dom';

import {
    Alert,
    BodyLong,
    BodyShort,
    Button,
    GuidePanel,
    HStack,
    Link as NAVLink,
    Select,
    VStack,
} from '@navikt/ds-react';

import { getSaveAttachmentFetch } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment, EttersendelseDto, Ytelse } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import { useDocumentTitle } from '@navikt/fp-utils';

import { API_URLS, sendEttersending } from '../../api/api';
import { EttersendingHeader } from '../../components/header/Header';
import { ScrollToTop } from '../../components/scroll-to-top/ScrollToTop';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';
import { Sak } from '../../types/Sak';
import { SakOppslag } from '../../types/SakOppslag';
import { getAlleYtelser } from '../../utils/sakerUtils';
import { getRelevanteSkjemanummer } from '../../utils/skjemanummerUtils';

const mapYtelse = (sakstype: Ytelse) => {
    if (sakstype === 'ENGANGSSTØNAD') {
        return API_URLS.lastOppESVedlegg;
    }
    if (sakstype === 'FORELDREPENGER') {
        return API_URLS.lastOppFPVedlegg;
    }
    return API_URLS.lastOppSVPVedlegg;
};

const DEFAULT_OPTION = 'default';

const getAttachmentTypeSelectOptions = (intl: IntlShape, manglendeSkjemanummer: string[], sak: Sak | undefined) => {
    if (!sak) {
        return null;
    }

    return (
        <>
            <option value={DEFAULT_OPTION} disabled={false} hidden={false}>
                <FormattedMessage id="ettersendelse.select.defaultValue" />
            </option>
            {getRelevanteSkjemanummer(sak)
                .filter((skjemanummer) =>
                    manglendeSkjemanummer.length === 0 ? true : manglendeSkjemanummer.includes(skjemanummer),
                )
                .map((skjemanummer) => ({
                    skjemanummer,
                    text: intl.formatMessage({ id: `ettersendelse.${skjemanummer}` }),
                }))
                .sort((selectOption, nextSelectOption) => {
                    if (selectOption.skjemanummer === Skjemanummer.ANNET) return 1;
                    return selectOption.text.localeCompare(nextSelectOption.text);
                })
                .map(({ skjemanummer, text }) => (
                    <option value={skjemanummer} key={skjemanummer}>
                        {text}
                    </option>
                ))}
        </>
    );
};

const konverterSelectVerdi = (selectText: string): Skjemanummer | typeof DEFAULT_OPTION => {
    if (selectText === DEFAULT_OPTION) {
        return selectText;
    }

    const snr = Object.values(Skjemanummer).find((value) => value === selectText);
    if (snr) {
        return snr;
    }

    throw new Error('Valgt skjemanr finnes ikke');
};

type Props = {
    readonly saker: SakOppslag;
};

const EttersendingPageInner = ({ saker }: Props) => {
    const intl = useIntl();
    useSetBackgroundColor('white');
    useDocumentTitle(
        `${intl.formatMessage({ id: 'lastOppDokumenter' })} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );
    useSetSelectedRoute(OversiktRoutes.ETTERSEND);
    const params = useParams();

    const { search } = useLocation();
    const skjematypeParam = new URLSearchParams(search).get('skjematype');
    const manglendeSkjemanummer = skjematypeParam ? skjematypeParam.split(',') : [];
    const alleYtelser = getAlleYtelser(saker);
    const sak = alleYtelser.find((ytelse) => ytelse.saksnummer === params.saksnummer);
    const relevantSkjemanummer = sak
        ? getRelevanteSkjemanummer(sak).filter((skjemanummer) =>
              manglendeSkjemanummer.length === 0 ? true : manglendeSkjemanummer.includes(skjemanummer),
          )
        : [];
    const initialType = relevantSkjemanummer.length === 1 ? relevantSkjemanummer[0] : DEFAULT_OPTION;
    const [type, setType] = useState<Skjemanummer | typeof DEFAULT_OPTION>(initialType);
    const [vedlegg, setVedlegg] = useState<Attachment[]>([]);
    const [avventerVedlegg, setAvventerVedlegg] = useState(false);

    const updateAttachments = (v: Attachment[], hasPendingUploads: boolean) => {
        setVedlegg(v);
        setAvventerVedlegg(hasPendingUploads);
    };

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: (valuesToSend: EttersendelseDto) => sendEttersending(valuesToSend),
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        mutate({
            saksnummer: sak!.saksnummer,
            type: sak!.ytelse,
            vedlegg,
        });
    };

    if (isSuccess || isError) {
        return (
            <>
                <ScrollToTop />
                <VStack gap="space-16">
                    {isSuccess && <Alert variant="success">Dokumentene er sendt</Alert>}
                    {isError && (
                        <Alert variant="error">
                            Vi klarte ikke å sende inn dokumentasjonen din. Prøv igjen senere og hvis problemet vedvarer
                            kontakt brukerstøtte.
                        </Alert>
                    )}
                    <NAVLink as={Link} to={`/sak/${sak!.saksnummer}`}>
                        <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                    </NAVLink>
                </VStack>
            </>
        );
    }

    return (
        <form onSubmit={onSubmit}>
            <VStack gap="space-16">
                <BodyLong>
                    Dokumentene du laster opp vil bli lagt ved søknaden din. Du må velge hva dokumentene inneholder for
                    at saksbehandlerene i Nav skal kunne behandle saken din.
                </BodyLong>
                <BodyShort>Du kan laste opp dokumenter i formatene pdf, png og jpg.</BodyShort>
                <NAVLink target="_blank" href="https://www.nav.no/brukerstotte#sende-soknad-pa-nett">
                    Les om hvordan du kan ta bilde av dokumenter med mobilen
                </NAVLink>
                <Select
                    className="mb-4"
                    label="Hva inneholder dokumentene dine?"
                    onChange={(event) => setType(konverterSelectVerdi(event.target.value))}
                    value={type}
                >
                    {getAttachmentTypeSelectOptions(intl, manglendeSkjemanummer, sak)}
                </Select>
                {type !== DEFAULT_OPTION && (
                    <FileUploader
                        label={intl.formatMessage({ id: 'EttersendingPageInner.dokumenter' })}
                        updateAttachments={updateAttachments}
                        attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                        skjemanummer={type}
                        existingAttachments={vedlegg}
                        saveAttachment={getSaveAttachmentFetch(mapYtelse(sak!.ytelse))}
                        skjemanummerTextMap={
                            sak
                                ? getRelevanteSkjemanummer(sak).reduce(
                                      (prev, skjemanr) => ({
                                          ...prev,
                                          [skjemanr]: intl.formatMessage({ id: `ettersendelse.${skjemanr}` }),
                                      }),
                                      {} as Record<Skjemanummer, string>,
                                  )
                                : undefined
                        }
                    />
                )}
                {vedlegg && vedlegg.length > 0 && vedlegg.length <= 40 && (
                    <HStack>
                        <Button
                            type="submit"
                            icon={<PlusIcon aria-hidden={true} />}
                            loading={isPending || avventerVedlegg}
                            disabled={isPending || avventerVedlegg}
                        >
                            Legg ved sak
                        </Button>
                    </HStack>
                )}
                {vedlegg && vedlegg.length > 40 && (
                    <GuidePanel>
                        Du kan bare laste opp 40 dokumenter på en gang. Hvis du skal laste opp flere enn 40 dokumenter
                        kan du gjøre det i flere omganger.
                    </GuidePanel>
                )}
            </VStack>
        </form>
    );
};

export function EttersendingPage({ saker }: Props) {
    return (
        <PageRouteLayout header={<EttersendingHeader />}>
            <EttersendingPageInner saker={saker} />
        </PageRouteLayout>
    );
}
