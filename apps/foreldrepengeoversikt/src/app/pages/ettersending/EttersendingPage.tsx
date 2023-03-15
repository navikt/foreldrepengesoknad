import { Add } from '@navikt/ds-icons';
import { Alert, BodyLong, BodyShort, Button, Heading, ReadMore } from '@navikt/ds-react';
import { bemUtils, Block, intlUtils, PictureScanningGuide } from '@navikt/fp-common';
import Api from 'app/api/api';
import AttachmentList from 'app/components/attachment/AttachmentList';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import ScrollToTop from 'app/components/scroll-to-top/ScrollToTop';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import EttersendingDto from 'app/types/EttersendingDTO';
import { Sak } from 'app/types/Sak';
import { SakOppslag } from 'app/types/SakOppslag';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { deleteAttachment, isAttachmentWithError } from 'app/utils/attachmentUtils';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import { getRelevanteSkjemanummer } from 'app/utils/skjemanummerUtils';
import React, { useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { EttersendingFormComponents, EttersendingFormField, EttersendingFormData } from './ettersendFormConfig';

import './ettersending-page.css';

export const getListOfUniqueSkjemanummer = (attachments: Attachment[]) => {
    return attachments
        .map((a: Attachment) => a.skjemanummer)
        .filter((s: Skjemanummer, index, self) => self.indexOf(s) === index);
};

export const getAttachmentTypeSelectOptions = (intl: IntlShape, sak: Sak | undefined) => {
    if (!sak) {
        return null;
    }

    return (
        <>
            <option value="default" disabled={false} hidden={false}>
                {intl.formatMessage({ id: `ettersendelse.select.defaultValue` })}
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

interface Props {
    saker: SakOppslag;
}

const validerDokumentType = (value: Skjemanummer | string, intl: IntlShape, vedlegg: Attachment[] | undefined) => {
    if (value === 'default' && (vedlegg === undefined || vedlegg.length === 0)) {
        return intlUtils(intl, 'ettersendelse.select.defaultValue');
    }
    return undefined;
};

const EttersendingPage: React.FunctionComponent<Props> = ({ saker }) => {
    const bem = bemUtils('ettersending-page');
    const [isEttersending, setIsEttersending] = useState(false);
    const [ettersendingDone, setEttersendingDone] = useState(false);
    const intl = useIntl();
    const params = useParams();
    const alleYtelser = getAlleYtelser(saker);
    const sak = alleYtelser.find((sak) => sak.saksnummer === params.saksnummer);
    useSetSelectedRoute(OversiktRoutes.ETTERSEND);
    const onSubmit = (values: EttersendingFormData) => {
        setIsEttersending(true);

        const valuesToSend: EttersendingDto = {
            saksnummer: sak!.saksnummer,
            type: sak!.ytelse,
            vedlegg: values.vedlegg,
        };

        Api.sendEttersending(valuesToSend).then(() => {
            setIsEttersending(false);
            setEttersendingDone(true);
        });
    };

    if (ettersendingDone) {
        return (
            <div>
                <ScrollToTop />
                <Block padBottom="l">
                    <Alert variant="success">Dokumentene er sendt</Alert>
                </Block>
                <Block padBottom="l">
                    <Link to={`/sak/${sak!.saksnummer}`}>
                        {intlUtils(intl, 'miniDialog.kvittering.gåTilbakeTilSaken')}
                    </Link>
                </Block>
            </div>
        );
    }

    return (
        <EttersendingFormComponents.FormikWrapper
            initialValues={{ type: 'default', vedlegg: [] }}
            onSubmit={onSubmit}
            renderForm={({ values, setFieldValue }) => {
                const finnesPendingVedlegg = values.vedlegg ? !!values.vedlegg.find((file) => file.pending) : false;
                return (
                    <>
                        <EttersendingFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <BodyLong className={bem.element('beskrivelse')}>
                                Dokumentene du laster opp vil bli lagt ved søknaden din. Du må velge hva dokumentene
                                inneholder for at saksbehandlerene i NAV skal kunne behandle saken din.
                            </BodyLong>
                            <BodyShort className={bem.element('beskrivelse')}>
                                Du kan laste opp dokumenter i formatene pdf, png og jpg.
                            </BodyShort>
                            <EttersendingFormComponents.Select
                                className={bem.element('select')}
                                label="Hva inneholder dokumentene dine?"
                                name={EttersendingFormField.type}
                                validate={(value) => validerDokumentType(value, intl, values.vedlegg)}
                            >
                                {getAttachmentTypeSelectOptions(intl, sak)}
                            </EttersendingFormComponents.Select>
                            {values.type !== 'default' && (
                                <FormikFileUploader
                                    name={EttersendingFormField.vedlegg}
                                    attachments={values.vedlegg || []}
                                    label="Last opp dokument"
                                    attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                                    skjemanummer={values.type!}
                                    legend=""
                                    buttonLabel="Last opp dokument"
                                    validateHasAttachment={true}
                                />
                            )}
                            <Block padBottom="l" visible={values.vedlegg!.length > 0}>
                                {getListOfUniqueSkjemanummer(values.vedlegg!).map((skjemanummer: Skjemanummer) => (
                                    <div className={bem.element('vedleggsliste')} key={skjemanummer}>
                                        <Heading size="small" level="2" className={bem.element('vedleggsliste-tittel')}>
                                            {intlUtils(intl, `ettersendelse.${skjemanummer}`)}
                                        </Heading>
                                        <AttachmentList
                                            attachments={values.vedlegg!.filter(
                                                (a) => !isAttachmentWithError(a) && a.skjemanummer === skjemanummer
                                            )}
                                            showFileSize={true}
                                            onDelete={(file: Attachment) => {
                                                setFieldValue(
                                                    EttersendingFormField.vedlegg,
                                                    deleteAttachment(values.vedlegg!, file)
                                                );
                                            }}
                                        />
                                    </div>
                                ))}
                            </Block>
                            <Block padBottom="l">
                                <ReadMore header={intlUtils(intl, 'pictureScanningGuide.apneLabel')}>
                                    <PictureScanningGuide backgroundColor="white" />
                                </ReadMore>
                            </Block>
                            <Block padBottom="l">
                                <Button
                                    type="submit"
                                    icon={<Add />}
                                    loading={isEttersending || finnesPendingVedlegg}
                                    disabled={isEttersending || finnesPendingVedlegg}
                                >
                                    Legg ved sak
                                </Button>
                            </Block>
                        </EttersendingFormComponents.Form>
                    </>
                );
            }}
        />
    );
};

export default EttersendingPage;
