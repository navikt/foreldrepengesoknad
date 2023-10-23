import { Alert, BodyShort, Button, GuidePanel, Heading } from '@navikt/ds-react';
import { Block, bemUtils, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    ForsideFormComponents,
    ForsideFormData,
    ForsideFormField,
    forsideFormQuestions,
    getInitialForsideValues,
} from './forsideFormConfig';
import links from 'app/links/links';
import './forside.css';
import { validateHarForståttRettigheterOgPlikter } from './forsideValidation';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator, { SvangerskapspengerContextAction } from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';

const Forside = () => {
    const intl = useIntl();
    const bem = bemUtils('forside');

    const onValidSubmitHandler = (values: Partial<ForsideFormData>) => {
        const actionsToDispatch: SvangerskapspengerContextAction[] = [
            actionCreator.setHarGodkjentVilkår(values.harForståttRettigheterOgPlikter!),
        ];
        return actionsToDispatch;
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.BARNET);
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
                            <Block padBottom="xl">
                                <GuidePanel poster>
                                    <BodyShort size="medium">{intlUtils(intl, 'forside.guidepanel')}</BodyShort>
                                    <ul className={`${bem.element('liste')}`}>
                                        <li>{intlUtils(intl, 'forside.guidepanel.punkt1')}</li>
                                        <li>{intlUtils(intl, 'forside.guidepanel.punkt2')}</li>
                                        <li>{intlUtils(intl, 'forside.guidepanel.punkt3')}</li>
                                    </ul>
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
                                </GuidePanel>
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(ForsideFormField.harForståttRettigheterOgPlikter)}
                            >
                                <Alert variant="info">
                                    <FormattedMessage
                                        id="forside.tilrettelegging.info"
                                        values={{
                                            a: (msg: any) => (
                                                <a
                                                    className="lenke"
                                                    rel="noopener noreferrer"
                                                    href={links.tilretteleggingsskjema}
                                                    target="_blank"
                                                >
                                                    {msg}
                                                </a>
                                            ),
                                        }}
                                    />
                                </Alert>
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(ForsideFormField.harForståttRettigheterOgPlikter)}
                            >
                                <ForsideFormComponents.ConfirmationCheckbox
                                    name={ForsideFormField.harForståttRettigheterOgPlikter}
                                    label={intlUtils(intl, 'forside.samtykke')}
                                    validate={validateHarForståttRettigheterOgPlikter(intl)}
                                >
                                    <BodyShort size="medium">{intlUtils(intl, 'forside.samtykkeIntro')}</BodyShort>
                                    <ul className={`${bem.element('liste')}`}>
                                        <li>{intlUtils(intl, 'forside.samtykkeIntro.punkt1')}</li>
                                        <li>
                                            <FormattedMessage
                                                id="forside.samtykkeIntro.punkt2"
                                                values={{
                                                    a: (msg: any) => (
                                                        <a
                                                            className="lenke"
                                                            rel="noopener noreferrer"
                                                            href={links.rettOgPlikt}
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </a>
                                                    ),
                                                }}
                                            />
                                        </li>
                                    </ul>
                                </ForsideFormComponents.ConfirmationCheckbox>
                            </Block>
                            <Block padBottom="xl">
                                <div style={{ textAlign: 'center' }}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    >
                                        {intlUtils(intl, 'forside.begynnMedSøknad')}
                                    </Button>
                                </div>
                            </Block>
                        </div>
                    </ForsideFormComponents.Form>
                );
            }}
        />
    );
};

export default Forside;
