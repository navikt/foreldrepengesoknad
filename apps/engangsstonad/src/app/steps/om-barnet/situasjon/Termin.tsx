import { Block, intlUtils, PictureScanningGuide, UtvidetInformasjon } from '@navikt/fp-common';
import Veileder from '@navikt/fp-common/lib/components/veileder/Veileder';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import getMessage from 'common/util/i18nUtils';
import dayjs from 'dayjs';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateTerminDate, valideringAvTerminbekreftelsesdato } from '../omBarnetValidering';

interface Fødtprops {
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const Termin: React.FunctionComponent<Fødtprops> = ({ visibility, formValues }) => {
    const intl = useIntl();

    if (formValues.erBarnetFødt === YesOrNo.YES || formValues.erBarnetFødt === YesOrNo.UNANSWERED) {
        return null;
    }
    return (
        <>
            {visibility.isVisible(OmBarnetFormField.antallBarn) && (
                <>
                    <Block margin="xl">
                        <OmBarnetFormComponents.RadioPanelGroup
                            name={OmBarnetFormField.antallBarn}
                            radios={[
                                {
                                    label: intlUtils(intl, 'omBarnet.radiobutton.ettbarn'),
                                    value: '1',
                                },
                                {
                                    label: intlUtils(intl, 'omBarnet.radiobutton.tvillinger'),
                                    value: '2',
                                },
                                {
                                    label: intlUtils(intl, 'omBarnet.radiobutton.flere'),
                                    value: '3',
                                },
                            ]}
                            useTwoColumns={true}
                            legend={getMessage(intl, 'omBarnet.text.antallBarn')}
                        />
                    </Block>
                    {formValues.antallBarn && parseInt(formValues.antallBarn, 10) >= 3 && (
                        <Block margin="xl">
                            <OmBarnetFormComponents.Select name={OmBarnetFormField.antallBarn}>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </OmBarnetFormComponents.Select>
                        </Block>
                    )}
                </>
            )}
            {visibility.isVisible(OmBarnetFormField.termindato) && (
                <Block margin="xl">
                    <OmBarnetFormComponents.DatePicker
                        name={OmBarnetFormField.termindato}
                        label={getMessage(intl, 'søknad.termindato')}
                        minDate={dayjs().subtract(3, 'week').toDate()}
                        maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                        validate={(value) => validateTerminDate(value, intl)}
                        placeholder={'dd.mm.åååå'}
                    />
                </Block>
            )}
            {visibility.isVisible(OmBarnetFormField.terminbekreftelse) && (
                <>
                    <Block margin="xl">
                        <Veilederpanel kompakt={true} svg={<Veileder />}>
                            {getMessage(intl, 'terminbekreftelsen.text.terminbekreftelsen')}
                        </Veilederpanel>
                    </Block>
                    <Block margin="xl">
                        <FormikFileUploader
                            attachments={formValues.terminbekreftelse || []}
                            label={getMessage(intl, 'vedlegg.lastoppknapp.label')}
                            name={OmBarnetFormField.terminbekreftelse}
                        />
                        <UtvidetInformasjon apneLabel={<FormattedMessage id="psg.åpneLabel" />}>
                            <PictureScanningGuide backgroundColor="white" />
                        </UtvidetInformasjon>
                    </Block>
                </>
            )}
            {visibility.isVisible(OmBarnetFormField.terminbekreftelsedato) && (
                <Block margin="xl">
                    <OmBarnetFormComponents.DatePicker
                        name={OmBarnetFormField.terminbekreftelsedato}
                        label={getMessage(intl, 'søknad.terminbekreftelsesdato')}
                        minDate={dayjs(formValues.termindato).subtract(18, 'week').subtract(3, 'day').toDate()}
                        maxDate={dayjs().toDate()}
                        validate={(terminBekreftelseDato) =>
                            valideringAvTerminbekreftelsesdato(terminBekreftelseDato, formValues.termindato, intl)
                        }
                    />
                </Block>
            )}
        </>
    );
};
export default Termin;
