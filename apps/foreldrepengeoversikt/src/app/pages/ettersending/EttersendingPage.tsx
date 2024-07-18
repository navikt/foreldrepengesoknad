import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';

import { Add } from '@navikt/ds-icons';
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

import { getSaveAttachment } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { FileUploader } from '@navikt/fp-ui';
import { bemUtils, useDocumentTitle } from '@navikt/fp-utils';

import { sendEttersending } from 'app/api/api';
import { EttersendingHeader } from 'app/components/header/Header';
import ScrollToTop from 'app/components/scroll-to-top/ScrollToTop';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { PageRouteLayout } from 'app/routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from 'app/routes/routes';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Sak } from 'app/types/Sak';
import { SakOppslag } from 'app/types/SakOppslag';
import { Ytelse } from 'app/types/Ytelse';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import { getRelevanteSkjemanummer } from 'app/utils/skjemanummerUtils';

import './ettersending-page.css';

const mapYtelse = (sakstype: Ytelse): 'foreldrepenger' | 'svangerskapspenger' | 'engangsstonad' => {
    if (sakstype === Ytelse.ENGANGSSTØNAD) {
        return 'engangsstonad';
    }
    if (sakstype === Ytelse.FORELDREPENGER) {
        return 'foreldrepenger';
    }
    return 'svangerskapspenger';
};

export const getListOfUniqueSkjemanummer = (attachments: Attachment[]) => {
    return attachments
        .map((a: Attachment) => a.skjemanummer)
        .filter((s: Skjemanummer, index, self) => self.indexOf(s) === index);
};

const DEFAULT_OPTION = 'default';

export const getAttachmentTypeSelectOptions = (intl: IntlShape, sak: Sak | undefined) => {
    if (!sak) {
        return null;
    }

    return (
        <>
            <option value={DEFAULT_OPTION} disabled={false} hidden={false}>
                <FormattedMessage id="ettersendelse.select.defaultValue" />
            </option>
            {getRelevanteSkjemanummer(sak)
                .map((skjemanummer) => ({
                    skjemanummer,
                    text: intl.formatMessage({ id: `ettersendelse.${skjemanummer}` }),
                }))
                .sort((selectOption, nextSelectOption) => selectOption.text.localeCompare(nextSelectOption.text))
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

    throw Error('Valgt skjemanr finnes ikke');
};

export interface Props {
    saker: SakOppslag;
}

const EttersendingPageInner: React.FunctionComponent<Props> = ({ saker }) => {
    const intl = useIntl();
    useDocumentTitle(
        `${intl.formatMessage({ id: 'lastOppDokumenter' })} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );
    useSetSelectedRoute(OversiktRoutes.ETTERSEND);
    const params = useParams();

    const bem = bemUtils('ettersending-page');

    const [type, setType] = useState<Skjemanummer | typeof DEFAULT_OPTION>(DEFAULT_OPTION);
    const [vedlegg, setVedlegg] = useState<Attachment[]>([]);
    const [avventerVedlegg, setAvventerVedlegg] = useState(false);

    const alleYtelser = getAlleYtelser(saker);
    const sak = alleYtelser.find((sak) => sak.saksnummer === params.saksnummer);

    const updateAttachments = (vedlegg: Attachment[], hasPendingUploads: boolean) => {
        setVedlegg(vedlegg);
        setAvventerVedlegg(hasPendingUploads);
    };

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: (valuesToSend: EttersendingDto) => sendEttersending(valuesToSend),
    });

    const onSubmit = (e: FormEvent<any>) => {
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
                <VStack gap="2">
                    {isSuccess && <Alert variant="success">Dokumentene er sendt</Alert>}
                    {isError && (
                        <Alert variant="error">
                            Vi klarte ikke å sende inn dokumentasjonen din. Prøv igjen senere og hvis problemet vedvarer
                            kontakt brukerstøtte.
                        </Alert>
                    )}
                    <Link to={`/sak/${sak!.saksnummer}`}>
                        <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                    </Link>
                </VStack>
            </>
        );
    }

    return (
        <form onSubmit={onSubmit}>
            <VStack gap="4">
                <BodyLong>
                    Dokumentene du laster opp vil bli lagt ved søknaden din. Du må velge hva dokumentene inneholder for
                    at saksbehandlerene i NAV skal kunne behandle saken din.
                </BodyLong>
                <BodyShort>Du kan laste opp dokumenter i formatene pdf, png og jpg.</BodyShort>
                <NAVLink target="_blank" href="https://www.nav.no/brukerstotte#sende-soknad-pa-nett">
                    Les om hvordan du kan ta bilde av dokumenter med mobilen
                </NAVLink>
                <Select
                    className={bem.element('select')}
                    label="Hva inneholder dokumentene dine?"
                    onChange={(event) => setType(konverterSelectVerdi(event.target.value))}
                >
                    {getAttachmentTypeSelectOptions(intl, sak)}
                </Select>
                {type !== DEFAULT_OPTION && (
                    <FileUploader
                        updateAttachments={updateAttachments}
                        attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                        skjemanummer={type}
                        existingAttachments={vedlegg}
                        saveAttachment={getSaveAttachment(mapYtelse(sak!.ytelse))}
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
                            icon={<Add aria-hidden={true} />}
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

function EttersendingPage({ saker }: Props) {
    return (
        <PageRouteLayout header={<EttersendingHeader />}>
            <EttersendingPageInner saker={saker} />
        </PageRouteLayout>
    );
}
export default EttersendingPage;
