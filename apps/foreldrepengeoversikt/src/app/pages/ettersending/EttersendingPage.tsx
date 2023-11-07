import { FormEvent, useState } from 'react';
import { IntlShape, useIntl, FormattedMessage } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { Add } from '@navikt/ds-icons';
import { Attachment } from '@navikt/fp-types';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Alert, BodyLong, BodyShort, Button, Link as NAVLink, Select, VStack, HStack } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { getSaveAttachment } from '@navikt/fp-api';
import { FileUploader } from '@navikt/fp-ui';
import Api from 'app/api/api';
import ScrollToTop from 'app/components/scroll-to-top/ScrollToTop';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Sak } from 'app/types/Sak';
import { SakOppslag } from 'app/types/SakOppslag';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import { getRelevanteSkjemanummer } from 'app/utils/skjemanummerUtils';
import Environment from 'app/Environment';

import './ettersending-page.css';

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

const EttersendingPage: React.FunctionComponent<Props> = ({ saker }) => {
    const intl = useIntl();

    useSetSelectedRoute(OversiktRoutes.ETTERSEND);
    const params = useParams();

    const bem = bemUtils('ettersending-page');

    const [isEttersending, setIsEttersending] = useState(false);
    const [ettersendingDone, setEttersendingDone] = useState(false);
    const [ettersendingError, setEttersendingError] = useState<string | undefined>(undefined);

    const [type, setType] = useState<Skjemanummer | typeof DEFAULT_OPTION>(DEFAULT_OPTION);
    const [vedlegg, setVedlegg] = useState<Attachment[]>([]);

    const alleYtelser = getAlleYtelser(saker);
    const sak = alleYtelser.find((sak) => sak.saksnummer === params.saksnummer);

    const onSubmit = (e: FormEvent<any>) => {
        e.preventDefault();

        setIsEttersending(true);

        const valuesToSend: EttersendingDto = {
            saksnummer: sak!.saksnummer,
            type: sak!.ytelse,
            vedlegg,
        };

        Api.sendEttersending(valuesToSend)
            .then(() => {
                setIsEttersending(false);
                setEttersendingDone(true);
            })
            .catch((_error) => {
                setIsEttersending(false);
                setEttersendingError(
                    'Vi klarte ikke å sende inn dokumentasjonen din. Prøv igjen senere og hvis problemet vedvarer kontakt brukerstøtte.',
                );
            });
    };

    if (ettersendingDone || ettersendingError) {
        return (
            <>
                <ScrollToTop />
                <VStack gap="2">
                    {ettersendingDone && <Alert variant="success">Dokumentene er sendt</Alert>}
                    {ettersendingError && <Alert variant="error">{ettersendingError}</Alert>}
                    <Link to={`/sak/${sak!.saksnummer}`}>
                        <FormattedMessage id="miniDialog.kvittering.gåTilbakeTilSaken" />
                    </Link>
                </VStack>
            </>
        );
    }

    const finnesPendingVedlegg = vedlegg ? !!vedlegg.find((file) => file.pending) : false;

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
                        updateAttachments={setVedlegg}
                        attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                        skjemanummer={type}
                        existingAttachments={vedlegg}
                        saveAttachment={getSaveAttachment(Environment.REST_API_URL)}
                    />
                )}
                {vedlegg && vedlegg.length > 0 && (
                    <HStack>
                        <Button
                            type="submit"
                            icon={<Add />}
                            loading={isEttersending || finnesPendingVedlegg}
                            disabled={isEttersending || finnesPendingVedlegg}
                        >
                            Legg ved sak
                        </Button>
                    </HStack>
                )}
            </VStack>
        </form>
    );
};

export default EttersendingPage;
