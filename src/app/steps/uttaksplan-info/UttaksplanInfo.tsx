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
import { getFamiliehendelsedato, getRegistrertBarnOmDetFinnes, getTermindato } from 'app/utils/barnUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import actionCreator from 'app/context/action/actionCreator';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { RequestStatus } from 'app/types/RequestState';
import { getFarMedmorErAleneOmOmsorg, getMorErAleneOmOmsorg } from 'app/utils/personUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { isFødtBarn } from 'app/context/types/Barn';
import { dateToISOString } from '@navikt/sif-common-formik/lib';

const UttaksplanInfo = () => {
    const intl = useIntl();

    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();
    const { dispatch, state } = useForeldrepengesøknadContext();

    const { barn, annenForelder, søkersituasjon, søker } = søknad;
    const { registrerteBarn } = søkerinfo;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const { erAleneOmOmsorg } = søker;
    const { barnFraNesteSak } = state;

    const familieHendelseDatoNesteSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.familiehendelsesdato : undefined;
    const førsteUttaksdagNesteBarnsSak =
        state.barnFraNesteSak !== undefined ? state.barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const registrertBarn = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);
    const eksisterendeSakAnnenPartRequestIsSuspended =
        registrertBarn?.annenForelder?.fnr !== undefined &&
        registrertBarn?.annenForelder?.fnr !== '' &&
        erFarEllerMedmor
            ? false
            : true;

    const annenPartFnr = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fnr : undefined;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const barnFnr = isFødtBarn(barn) && barn.fnr !== undefined && barn.fnr?.length > 0 ? barn.fnr[0] : undefined;
    const { eksisterendeSakAnnenPartData, eksisterendeSakAnnenPartError, eksisterendeSakAnnenPartRequestStatus } =
        Api.useGetAnnenPartsVedtak(
            annenPartFnr,
            barnFnr,
            familiehendelsesdato,
            eksisterendeSakAnnenPartRequestIsSuspended
        );

    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);

    const eksisterendeVedtakAnnenPart = useMemo(
        () =>
            mapAnnenPartsEksisterendeSakFromDTO(
                eksisterendeSakAnnenPartData,
                barn,
                erFarEllerMedmor,
                familiehendelsesdato,
                førsteUttaksdagNesteBarnsSak
            ),
        [eksisterendeSakAnnenPartData, barn, erFarEllerMedmor, familiehendelsesdato, førsteUttaksdagNesteBarnsSak]
    );
    const termindato = dateToISOString(getTermindato(barn));

    //Uttaksplaninfo vises ikke hvis endringssøknad, så det er nok å sette annen parts sak og uttaksplan her
    useEffect(() => {
        if (eksisterendeVedtakAnnenPart !== undefined) {
            dispatch(actionCreator.setUttaksplan(eksisterendeVedtakAnnenPart!.uttaksplan));
            dispatch(actionCreator.setEksisterendeSak(eksisterendeVedtakAnnenPart));
        }
    }, [eksisterendeVedtakAnnenPart, dispatch]);

    useEffect(() => {
        dispatch(actionCreator.setUttaksplanSlettet(false));
    }, [dispatch]);

    const { tilgjengeligeStønadskontoerData: stønadskontoer100, tilgjengeligeStønadskontoerError } =
        Api.useGetUttakskontoer(
            getStønadskontoParams(
                Dekningsgrad.HUNDRE_PROSENT,
                barn,
                annenForelder,
                søkersituasjon,
                farMedmorErAleneOmOmsorg,
                morErAleneOmOmsorg,
                dateToISOString(familieHendelseDatoNesteSak),
                termindato
            ),
            eksisterendeSakAnnenPartRequestIsSuspended
                ? false
                : !!registrertBarn && eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED
        );
    const { tilgjengeligeStønadskontoerData: stønadskontoer80 } = Api.useGetUttakskontoer(
        getStønadskontoParams(
            Dekningsgrad.ÅTTI_PROSENT,
            barn,
            annenForelder,
            søkersituasjon,
            farMedmorErAleneOmOmsorg,
            morErAleneOmOmsorg,
            dateToISOString(familieHendelseDatoNesteSak),
            termindato
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
        (!!registrertBarn &&
            erFarEllerMedmor &&
            eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED &&
            !eksisterendeSakAnnenPartRequestIsSuspended)
    ) {
        if (tilgjengeligeStønadskontoerError?.response?.status === 500) {
            throw new Error(
                `Vi klarte ikke å hente opp stønadskontoer med følgende feilmelding: ${tilgjengeligeStønadskontoerError.response.data.messages}`
            );
        }
        if (tilgjengeligeStønadskontoerError?.response?.status === 400) {
            throw new Error(
                `Vi klarte ikke å hente opp stønadskontoer med følgende feilmelding: ${tilgjengeligeStønadskontoerError.response.data}`
            );
        }
        if (eksisterendeSakAnnenPartError?.response?.status === 500) {
            throw new Error(
                `Vi klarte ikke å hente opp saken til annen forelder med følgende feilmelding: ${eksisterendeSakAnnenPartError.response.data.messages}`
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
                eksisterendeSakAnnenPart={eksisterendeVedtakAnnenPart}
            />
        </Step>
    );
};

export default UttaksplanInfo;
