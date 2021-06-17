import { Block, intlUtils, Step } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import { isFødtBarn } from 'app/context/types/Barn';
import dayjs from 'dayjs';
import Api from 'app/api/api';
import UttaksplanInfoScenarios from './components/UttaksplanInfoScenarios';

const UttaksplanInfo = () => {
    const intl = useIntl();

    const onValidSubmitHandler = () => [];
    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();

    const { barn } = søknad;
    const { registrerteBarn } = søkerinfo;

    let registrertBarn = undefined;

    if (isFødtBarn(barn)) {
        registrertBarn = registrerteBarn.find((regBarn) => dayjs(regBarn.fødselsdato).isSame(barn.fødselsdatoer[0]));
    }

    const { eksisterendeSakAnnenPartData } = Api.useGetEksisterendeSakMedFnr(
        søkerinfo.person.fnr,
        registrertBarn?.annenForelder?.fnr
    );

    console.log(eksisterendeSakAnnenPartData);

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTTAKSPLAN);
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('uttaksplanInfo')}
            activeStepId="uttaksplanInfo"
            pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
            onCancel={onAvbrytSøknad}
            steps={stepConfig}
            kompakt={true}
        >
            <UttaksplanInfoScenarios />
            <Block textAlignCenter={true}>
                <Hovedknapp onClick={onValidSubmit}>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
            </Block>
        </Step>
    );
};

export default UttaksplanInfo;
