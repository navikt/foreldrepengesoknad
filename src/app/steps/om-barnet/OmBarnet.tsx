import { Block, intlUtils, Step } from '@navikt/fp-common';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import SøknadRoutes from 'app/routes/routes';
import { onAvbrytSøknad } from 'app/utils/globalUtil';
import { getFieldErrorRenderer } from 'app/utils/validationUtil';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import AdopsjonAnnetBarn from './components/AdopsjonAnnetBarn';
import AdopsjonEktefellesBarn from './components/AdopsjonEktefellesBarn';
import BarnFødtEllerAdoptert from './components/BarnFødtEllerAdoptert';
import Fødsel from './components/Fødsel';
import Termin from './components/Termin';
import { OmBarnetFormComponents, OmBarnetFormData } from './omBarnetFormConfig';
import omBarnetQuestionsConfig from './omBarnetQuestionsConfig';
import { getOmBarnetInitialValues, mapOmBarnetFormDataToState } from './omBarnetUtils';

interface Props {}

const OmBarnet: React.FunctionComponent<Props> = () => {
    const intl = useIntl();
    const history = useHistory();
    const { state, dispatch } = useForeldrepengesøknadContext();
    const hasSubmitted = useRef(false);
    const { søkersituasjon } = state.søknad;
    const { arbeidsforhold } = state.søkerinfo;

    useEffect(() => {
        if (hasSubmitted.current === true) {
            Api.storeAppState(state);
            history.push(SøknadRoutes.ANNEN_FORELDER);
        }
    }, [state]);

    useEffect(() => {
        dispatch(actionCreator.updateCurrentRoute(SøknadRoutes.OM_BARNET));
    }, []);

    const onValidSubmit = (values: Partial<OmBarnetFormData>) => {
        const barn = mapOmBarnetFormDataToState(values);

        dispatch(actionCreator.setOmBarnet(barn));

        hasSubmitted.current = true;
    };

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={getOmBarnetInitialValues(state.søknad.barn)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility({
                    ...formValues,
                    arbeidsforhold,
                    situasjon: søkersituasjon.situasjon,
                    rolle: søkersituasjon.rolle,
                });

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        backLinkHref={getPreviousStepHref('omBarnet')}
                        activeStepId="omBarnet"
                        pageTitle={intlUtils(intl, 'søknad.omBarnet')}
                        stepTitle={intlUtils(intl, 'søknad.omBarnet')}
                        onCancel={() => onAvbrytSøknad(dispatch, history)}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <OmBarnetFormComponents.Form
                            includeButtons={false}
                            fieldErrorHandler={getFieldErrorRenderer(intl)}
                        >
                            <BarnFødtEllerAdoptert søkersituasjon={søkersituasjon} />
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
                            <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                            </Block>
                        </OmBarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
