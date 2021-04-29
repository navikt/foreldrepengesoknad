import { intlUtils, Step } from '@navikt/fp-common';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import SøknadRoutes from 'app/routes/routes';
import { onAvbrytSøknad } from 'app/utils/globalUtil';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import stepConfig, { getPreviousStepHref } from '../config/stepsConfig';
import { OmBarnetFormComponents, OmBarnetFormData } from './omBarnetFormConfig';
import mapOmBarnetFormDataToState from './omBarnetUtils';

interface Props {}

const OmBarnet: React.FunctionComponent<Props> = () => {
    const intl = useIntl();
    const history = useHistory();
    const { state, dispatch } = useForeldrepengesøknadContext();
    const hasSubmitted = useRef(false);

    useEffect(() => {
        if (hasSubmitted.current === true) {
            Api.storeAppState(state);
            history.push(SøknadRoutes.OMBARNET);
        }
    }, [state]);

    const onValidSubmit = (values: Partial<OmBarnetFormData>) => {
        const barn = mapOmBarnetFormDataToState(values);

        dispatch(actionCreator.setOmBarnet(barn));

        hasSubmitted.current = true;
    };

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={{}}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={() => {
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        backLinkHref={getPreviousStepHref('omBarnet')}
                        activeStepId="omBarnet"
                        pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        onCancel={() => onAvbrytSøknad(dispatch, history)}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <div>Test</div>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
