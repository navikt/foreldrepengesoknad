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

const UttaksplanInfo = () => {
    const intl = useIntl();
    const { dispatch } = useForeldrepengesøknadContext();
    const history = useHistory();

    const goNext = () => {
        history.push(SøknadRoutes.UTTAKSPLAN);
    };

    useEffect(() => {
        dispatch(actionCreator.updateCurrentRoute(SøknadRoutes.UTTAKSPLAN_INFO));
    }, []);

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('uttaksplanInfo')}
            activeStepId="uttaksplanInfo"
            pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            onCancel={() => onAvbrytSøknad(dispatch, history)}
            steps={stepConfig}
            kompakt={true}
        >
            <div>Uttaksplaninfo</div>
            <Block textAlignCenter={true}>
                <Hovedknapp onClick={goNext}>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
            </Block>
        </Step>
    );
};

export default UttaksplanInfo;
