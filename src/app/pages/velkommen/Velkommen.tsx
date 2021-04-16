import { Block, commonFieldErrorRenderer, intlUtils, LanguageToggle, Locale } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    initialVelkommenValues,
    VelkommenFormComponents,
    VelkommenFormData,
    VelkommenFormField,
} from './velkommenFormConfig';

interface Props {
    fornavn: string;
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
}

const Velkommen: React.FunctionComponent<Props> = ({ fornavn, locale, onChangeLocale }) => {
    const intl = useIntl();
    const { dispatch } = useForeldrepengesøknadContext();

    const onValidSubmit = (values: Partial<VelkommenFormData>) => {
        dispatch(
            actionCreator.setVelkommen({
                harForståttRettigheterOgPlikter: values.harForståttRettigheterOgPlikter!!,
            })
        );
    };

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={initialVelkommenValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={() => {
                return (
                    <VelkommenFormComponents.Form
                        includeButtons={false}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                    >
                        <LanguageToggle
                            locale={locale}
                            availableLocales={['nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        />
                        <Block padBottom="xl">
                            <VelkommenFormComponents.ConfirmationCheckbox
                                name={VelkommenFormField.harForståttRettigheterOgPlikter}
                                label={intlUtils(intl, 'velkommen.samtykke')}
                                validate={(value) => {
                                    let result;
                                    if (value !== true) {
                                        result = intlUtils(
                                            intl,
                                            'valideringsfeil.velkommen.bekreftLestOgForståttRettigheter'
                                        );
                                    }
                                    return result;
                                }}
                            >
                                <>
                                    <Block padBottom="l">
                                        <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                                    </Block>
                                </>
                            </VelkommenFormComponents.ConfirmationCheckbox>
                        </Block>
                    </VelkommenFormComponents.Form>
                );
            }}
        />
    );
};

export default Velkommen;
