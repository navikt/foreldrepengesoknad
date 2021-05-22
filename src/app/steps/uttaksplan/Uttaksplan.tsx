import { Block, intlUtils, Step } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import SøknadRoutes from 'app/routes/routes';
import { onAvbrytSøknad } from 'app/utils/globalUtil';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';

const Uttaksplan = () => {
    const intl = useIntl();
    const { dispatch } = useForeldrepengesøknadContext();
    const history = useHistory();

    const goNext = () => {
        history.push(SøknadRoutes.UTENLANDSOPPHOLD);
    };

    useEffect(() => {
        dispatch(actionCreator.updateCurrentRoute(SøknadRoutes.UTTAKSPLAN));
    }, []);

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('uttaksplan')}
            activeStepId="uttaksplan"
            pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            onCancel={() => onAvbrytSøknad(dispatch, history)}
            steps={stepConfig}
            kompakt={true}
        >
            <div>Uttaksplan</div>
            <Block textAlignCenter={true}>
                <Hovedknapp onClick={goNext}>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
            </Block>
        </Step>
    );
};

export default Uttaksplan;
