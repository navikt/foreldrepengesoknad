import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import getMessage from 'common/util/i18nUtils';
import dayjs from 'dayjs';
import { FieldArray } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateFødselDate } from '../omBarnetValidering';

interface Fødtprops {
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const Født: React.FunctionComponent<Fødtprops> = ({ visibility, formValues }) => {
    const intl = useIntl();

    if (formValues.erBarnetFødt === YesOrNo.NO || formValues.erBarnetFødt === YesOrNo.UNANSWERED) {
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
            {visibility.isVisible(OmBarnetFormField.fødselsdatoer) && (
                <Block margin="xl">
                    <FieldArray
                        name={OmBarnetFormField.fødselsdatoer}
                        render={() => [
                            <OmBarnetFormComponents.DatePicker
                                key={`${OmBarnetFormField.fødselsdatoer}.0`}
                                name={`${OmBarnetFormField.fødselsdatoer}.0` as OmBarnetFormField}
                                label={getMessage(intl, 'søknad.fødselsdato')}
                                minDate={dayjs().subtract(6, 'month').toDate()}
                                maxDate={dayjs().toDate()}
                                validate={(value) => validateFødselDate(value, intl)}
                                placeholder={'dd.mm.åååå'}
                            />,
                        ]}
                    />
                </Block>
            )}
        </>
    );
};
export default Født;
