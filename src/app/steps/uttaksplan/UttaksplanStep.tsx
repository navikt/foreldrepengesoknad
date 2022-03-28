import { Block, intlUtils, Step } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import AlertStripe from 'nav-frontend-alertstriper';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import Uttaksplan from 'uttaksplan/Uttaksplan';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import {
    getFarMedmorErAleneOmOmsorg,
    getKjønnFromFnr,
    getMorErAleneOmOmsorg,
    getMorHarRettPåForeldrepenger,
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
import { getPerioderSomSkalSendesInn, storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SenEndringÅrsak } from 'uttaksplan/types/SenEndringÅrsak';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { getEndringstidspunkt } from 'app/utils/dateUtils';
import { cleanupInvisibleCharsFromTilleggsopplysninger } from 'app/utils/tilleggsopplysningerUtils';
import VilDuGåTilbakeModal from './components/vil-du-gå-tilbake-modal/VilDuGåTilbakeModal';

const UttaksplanStep = () => {
    const intl = useIntl();
    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();
    const [gåTilbakeIsOpen, setGåTilbakeIsOpen] = useState(false);
    const [uttaksplanErGyldig, setUttaksplanErGyldig] = useState(true);
    const [submitIsClicked, setSubmitIsClicked] = useState(false);
    const { dispatch, state } = useForeldrepengesøknadContext();
    const [endringstidspunkt, setEndringstidspunkt] = useState(state.endringstidspunkt);
    const [perioderSomSkalSendesInn, setPerioderSomSkalSendesInn] = useState(state.perioderSomSkalSendesInn);
    const nextRoute = søknad.erEndringssøknad ? SøknadRoutes.OPPSUMMERING : SøknadRoutes.UTENLANDSOPPHOLD;

    const onValidSubmitHandler = () => {
        setSubmitIsClicked(true);
        const cleanedTilleggsopplysninger = cleanupInvisibleCharsFromTilleggsopplysninger(tilleggsopplysninger);
        return [
            actionCreator.setTilleggsopplysninger(cleanedTilleggsopplysninger),
            actionCreator.setEndringstidspunkt(endringstidspunkt),
            actionCreator.setPerioderSomSkalSendesInn(perioderSomSkalSendesInn),
        ];
    };

    const handleBegrunnelseChange = (årsak: SenEndringÅrsak, begrunnelse: string) => {
        const ekstraInformasjon = årsak !== SenEndringÅrsak.Ingen ? årsak : undefined;
        const opplysninger = {
            ...tilleggsopplysninger,
            begrunnelseForSenEndring: {
                ...tilleggsopplysninger.begrunnelseForSenEndring,
                tekst: begrunnelse,
                ekstraInformasjon: ekstraInformasjon,
            },
        };
        dispatch(actionCreator.setTilleggsopplysninger(opplysninger));
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        nextRoute,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    //TODO: what's the type here?
    const clickHandler = (values: any) => {
        setSubmitIsClicked(true);
        if (uttaksplanErGyldig && !erTomEndringssøknad) {
            handleSubmit(values);
        }
    };

    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const { person, arbeidsforhold } = søkerinfo;
    const { annenForelder, søker, barn, søkersituasjon, dekningsgrad, erEndringssøknad, tilleggsopplysninger } = søknad;
    const { erAleneOmOmsorg } = søker;
    const { situasjon } = søkersituasjon;
    const { rolle } = søkersituasjon;
    const debouncedState = useDebounce(state, 3000);

    useEffect(() => {
        Api.storeAppState(debouncedState, person.fnr);
    }, [person.fnr, debouncedState]);

    const annenForelderKjønn = getKjønnFromFnr(annenForelder);
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepenger : false;
    const erFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const søkerErAleneOmOmsorg = morErAleneOmOmsorg || farMedmorErAleneOmOmsorg;
    const forelderVedAleneomsorg = erDeltUttak ? undefined : erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor);
    const antallBarn = barn.antallBarn;
    const erFlerbarnssøknad = antallBarn > 1;
    const harMorRett = getMorHarRettPåForeldrepenger(rolle, erFarEllerMedmor, annenForelder);
    const eksisterendeSak = state.eksisterendeSak;
    const opprinneligPlan = state.eksisterendeSak?.uttaksplan;
    const harMidlertidigOmsorg = false; //TODO søkerHarMidlertidigOmsorg

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

    const handleOnPlanChange = (nyPlan: Periode[]) => {
        setSubmitIsClicked(false);
        dispatch(actionCreator.setUttaksplan(nyPlan));
        const tidspunktForEndring = getEndringstidspunkt(opprinneligPlan, nyPlan, erEndringssøknad);
        setEndringstidspunkt(tidspunktForEndring);

        const perioderForÅSendeInn = getPerioderSomSkalSendesInn(
            nyPlan,
            erEndringssøknad,
            opprinneligPlan,
            tidspunktForEndring
        );
        setPerioderSomSkalSendesInn(perioderForÅSendeInn);
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

    const valgteStønadskontoer =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskontoer[100] : stønadskontoer[80];

    const erTomEndringssøknad =
        erEndringssøknad && (perioderSomSkalSendesInn === undefined || perioderSomSkalSendesInn.length === 0);

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={erEndringssøknad ? undefined : getPreviousStepHref('uttaksplan')}
            backLinkOnClick={
                erEndringssøknad
                    ? undefined
                    : (_href, event) => {
                          event.preventDefault();
                          setGåTilbakeIsOpen(true);
                      }
            }
            activeStepId="uttaksplan"
            pageTitle={intlUtils(intl, 'søknad.uttaksplan')}
            stepTitle={intlUtils(intl, 'søknad.uttaksplan')}
            onCancel={onAvbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl)}
            kompakt={true}
        >
            <Uttaksplan
                foreldreSituasjon={foreldreSituasjon}
                forelderVedAleneomsorg={forelderVedAleneomsorg}
                erDeltUttak={erDeltUttak}
                uttaksplan={søknad.uttaksplan}
                familiehendelsesdato={familiehendelsesdato}
                handleOnPlanChange={handleOnPlanChange}
                stønadskontoer={valgteStønadskontoer}
                navnPåForeldre={navnPåForeldre}
                annenForelder={annenForelder}
                arbeidsforhold={arbeidsforhold}
                erEndringssøknad={erEndringssøknad}
                erFarEllerMedmor={erFarEllerMedmor}
                erFlerbarnssøknad={erFlerbarnssøknad}
                erAleneOmOmsorg={søkerErAleneOmOmsorg}
                harMidlertidigOmsorg={harMidlertidigOmsorg}
                situasjon={situasjon}
                erMorUfør={erMorUfør}
                harMorRett={harMorRett}
                søkersituasjon={søkersituasjon}
                dekningsgrad={dekningsgrad}
                antallBarn={antallBarn}
                tilleggsopplysninger={tilleggsopplysninger}
                setUttaksplanErGyldig={setUttaksplanErGyldig}
                handleBegrunnelseChange={handleBegrunnelseChange}
                eksisterendeSak={eksisterendeSak}
                perioderSomSkalSendesInn={perioderSomSkalSendesInn}
            />
            <VilDuGåTilbakeModal isOpen={gåTilbakeIsOpen} setIsOpen={setGåTilbakeIsOpen} />
            {!uttaksplanErGyldig && submitIsClicked && (
                <Block textAlignCenter={true} padBottom="l">
                    <AlertStripe type="feil">
                        <FormattedMessage id="uttaksplan.validering.kanIkkeGåVidere" />
                    </AlertStripe>
                </Block>
            )}
            {erTomEndringssøknad && submitIsClicked && (
                <Block textAlignCenter={true} padBottom="l">
                    <AlertStripe type="feil">
                        <FormattedMessage id="uttaksplan.validering.kanIkkeGåVidereEndringssøknad" />
                    </AlertStripe>
                </Block>
            )}
            <Block textAlignCenter={true} padBottom="l">
                <Hovedknapp onClick={clickHandler} disabled={isSubmitting} spinner={isSubmitting}>
                    {intlUtils(intl, 'søknad.gåVidere')}
                </Hovedknapp>
            </Block>
        </Step>
    );
};

export default UttaksplanStep;
