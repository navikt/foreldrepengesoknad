import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import { dateToISOString, YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { RegistrertBarn as RegistrertBarnType } from 'app/types/Person';
import { velgEldsteBarn } from 'app/utils/dateUtils';
import { formaterNavn } from 'app/utils/personUtils';
import dayjs from 'dayjs';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateTermindatoFødsel } from '../validation/omBarnetValidering';

interface Props {
    registrerteBarn: RegistrertBarnType[];
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
    formValues: OmBarnetFormData;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const getFødselsdato = (registrerteBarn: RegistrertBarnType[], valgteBarn: string[]): Date => {
    if (valgteBarn.length > 0) {
        return velgEldsteBarn(registrerteBarn, valgteBarn).fødselsdato;
    }

    return new Date();
};

const RegistrertBarn: FunctionComponent<Props> = ({ registrerteBarn, visibility, formValues, setFieldValue }) => {
    const intl = useIntl();

    const { valgteBarn } = formValues;
    const antallBarn = valgteBarn.length;

    const intlIdTermin =
        antallBarn !== undefined && antallBarn > 1 ? 'omBarnet.termindato.fødtFlereBarn' : 'omBarnet.termindato.født';
    const fødselsdato = getFødselsdato(registrerteBarn, valgteBarn);

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.valgteBarn)}>
                <OmBarnetFormComponents.CheckboxPanelGroup
                    name={OmBarnetFormField.valgteBarn}
                    legend={intlUtils(intl, 'omBarnet.barnRegistrert')}
                    checkboxes={registrerteBarn.map((barn) => ({
                        label: formaterNavn(barn.fornavn, barn.etternavn, barn.mellomnavn),
                        value: barn.fnr,
                        subtext: formatDate(barn.fødselsdato),
                        autoComplete: 'off',
                        disabled: formValues.gjelderAnnetBarn,
                    }))}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.gjelderAnnetBarn)}>
                <OmBarnetFormComponents.Checkbox
                    name={OmBarnetFormField.gjelderAnnetBarn}
                    label={intlUtils(intl, 'omBarnet.gjelderAnnetBarn')}
                    onClick={() => {
                        if (!formValues.gjelderAnnetBarn) {
                            setFieldValue(OmBarnetFormField.valgteBarn, []);
                        } else {
                            setFieldValue(OmBarnetFormField.erBarnetFødt, YesOrNo.UNANSWERED);
                        }
                    }}
                />
            </Block>
            <Block visible={visibility.isVisible(OmBarnetFormField.termindato) && valgteBarn.length > 0}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.termindato}
                    label={intlUtils(intl, intlIdTermin)}
                    dayPickerProps={{
                        initialMonth: fødselsdato,
                    }}
                    minDate={dayjs(fødselsdato).subtract(1, 'months').toDate()}
                    maxDate={dayjs(fødselsdato).add(6, 'months').toDate()}
                    placeholder={'dd.mm.åååå'}
                    validate={validateTermindatoFødsel(dateToISOString(fødselsdato), intl)}
                />
            </Block>
        </>
    );
};

export default RegistrertBarn;
