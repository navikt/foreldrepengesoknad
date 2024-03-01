import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, GuidePanel, Heading, Modal } from '@navikt/ds-react';

import { Block, intlUtils } from '@navikt/fp-common';
import { AttachmentType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { AnnenInntekt, AnnenInntektType } from 'app/context/types/AnnenInntekt';
import { validateRequiredTextInputField } from 'app/utils/validationUtil';

import { validateAnnenInntektFom, validateAnnenInntektTom } from './../validation/andreInntekterValidation';
import {
    AndreInntekterFormData,
    AndreInntekterFormField,
    AndreInntekterModalFormComponents,
} from './andreInntekterModalFormConfig';
import {
    cleanupAndreInntekterForm,
    getInitialAndreInntekterFormValues,
    getSkjemanummer,
    mapAnnenInntektModalValuesToState,
} from './andreInntekterModalFormUtils';
import andreInntekterModalQuestionsConfig from './andreInntekterModalQuestionsConfig';

interface Props {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    addAnnenInntekt: (annenInntekt: AnnenInntekt, vedlegg: Attachment[]) => void;
    editAnnenInntekt: (annenInntekt: AnnenInntekt, vedlegg: Attachment[]) => void;
    selectedAnnenInntekt: AnnenInntekt | undefined;
    etterlønnVedlegg: Attachment[];
    militærVedlegg: Attachment[];
}

const AndreInntekterModal: FunctionComponent<Props> = ({
    isOpen,
    contentLabel,
    onRequestClose,
    selectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
    etterlønnVedlegg,
    militærVedlegg,
}) => {
    const intl = useIntl();

    if (!isOpen) {
        return null;
    }

    const onValidSubmit = (values: Partial<AndreInntekterFormData>) => {
        const vedlegg = values.dokumentasjon ? values.dokumentasjon : [];

        if (!selectedAnnenInntekt) {
            addAnnenInntekt(mapAnnenInntektModalValuesToState(values), vedlegg);
        } else {
            editAnnenInntekt(mapAnnenInntektModalValuesToState(values), vedlegg);
        }
        onRequestClose();
    };

    const getVeilederMessageId = (values: AndreInntekterFormData): string => {
        if (values.type === AnnenInntektType.MILITÆRTJENESTE) {
            return 'inntektsinformasjon.andreInntekterModal.veileder.militær';
        }
        return 'inntektsinformasjon.andreInntekterModal.veileder.sluttpakke';
    };

    const navnPåArbeidsgiverLabel = intlUtils(intl, 'annenInntekt.spørsmål.arbeidsgiver');

    return (
        <AndreInntekterModalFormComponents.FormikWrapper
            initialValues={getInitialAndreInntekterFormValues(selectedAnnenInntekt, etterlønnVedlegg, militærVedlegg)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = andreInntekterModalQuestionsConfig.getVisbility(
                    formValues as AndreInntekterFormData,
                );

                return (
                    <Modal portal width="medium" open={isOpen} aria-label={contentLabel} onClose={onRequestClose}>
                        <Modal.Header>
                            <Heading size="small">
                                <FormattedMessage id="inntektsinformasjon.andreInntekterModal.tittel" />
                            </Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <AndreInntekterModalFormComponents.Form
                                includeButtons={false}
                                cleanup={(values) => cleanupAndreInntekterForm(values, visibility)}
                            >
                                <Block padBottom="l" visible={visibility.isVisible(AndreInntekterFormField.type)}>
                                    <AndreInntekterModalFormComponents.RadioGroup
                                        legend="Andre inntekter"
                                        name={AndreInntekterFormField.type}
                                        radios={[
                                            { label: 'Jobb i utlandet', value: AnnenInntektType.JOBB_I_UTLANDET },
                                            { label: 'Sluttvederlag', value: AnnenInntektType.SLUTTPAKKE },
                                            { label: 'Førstegangstjeneste', value: AnnenInntektType.MILITÆRTJENESTE },
                                        ]}
                                    />
                                </Block>
                                <Block padBottom="l" visible={visibility.isVisible(AndreInntekterFormField.land)}>
                                    <AndreInntekterModalFormComponents.CountrySelect
                                        name={AndreInntekterFormField.land}
                                        label={intlUtils(intl, 'annenInntekt.spørsmål.land')}
                                        useAlpha3Code={false}
                                    />
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(AndreInntekterFormField.navnPåArbeidsgiver)}
                                >
                                    <AndreInntekterModalFormComponents.TextField
                                        name={AndreInntekterFormField.navnPåArbeidsgiver}
                                        label={navnPåArbeidsgiverLabel}
                                        validate={validateRequiredTextInputField(navnPåArbeidsgiverLabel, intl)}
                                    />
                                </Block>
                                <Block padBottom="l" visible={visibility.isVisible(AndreInntekterFormField.fom)}>
                                    <AndreInntekterModalFormComponents.DatePicker
                                        name={AndreInntekterFormField.fom}
                                        label={intlUtils(intl, 'fom')}
                                        placeholder="dd.mm.åååå"
                                        fullscreenOverlay={true}
                                        showYearSelector={true}
                                        validate={validateAnnenInntektFom(intl, formValues.tom!)}
                                        maxDate={dayjs().toDate()}
                                    />
                                </Block>
                                <Block padBottom="l" visible={visibility.isVisible(AndreInntekterFormField.pågående)}>
                                    <AndreInntekterModalFormComponents.YesOrNoQuestion
                                        name={AndreInntekterFormField.pågående}
                                        legend={intlUtils(intl, 'pågående')}
                                    />
                                </Block>
                                <Block padBottom="l" visible={visibility.isVisible(AndreInntekterFormField.tom)}>
                                    <AndreInntekterModalFormComponents.DatePicker
                                        name={AndreInntekterFormField.tom}
                                        label={intlUtils(intl, 'tom')}
                                        placeholder="dd.mm.åååå"
                                        fullscreenOverlay={true}
                                        showYearSelector={true}
                                        validate={validateAnnenInntektTom(intl, formValues.fom!)}
                                        maxDate={dayjs().toDate()}
                                    />
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(AndreInntekterFormField.dokumentasjon)}
                                >
                                    <GuidePanel>
                                        <FormattedMessage
                                            id={getVeilederMessageId(formValues as AndreInntekterFormData)}
                                        />
                                    </GuidePanel>
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(AndreInntekterFormField.dokumentasjon)}
                                >
                                    <FormikFileUploader
                                        legend="Dokumentasjon av andre inntekter"
                                        name={AndreInntekterFormField.dokumentasjon}
                                        label="Last opp dokumentasjon"
                                        attachments={formValues.dokumentasjon!}
                                        attachmentType={AttachmentType.ANNEN_INNTEKT}
                                        skjemanummer={getSkjemanummer(formValues as AndreInntekterFormData)}
                                    />
                                </Block>
                                <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                    <Button type="submit">
                                        {!selectedAnnenInntekt
                                            ? intlUtils(intl, 'inntektsinformasjon.leggTilOppdrag')
                                            : 'Lagre endringer'}
                                    </Button>
                                </Block>
                            </AndreInntekterModalFormComponents.Form>
                        </Modal.Body>
                    </Modal>
                );
            }}
        />
    );
};

export default AndreInntekterModal;
