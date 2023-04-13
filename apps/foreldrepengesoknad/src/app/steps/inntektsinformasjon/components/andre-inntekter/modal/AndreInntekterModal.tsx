import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
import { AnnenInntekt, AnnenInntektType } from 'app/context/types/AnnenInntekt';
import andreInntekterModalQuestionsConfig from './andreInntekterModalQuestionsConfig';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { AttachmentType } from 'app/types/AttachmentType';
import { validateAnnenInntektFom, validateAnnenInntektTom } from './../validation/andreInntekterValidation';
import dayjs from 'dayjs';
import { validateRequiredTextInputField } from 'app/utils/validationUtil';
import { Button, GuidePanel, Heading, Modal } from '@navikt/ds-react';

import './andreInntekterModal.less';

interface Props {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    addAnnenInntekt: (annenInntekt: AnnenInntekt) => void;
    editAnnenInntekt: (annenInntekt: AnnenInntekt) => void;
    selectedAnnenInntekt: AnnenInntekt | undefined;
}

const AndreInntekterModal: FunctionComponent<Props> = ({
    isOpen,
    contentLabel,
    onRequestClose,
    selectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
}) => {
    const intl = useIntl();
    const bem = bemUtils('andreInntekterModal');

    const onValidSubmit = (values: Partial<AndreInntekterFormData>) => {
        if (!selectedAnnenInntekt) {
            addAnnenInntekt(mapAnnenInntektModalValuesToState(values));
        } else {
            editAnnenInntekt(mapAnnenInntektModalValuesToState(values));
        }
        onRequestClose();
    };

    const getVeilederMessageId = (values: AndreInntekterFormData): string => {
        if (values.type === AnnenInntektType.MILITÆRTJENESTE) {
            return 'inntektsinformasjon.andreInntekterModal.veileder.militær';
        }

        if (values.type === AnnenInntektType.SLUTTPAKKE) {
            return 'inntektsinformasjon.andreInntekterModal.veileder.sluttpakke';
        }

        return 'inntektsinformasjon.andreInntekterModal.veileder.ventelønn';
    };

    const navnPåArbeidsgiverLabel = intlUtils(intl, 'annenInntekt.spørsmål.arbeidsgiver');

    return (
        <Modal
            open={isOpen}
            aria-label={contentLabel}
            onClose={onRequestClose}
            closeButton={true}
            shouldCloseOnOverlayClick={false}
            className={bem.block}
        >
            <AndreInntekterModalFormComponents.FormikWrapper
                initialValues={getInitialAndreInntekterFormValues(selectedAnnenInntekt)}
                onSubmit={onValidSubmit}
                renderForm={({ values: formValues }) => {
                    const visibility = andreInntekterModalQuestionsConfig.getVisbility(
                        formValues as AndreInntekterFormData
                    );

                    return (
                        <AndreInntekterModalFormComponents.Form
                            includeButtons={false}
                            cleanup={(values) => cleanupAndreInntekterForm(values, visibility)}
                        >
                            <Block padBottom="l">
                                <Heading size="small" className={bem.element('tittel')}>
                                    <FormattedMessage id="inntektsinformasjon.andreInntekterModal.tittel" />
                                </Heading>
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(AndreInntekterFormField.type)}>
                                <AndreInntekterModalFormComponents.RadioGroup
                                    legend="Andre inntekter"
                                    name={AndreInntekterFormField.type}
                                    radios={[
                                        { label: 'Jobb i utlandet', value: AnnenInntektType.JOBB_I_UTLANDET },
                                        { label: 'Vartpenger og ventelønn', value: AnnenInntektType.VENTELØNN },
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
                            <Block padBottom="l" visible={visibility.isVisible(AndreInntekterFormField.dokumentasjon)}>
                                <GuidePanel>
                                    <FormattedMessage id={getVeilederMessageId(formValues as AndreInntekterFormData)} />
                                </GuidePanel>
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(AndreInntekterFormField.dokumentasjon)}>
                                <FormikFileUploader
                                    name={AndreInntekterFormField.dokumentasjon}
                                    label="Last opp dokumentasjon"
                                    attachments={formValues.dokumentasjon!}
                                    attachmentType={AttachmentType.ANNEN_INNTEKT}
                                    skjemanummer={getSkjemanummer(formValues as AndreInntekterFormData)}
                                />
                            </Block>
                            <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                <Button>{intlUtils(intl, 'søknad.gåVidere')}</Button>
                            </Block>
                        </AndreInntekterModalFormComponents.Form>
                    );
                }}
            />
        </Modal>
    );
};

export default AndreInntekterModal;
