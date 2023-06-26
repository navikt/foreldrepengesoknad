import { Alert, Button, GuidePanel, Heading } from '@navikt/ds-react';
import { Block, bemUtils, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    ForsideFormComponents,
    ForsideFormData,
    ForsideFormField,
    forsideFormQuestions,
    getInitialForsideValues,
} from './forsideFormConfig';
import './forside.less';
import links from 'app/links/links';
const Forside = () => {
    const intl = useIntl();
    const handleSubmit = () => {
        console.log('submitting');
    };
    const bem = bemUtils('forside');
    return (
        <ForsideFormComponents.FormikWrapper
            initialValues={getInitialForsideValues(false)} //{getInitialForsideValues(søknad.harGodkjentVilkår)}
            onSubmit={handleSubmit}
            renderForm={({ values }) => {
                const visibility = forsideFormQuestions.getVisbility({
                    ...values,
                } as ForsideFormData);
                return (
                    <ForsideFormComponents.Form includeButtons={false}>
                        {/* <LanguageToggle
                            locale={locale}
                            availableLocales={['nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        /> */}
                        <div className={bem.block}>
                            <Block>
                                <Heading size="xlarge" className={`${bem.element('tittel')}`}>
                                    {intlUtils(intl, 'forside.tittel')}
                                </Heading>
                            </Block>
                            <Block padBottom="l">
                                <GuidePanel poster>
                                    <Block padBottom="m">{intlUtils(intl, 'forside.guidepanel.del1')}</Block>
                                    <Block padBottom="m">{intlUtils(intl, 'forside.guidepanel.del2')}</Block>
                                    <ul>
                                        <li>{intlUtils(intl, 'forside.guidepanel.del3.punkt1')}</li>
                                        <li>{intlUtils(intl, 'forside.guidepanel.del3.punkt2')}</li>
                                        <li>{intlUtils(intl, 'forside.guidepanel.del3.punkt3')}</li>
                                    </ul>
                                    <Block padBottom="m">{intlUtils(intl, 'forside.guidepanel.del1')}</Block>
                                    <Block>
                                        <FormattedMessage
                                            id="forside.guidepanel.lesMer"
                                            values={{
                                                a: (msg: any) => (
                                                    <a
                                                        className="lenke"
                                                        rel="noopener noreferrer"
                                                        href={links.svangerskapspenger}
                                                        target="_blank"
                                                    >
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                    </Block>
                                </GuidePanel>
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(ForsideFormField.harForståttRettigheterOgPlikter)}
                            >
                                <Alert variant="info">{intlUtils(intl, 'forside.tilrettelegging.info')}</Alert>
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(ForsideFormField.harForståttRettigheterOgPlikter)}
                            >
                                {/* <VelkommenFormComponents.ConfirmationCheckbox
                                    name={VelkommenFormField.harForståttRettigheterOgPlikter}
                                    label={intlUtils(intl, 'velkommen.samtykke')}
                                    validate={validateHarForståttRettigheterOgPlikter(intl)}
                                >
                                    <>
                                        <Block padBottom="l">
                                            <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                                        </Block>
                                        <Block padBottom="m">
                                            <DinePlikter />
                                        </Block>
                                    </>
                                </VelkommenFormComponents.ConfirmationCheckbox> */}
                            </Block>
                            <Block padBottom="l">
                                <div style={{ textAlign: 'center' }}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        //disabled={isSubmitting}
                                        //loading={isSubmitting}
                                    >
                                        {intlUtils(intl, 'forside.begynnMedSøknad')}
                                    </Button>
                                </div>
                            </Block>
                            {/* <DinePersonopplysningerModal
                                isOpen={isDinePersonopplysningerModalOpen}
                                onRequestClose={() => setDinePersonopplysningerModalOpen(false)}
                            /> */}
                        </div>
                    </ForsideFormComponents.Form>
                );
            }}
        />
    );
};

export default Forside;
