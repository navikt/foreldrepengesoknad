import { Block, intlUtils, Step } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AdopsjonAnnetBarn from './components/AdopsjonAnnetBarn';
import AdopsjonEktefellesBarn from './components/AdopsjonEktefellesBarn';
import BarnFødtEllerAdoptert from './components/BarnFødtEllerAdoptert';
import Fødsel from './components/Fødsel';
import Termin from './components/Termin';
import { OmBarnetFormComponents, OmBarnetFormData } from './omBarnetFormConfig';
import omBarnetQuestionsConfig, { kanSøkePåTermin } from './omBarnetQuestionsConfig';
import { cleanupOmBarnetFormData, getOmBarnetInitialValues, mapOmBarnetFormDataToState } from './omBarnetUtils';
import RegistrertBarn from './components/RegistrertBarn';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { UnansweredQuestionsInfo, YesOrNo } from '@navikt/sif-common-formik/lib';

const OmBarnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const { søkersituasjon, barn } = useSøknad();
    const { arbeidsforhold, registrerteBarn } = useSøkerinfo();

    const onValidSubmitHandler = (values: Partial<OmBarnetFormData>) => {
        const barn = mapOmBarnetFormDataToState(values, registrerteBarn);
        return [actionCreator.setOmBarnet(barn)];
    };

    const onValidSubmit = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.ANNEN_FORELDER,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={getOmBarnetInitialValues(barn, registrerteBarn)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility({
                    ...formValues,
                    arbeidsforhold,
                    situasjon: søkersituasjon.situasjon,
                    rolle: søkersituasjon.rolle,
                    registrerteBarn,
                });

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        backLinkHref={getPreviousStepHref('omBarnet')}
                        activeStepId="omBarnet"
                        pageTitle={intlUtils(intl, 'søknad.omBarnet')}
                        stepTitle={intlUtils(intl, 'søknad.omBarnet')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <OmBarnetFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmBarnetFormData(values, visibility)}
                        >
                            <RegistrertBarn
                                registrerteBarn={registrerteBarn}
                                visibility={visibility}
                                formValues={formValues}
                                setFieldValue={setFieldValue}
                            />
                            <BarnFødtEllerAdoptert visibility={visibility} />
                            <AdopsjonAnnetBarn
                                søkersituasjon={søkersituasjon}
                                formValues={formValues}
                                visibility={visibility}
                            />
                            <AdopsjonEktefellesBarn
                                søkersituasjon={søkersituasjon}
                                formValues={formValues}
                                visibility={visibility}
                            />
                            <Termin søkersituasjon={søkersituasjon} formValues={formValues} visibility={visibility} />
                            <Fødsel søkersituasjon={søkersituasjon} formValues={formValues} visibility={visibility} />
                            <Block
                                visible={
                                    visibility.areAllQuestionsAnswered() &&
                                    (formValues.erBarnetFødt === YesOrNo.YES ||
                                        kanSøkePåTermin(søkersituasjon.rolle, formValues.termindato))
                                }
                                textAlignCenter={true}
                            >
                                <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                            </Block>
                            <Block visible={!visibility.areAllQuestionsAnswered()}>
                                <UnansweredQuestionsInfo>
                                    <FormattedMessage id="steg.footer.spørsmålMåBesvares" />
                                </UnansweredQuestionsInfo>
                            </Block>
                        </OmBarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
