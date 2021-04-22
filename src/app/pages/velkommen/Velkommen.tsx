import { bemUtils, Block, intlUtils, LanguageToggle, Locale, Sidebanner } from '@navikt/fp-common';
import { getFieldErrorRenderer } from '@navikt/sif-common-formik/lib/utils/formikErrorRenderUtils';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    initialVelkommenValues,
    VelkommenFormComponents,
    VelkommenFormData,
    VelkommenFormField,
} from './velkommenFormConfig';
import DinePlikter from 'app/components/DinePlikter';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import DinePersonopplysningerModal from '../modaler/DinePersonopplysningerModal';

import './velkommen.less';
import { useHistory } from 'react-router';
import { validateHarForståttRettigheterOgPlikter } from './validation/velkommenValidation';

interface Props {
    fornavn: string;
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
}

const Velkommen: React.FunctionComponent<Props> = ({ fornavn, locale, onChangeLocale }) => {
    const intl = useIntl();
    const history = useHistory();
    const [isDinePersonopplysningerModalOpen, setDinePersonopplysningerModalOpen] = useState(false);
    const { dispatch } = useForeldrepengesøknadContext();
    const bem = bemUtils('velkommen');

    const onValidSubmit = (values: Partial<VelkommenFormData>) => {
        dispatch(
            actionCreator.setVelkommen({
                harForståttRettigheterOgPlikter: values.harForståttRettigheterOgPlikter!!,
            })
        );

        history.push('/soknad/sokersituasjon');
    };

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={initialVelkommenValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={() => {
                return (
                    <VelkommenFormComponents.Form
                        includeButtons={false}
                        fieldErrorRenderer={getFieldErrorRenderer(intl, 'valideringsfeil.velkommen')}
                    >
                        <LanguageToggle
                            locale={locale}
                            availableLocales={['nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        />
                        <Sidebanner
                            dialog={{
                                title: intlUtils(intl, 'velkommen.bobletittel', { name: fornavn }),
                                text: (
                                    <>
                                        <Block padBottom="m">
                                            <FormattedMessage id={'velkommen.bobletekst'} />
                                        </Block>
                                    </>
                                ),
                            }}
                        />
                        <div className={bem.block}>
                            <Block padBottom="xl">
                                <VelkommenFormComponents.ConfirmationCheckbox
                                    name={VelkommenFormField.harForståttRettigheterOgPlikter}
                                    label={intlUtils(intl, 'velkommen.samtykke')}
                                    validate={validateHarForståttRettigheterOgPlikter}
                                >
                                    <>
                                        <Block padBottom="l">
                                            <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                                        </Block>
                                        <Block padBottom="m">
                                            <DinePlikter />
                                        </Block>
                                        <Block padBottom="l">
                                            <FormattedMessage id="velkommen.samtykkeIntro.del2" />
                                        </Block>
                                        <FormattedMessage id="velkommen.samtykkeIntro.del3" />
                                    </>
                                </VelkommenFormComponents.ConfirmationCheckbox>
                            </Block>
                            <Block padBottom="l">
                                <div style={{ textAlign: 'center' }}>
                                    <Hovedknapp>Begynn med søknad</Hovedknapp>
                                </div>
                            </Block>
                            <Normaltekst className={bem.element('personopplysningerLink')}>
                                <a
                                    className="lenke"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDinePersonopplysningerModalOpen(true);
                                    }}
                                >
                                    <FormattedMessage id="velkommen.lesMerOmPersonopplysninger" />
                                </a>
                            </Normaltekst>
                            <DinePersonopplysningerModal
                                isOpen={isDinePersonopplysningerModalOpen}
                                onRequestClose={() => setDinePersonopplysningerModalOpen(false)}
                            />
                        </div>
                    </VelkommenFormComponents.Form>
                );
            }}
        />
    );
};

export default Velkommen;
