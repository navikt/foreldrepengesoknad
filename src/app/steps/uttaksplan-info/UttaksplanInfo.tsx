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
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import NavFrontendSpinner from 'nav-frontend-spinner';

const UttaksplanInfo = () => {
    const intl = useIntl();

    const onValidSubmitHandler = () => [];
    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();

    const { barn, søker, annenForelder } = søknad;
    const { registrerteBarn } = søkerinfo;

    let registrertBarn = undefined;

    if (isFødtBarn(barn)) {
        registrertBarn = registrerteBarn.find((regBarn) => dayjs(regBarn.fødselsdato).isSame(barn.fødselsdatoer[0]));
    }

    const { eksisterendeSakAnnenPartData } = Api.useGetEksisterendeSakMedFnr(
        søkerinfo.person.fnr,
        registrertBarn?.annenForelder?.fnr
    );
    const { tilgjengeligeStønadskontoerData: stønadskontoer100 } = Api.useGetUttakskontoer(
        getStønadskontoParams(
            getFamiliehendelsedato(barn),
            Dekningsgrad.HUNDRE_PROSENT,
            '1',
            false,
            barn,
            søker,
            annenForelder
        )
    );
    const { tilgjengeligeStønadskontoerData: stønadskontoer80 } = Api.useGetUttakskontoer(
        getStønadskontoParams(
            getFamiliehendelsedato(barn),
            Dekningsgrad.ÅTTI_PROSENT,
            '1',
            false,
            barn,
            søker,
            annenForelder
        )
    );
    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTTAKSPLAN);
    const onAvbrytSøknad = useAvbrytSøknad();

    if (!stønadskontoer100 || !stønadskontoer80) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    console.log(eksisterendeSakAnnenPartData);

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
            <UttaksplanInfoScenarios
                tilgjengeligeStønadskontoer100DTO={stønadskontoer100}
                tilgjengeligeStønadskontoer80DTO={stønadskontoer80}
            />
            <Block textAlignCenter={true}>
                <Hovedknapp onClick={onValidSubmit}>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
            </Block>
        </Step>
    );
};

export default UttaksplanInfo;
