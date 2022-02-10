import { Block, intlUtils, Step } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import Uttaksplan from 'uttaksplan/Uttaksplan';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import {
    getFarMedmorErAleneOmOmsorg,
    getKjønnFromFnr,
    getMorErAleneOmOmsorg,
    getNavnPåForeldre,
} from 'app/utils/personUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getForeldreparSituasjon } from 'app/utils/foreldreparSituasjonUtils';
import { Forelder } from 'app/types/Forelder';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { Periode } from 'uttaksplan/types/Periode';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import Api from 'app/api/api';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import useDebounce from 'app/utils/hooks/useDebounce';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';

const UttaksplanStep = () => {
    const intl = useIntl();
    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const nextRoute = søknad.erEndringssøknad ? SøknadRoutes.OPPSUMMERING : SøknadRoutes.UTENLANDSOPPHOLD;

    const onValidSubmitHandler = () => [];
    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        nextRoute,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );
    const onAvbrytSøknad = useAvbrytSøknad();

    const { person, arbeidsforhold } = søkerinfo;
    const { annenForelder, søker, barn, søkersituasjon, dekningsgrad, erEndringssøknad } = søknad;
    const { erAleneOmOmsorg } = søker;
    const { situasjon } = søkersituasjon;
    const debouncedState = useDebounce(state, 3000);

    useEffect(() => {
        Api.storeAppState(debouncedState, person.fnr);
    }, [person.fnr, debouncedState]);

    const annenForelderKjønn = getKjønnFromFnr(annenForelder);
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepenger : false;
    const erFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const forelderVedAleneomsorg = erDeltUttak ? undefined : erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor);
    const erFlerbarnssøknad = parseInt(barn.antallBarn, 10) > 1;

    const foreldreSituasjon = getForeldreparSituasjon(
        person.kjønn,
        annenForelderKjønn,
        erDeltUttak,
        morErAleneOmOmsorg,
        farMedmorErAleneOmOmsorg
    );

    const { tilgjengeligeStønadskontoerData: stønadskontoer100 } = Api.useGetUttakskontoer(
        getStønadskontoParams(Dekningsgrad.HUNDRE_PROSENT, barn, annenForelder, søkersituasjon)
    );
    const { tilgjengeligeStønadskontoerData: stønadskontoer80 } = Api.useGetUttakskontoer(
        getStønadskontoParams(Dekningsgrad.ÅTTI_PROSENT, barn, annenForelder, søkersituasjon)
    );

    const handleOnPlanChange = (plan: Periode[]) => {
        dispatch(actionCreator.setUttaksplan(plan));
    };

    if (!stønadskontoer100 || !stønadskontoer80) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    const stønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        stønadskontoer80,
        stønadskontoer100,
        familiehendelsesdato,
        erMorUfør
    );

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('uttaksplan')}
            activeStepId="uttaksplan"
            pageTitle={intlUtils(intl, 'søknad.uttaksplan')}
            stepTitle={intlUtils(intl, 'søknad.uttaksplan')}
            onCancel={onAvbrytSøknad}
            onContinueLater={() => null}
            steps={stepConfig}
            kompakt={true}
        >
            <Uttaksplan
                foreldreSituasjon={foreldreSituasjon}
                forelderVedAleneomsorg={forelderVedAleneomsorg}
                erDeltUttak={erDeltUttak}
                uttaksplan={søknad.uttaksplan}
                familiehendelsesdato={familiehendelsesdato}
                handleOnPlanChange={handleOnPlanChange}
                stønadskontoer={dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskontoer[100] : stønadskontoer[80]}
                navnPåForeldre={navnPåForeldre}
                annenForelder={annenForelder}
                arbeidsforhold={arbeidsforhold}
                erEndringssøknad={erEndringssøknad}
                erFarEllerMedmor={erFarEllerMedmor}
                erFlerbarnssøknad={erFlerbarnssøknad}
                erAleneOmOmsorg={erAleneOmOmsorg}
                situasjon={situasjon}
            />
            <Block textAlignCenter={true}>
                <Hovedknapp onClick={handleSubmit} disabled={isSubmitting} spinner={isSubmitting}>
                    {intlUtils(intl, 'søknad.gåVidere')}
                </Hovedknapp>
            </Block>
        </Step>
    );
};

export default UttaksplanStep;
