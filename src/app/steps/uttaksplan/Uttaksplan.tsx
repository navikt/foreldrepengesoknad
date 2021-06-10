import { Block, intlUtils, Step } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSetCurrentRoute from 'app/utils/hooks/useSetCurrentRoute';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';

const Uttaksplan = () => {
    const intl = useIntl();

    useSetCurrentRoute(SøknadRoutes.UTTAKSPLAN);

    const onValidSubmitHandler = () => { return [] };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTENLANDSOPPHOLD);
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('uttaksplan')}
            activeStepId="uttaksplan"
            pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            onCancel={onAvbrytSøknad}
            steps={stepConfig}
            kompakt={true}
        >
            <div>Uttaksplan</div>
            <Block textAlignCenter={true}>
                <Hovedknapp onClick={onValidSubmit}>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
            </Block>
        </Step>
    );
};

export default Uttaksplan;
