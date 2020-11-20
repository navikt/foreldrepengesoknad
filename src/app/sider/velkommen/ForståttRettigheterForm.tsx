import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { commonFieldErrorRenderer } from 'app/validation/fieldValidations';
import Knapperad from 'common/components/knapperad/Knapperad';
import getMessage from 'common/util/i18nUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useIntl } from 'react-intl';

export enum ForståttRettigheterFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
}

export interface ForståttRettigheterFormData {
    [ForståttRettigheterFormField.harForståttRettigheterOgPlikter]: boolean;
}

export const initialForståttRettigheterValues: ForståttRettigheterFormData = {
    [ForståttRettigheterFormField.harForståttRettigheterOgPlikter]: false,
};

const ForståttRettigheterFormComponents = getTypedFormComponents<
    ForståttRettigheterFormField,
    ForståttRettigheterFormData
>();

interface Props {
    onConfirm: () => void;
    knappLabel: string;
    knappClassName: string;
    checkboxLabelHeader: React.ReactNode;
    isLoadingEkisterendeSak: boolean;
}

const ForståttRettigheterForm: React.FunctionComponent<Props> = ({
    knappLabel,
    knappClassName,
    isLoadingEkisterendeSak,
    checkboxLabelHeader,
    onConfirm,
}) => {
    const intl = useIntl();

    return (
        <ForståttRettigheterFormComponents.FormikWrapper
            initialValues={{ harForståttRettigheterOgPlikter: false }}
            onSubmit={onConfirm}
            renderForm={() => {
                return (
                    <ForståttRettigheterFormComponents.Form
                        includeButtons={false}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                    >
                        <>
                            <ForståttRettigheterFormComponents.ConfirmationCheckbox
                                name={ForståttRettigheterFormField.harForståttRettigheterOgPlikter}
                                className="blokk-m"
                                label={getMessage(intl, 'velkommen.samtykke')}
                                validate={(value) => {
                                    let result;
                                    if (value !== true) {
                                        result = getMessage(
                                            intl,
                                            'valideringsfeil.velkommen.bekreftLestOgForståttRettigheter'
                                        );
                                    }
                                    return result;
                                }}
                            >
                                {checkboxLabelHeader}
                            </ForståttRettigheterFormComponents.ConfirmationCheckbox>
                            <Knapperad>
                                <Hovedknapp className={knappClassName} spinner={isLoadingEkisterendeSak}>
                                    {knappLabel}
                                </Hovedknapp>
                            </Knapperad>
                        </>
                    </ForståttRettigheterFormComponents.Form>
                );
            }}
        />
    );
};

export default ForståttRettigheterForm;
