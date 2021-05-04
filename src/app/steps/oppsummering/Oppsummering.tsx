import { intlUtils, Step } from '@navikt/fp-common';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { onAvbrytSøknad } from 'app/utils/globalUtil';
import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';

const Oppsummering = () => {
    const intl = useIntl();
    const { dispatch } = useForeldrepengesøknadContext();
    const history = useHistory();

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('oppsummering')}
            activeStepId="oppsummering"
            pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            onCancel={() => onAvbrytSøknad(dispatch, history)}
            steps={stepConfig}
            kompakt={true}
        >
            <div>Oppsummering</div>
        </Step>
    );
};

export default Oppsummering;
