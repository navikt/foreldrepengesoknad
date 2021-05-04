import { Block, intlUtils, Step } from '@navikt/fp-common';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import SøknadRoutes from 'app/routes/routes';
import { onAvbrytSøknad } from 'app/utils/globalUtil';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import Adopsjon from './components/Adopsjon';
import Fødsel from './components/Fødsel';
import Termin from './components/Termin';
import {
    getOmBarnetInitialValues,
    OmBarnetFormComponents,
    OmBarnetFormData,
    OmBarnetFormField,
} from './omBarnetFormConfig';
import omBarnetQuestionsConfig from './omBarnetQuestionsConfig';
import mapOmBarnetFormDataToState from './omBarnetUtils';

interface Props {}

const OmBarnet: React.FunctionComponent<Props> = () => {
    const intl = useIntl();
    const history = useHistory();
    const { state, dispatch } = useForeldrepengesøknadContext();
    const hasSubmitted = useRef(false);
    const { søkersituasjon } = state.søknad;

    useEffect(() => {
        if (hasSubmitted.current === true) {
            Api.storeAppState(state);
            history.push(SøknadRoutes.ANNEN_FORELDER);
        }
    }, [state]);

    const onValidSubmit = (values: Partial<OmBarnetFormData>) => {
        const barn = mapOmBarnetFormDataToState(values);

        dispatch(actionCreator.setOmBarnet(barn));

        hasSubmitted.current = true;
    };

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={getOmBarnetInitialValues(state.søknad.barn)}
            onSubmit={(values: Partial<OmBarnetFormData>) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility({
                    ...formValues,
                    situasjon: søkersituasjon.situasjon,
                    kjønn: søkersituasjon.rolle,
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
                        <OmBarnetFormComponents.YesOrNoQuestion
                            name={OmBarnetFormField.erBarnetFødt}
                            legend={intlUtils(intl, 'omBarnet.erBarnetFødt')}
                        />
                        <Adopsjon søkersituasjon={søkersituasjon} />
                        <Termin søkersituasjon={søkersituasjon} erBarnetFødt={formValues.erBarnetFødt} />
                        <Fødsel søkersituasjon={søkersituasjon} formValues={formValues} visibility={visibility} />
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                        </Block>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
