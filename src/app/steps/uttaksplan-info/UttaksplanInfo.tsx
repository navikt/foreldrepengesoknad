import { intlUtils, Step } from '@navikt/fp-common';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import Api from 'app/api/api';
import UttaksplanInfoScenarios from './components/UttaksplanInfoScenarios';
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { getRegistrertBarnOmDetFinnes } from 'app/utils/barnUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import actionCreator from 'app/context/action/actionCreator';
import { mapEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { RequestStatus } from 'app/types/RequestState';

const UttaksplanInfo = () => {
    const intl = useIntl();

    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();
    const { dispatch } = useForeldrepengesøknadContext();

    const { barn, annenForelder, søkersituasjon } = søknad;
    const { registrerteBarn } = søkerinfo;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);

    const registrertBarn = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);
    const eksisterendeSakAnnenPartRequestIsSuspended =
        registrertBarn?.annenForelder?.fnr !== undefined && erFarEllerMedmor ? false : true;

    const { eksisterendeSakAnnenPartData, eksisterendeSakAnnenPartRequestStatus } = Api.useGetEksisterendeSakMedFnr(
        søkerinfo.person.fnr,
        erFarEllerMedmor,
        registrertBarn?.annenForelder?.fnr
    );

    const eksisterendeSak = useMemo(
        () => mapEksisterendeSakFromDTO(eksisterendeSakAnnenPartData, erFarEllerMedmor, true),
        [eksisterendeSakAnnenPartData, erFarEllerMedmor]
    );

    useEffect(() => {
        if (eksisterendeSak !== undefined) {
            dispatch(actionCreator.setUttaksplan(eksisterendeSak!.uttaksplan));
            dispatch(actionCreator.setEksisterendeSak(eksisterendeSak));
        }
    }, [eksisterendeSak, dispatch]);

    const { tilgjengeligeStønadskontoerData: stønadskontoer100, tilgjengeligeStønadskontoerError } =
        Api.useGetUttakskontoer(
            getStønadskontoParams(
                Dekningsgrad.HUNDRE_PROSENT,
                barn,
                annenForelder,
                søkersituasjon,
                eksisterendeSakAnnenPartData?.grunnlag.termindato
            ),
            eksisterendeSakAnnenPartRequestIsSuspended
                ? false
                : !!registrertBarn &&
                      erFarEllerMedmor &&
                      eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED
        );
    const { tilgjengeligeStønadskontoerData: stønadskontoer80 } = Api.useGetUttakskontoer(
        getStønadskontoParams(
            Dekningsgrad.ÅTTI_PROSENT,
            barn,
            annenForelder,
            søkersituasjon,
            eksisterendeSakAnnenPartData?.grunnlag.termindato
        ),
        eksisterendeSakAnnenPartRequestIsSuspended
            ? false
            : !!registrertBarn && erFarEllerMedmor && eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    if (
        !stønadskontoer100 ||
        !stønadskontoer80 ||
        (!!registrertBarn && erFarEllerMedmor && eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED)
    ) {
        if (tilgjengeligeStønadskontoerError?.response?.status === 500) {
            throw new Error(
                `Vi klarte ikke å hente opp stønadskontoer med følgende feilmelding: ${tilgjengeligeStønadskontoerError.response.data.messages}`
            );
        }

        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('uttaksplanInfo')}
            activeStepId="uttaksplanInfo"
            pageTitle={intlUtils(intl, 'søknad.uttaksplanInfo')}
            stepTitle={intlUtils(intl, 'søknad.uttaksplanInfo')}
            onCancel={onAvbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl)}
            kompakt={true}
        >
            <UttaksplanInfoScenarios
                tilgjengeligeStønadskontoer100DTO={stønadskontoer100}
                tilgjengeligeStønadskontoer80DTO={stønadskontoer80}
                eksisterendeSakAnnenPart={eksisterendeSak}
            />
        </Step>
    );
};

export default UttaksplanInfo;
