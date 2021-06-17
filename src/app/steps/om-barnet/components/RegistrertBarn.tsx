import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { RegistrertBarn } from 'app/types/Person';
import { formaterNavn } from 'app/utils/personUtils';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';

interface Props {
    registrerteBarn: RegistrertBarn[];
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
    formValues: OmBarnetFormData;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const RegistrertBarn: FunctionComponent<Props> = ({ registrerteBarn, visibility, formValues, setFieldValue }) => {
    const intl = useIntl();

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
        </>
    );
};

export default RegistrertBarn;
