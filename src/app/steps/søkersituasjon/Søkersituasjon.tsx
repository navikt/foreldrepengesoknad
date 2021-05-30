import { Block, intlUtils, Kjønn, Step } from '@navikt/fp-common';
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
import stepConfig from '../stepsConfig';
import VelgRolle from './components/VelgRolle';
import {
    getInitialSøkerSituasjonValues,
    SøkersituasjonFormComponents,
    SøkersituasjonFormData,
    SøkersituasjonFormField,
} from './søkersituasjonFormConfig';
import søkersituasjonQuestionsConfig from './søkersituasjonQuestionsConfig';
import { mapSøkersituasjonFormDataToState } from './søkersituasjonUtils';

interface Props {
    kjønn: Kjønn;
}

const Søkersituasjon: React.FunctionComponent<Props> = ({ kjønn }) => {
    const intl = useIntl();
    const history = useHistory();
    const { state, dispatch } = useForeldrepengesøknadContext();
    const hasSubmitted = useRef(false);

    useEffect(() => {
        if (hasSubmitted.current === true) {
            Api.storeAppState(state);
            history.push(SøknadRoutes.OM_BARNET);
        }
    }, [state]);

    useEffect(() => {
        dispatch(actionCreator.updateCurrentRoute(SøknadRoutes.SØKERSITUASJON));
    }, []);

    const onValidSubmit = (values: Partial<SøkersituasjonFormData>) => {
        const søkersituasjon = mapSøkersituasjonFormDataToState(values);

        dispatch(actionCreator.setSøkersituasjon(søkersituasjon));

        hasSubmitted.current = true;
    };

    return (
        <SøkersituasjonFormComponents.FormikWrapper
            initialValues={getInitialSøkerSituasjonValues(state.søknad.søkersituasjon)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = søkersituasjonQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="søkersituasjon"
                        pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        onCancel={() => onAvbrytSøknad(dispatch, history)}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <SøkersituasjonFormComponents.Form
                            includeButtons={false}
                            fieldErrorHandler={getFieldErrorRenderer(intl)}
                        >
                            <div>
                                <Block margin="xl">
                                    <SøkersituasjonFormComponents.RadioPanelGroup
                                        name={SøkersituasjonFormField.situasjon}
                                        radios={[
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radioButton.fødsel'),
                                                value: 'fødsel',
                                            },
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radioButton.adopsjon'),
                                                value: 'adopsjon',
                                            },
                                        ]}
                                        useTwoColumns={true}
                                        legend={intlUtils(intl, 'søkersituasjon.text.situasjon')}
                                    />
                                </Block>
                                <Block visible={visibility.isVisible(SøkersituasjonFormField.rolle)} margin="xl">
                                    <VelgRolle kjønn={kjønn} />
                                </Block>
                                {allQuestionsAnswered && (
                                    <Block margin="xl" textAlignCenter={true}>
                                        <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                                    </Block>
                                )}
                            </div>
                        </SøkersituasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Søkersituasjon;
