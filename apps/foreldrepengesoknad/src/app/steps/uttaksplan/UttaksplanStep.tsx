import { Block, intlUtils, Step, StepButtonWrapper } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import Uttaksplan from 'uttaksplan/Uttaksplan';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import {
    getFarMedmorErAleneOmOmsorg,
    getKjønnFromFnr,
    getMorErAleneOmOmsorg,
    getMorHarRettPåForeldrepengerINorgeEllerEØS,
    getNavnPåForeldre,
} from 'app/utils/personUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getForeldreparSituasjon } from 'app/utils/foreldreparSituasjonUtils';
import { Forelder } from 'app/types/Forelder';
import { isUttakAnnenPart, isUttakAvForeldrepengerFørFødsel, isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import Api from 'app/api/api';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import getStønadskontoParams, {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
    getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'app/api/getStønadskontoParams';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import useDebounce from 'app/utils/hooks/useDebounce';
import { getPerioderSomSkalSendesInn, storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SenEndringÅrsak } from 'uttaksplan/types/SenEndringÅrsak';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { getEndringstidspunkt, getMorsSisteDag, ISOStringToDate } from 'app/utils/dateUtils';
import { cleanupInvisibleCharsFromTilleggsopplysninger } from 'app/utils/tilleggsopplysningerUtils';
import VilDuGåTilbakeModal from './components/vil-du-gå-tilbake-modal/VilDuGåTilbakeModal';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { UttaksplanFormComponents } from 'app/steps/uttaksplan/UttaksplanFormConfig';

import { getPerioderMedUttakRundtFødsel } from 'app/utils/wlbUtils';
import uttaksplanQuestionsConfig, { UttaksplanQuestionPayload } from './uttaksplanQuestionConfig';
import { getUttaksplanFormInitialValues } from './UttaksplanFormUtils';

import {
    getVisAutomatiskJusteringForm,
    getKanJustereAutomatiskVedFødsel,
} from 'uttaksplan/components/automatisk-justering-form/automatiskJusteringUtils';
import { FormikValues } from 'formik';
import {
    getStartdatoFørstePeriodeAnnenPart,
    mapAnnenPartsEksisterendeSakFromDTO,
} from 'app/utils/eksisterendeSakUtils';
import { getHarAktivitetskravIPeriodeUtenUttak } from 'app/utils/uttaksplan/uttaksplanUtils';
import { RequestStatus } from 'app/types/RequestState';
import { Periodene } from '../uttaksplan-info/utils/Periodene';
import { finnOgSettInnHull, settInnAnnenPartsUttak } from 'uttaksplan/builder/uttaksplanbuilderUtils';
import { isUfødtBarn } from 'app/context/types/Barn';
import dayjs from 'dayjs';
import { getAntallUkerMinsterett } from '../uttaksplan-info/utils/stønadskontoer';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import { Alert, Button, Loader } from '@navikt/ds-react';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { Link } from 'react-router-dom';
import { getSamtidigUttaksprosent } from 'app/utils/uttaksplanInfoUtils';

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
    const { uttaksplanInfo, eksisterendeSak, harUttaksplanBlittSlettet, annenPartsUttakErLagtTilIPlan } = state;
    const { person, arbeidsforhold } = søkerinfo;
    const { annenForelder, søker, barn, søkersituasjon, dekningsgrad, erEndringssøknad, tilleggsopplysninger } = søknad;
    const { erAleneOmOmsorg } = søker;
    const { situasjon } = søkersituasjon;
    const { rolle } = søkersituasjon;
    const { barnFraNesteSak } = state;
    const debouncedState = useDebounce(state, 3000);
    const annenForelderKjønn = getKjønnFromFnr(annenForelder);
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;
    const erFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const søkerErAleneOmOmsorg = morErAleneOmOmsorg || farMedmorErAleneOmOmsorg;
    const forelderVedAleneomsorg = erDeltUttak ? undefined : erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, intl);
    const antallBarn = barn.antallBarn;
    const erFlerbarnssøknad = antallBarn > 1;
    const morHarRett = getMorHarRettPåForeldrepengerINorgeEllerEØS(rolle, erFarEllerMedmor, annenForelder);
    const opprinneligPlan = eksisterendeSak?.uttaksplan;
    const harKomplettUttaksplan = eksisterendeSak ? eksisterendeSak.uttaksplan !== undefined : false;
    const harMidlertidigOmsorg = false; //TODO søkerHarMidlertidigOmsorg
    const morsSisteDag = getMorsSisteDag(uttaksplanInfo);
    const termindato = getTermindato(barn);
    const annenForelderFnr =
        isAnnenForelderOppgitt(annenForelder) && !!annenForelder.utenlandskFnr === false
            ? annenForelder.fnr
            : undefined;
    const erAdopsjon = situasjon === 'adopsjon';
    const annenForelderFnrNesteSak = barnFraNesteSak !== undefined ? barnFraNesteSak.annenForelderFnr : undefined;
    const førsteBarnFraNesteSakFnr =
        barnFraNesteSak !== undefined && barnFraNesteSak.fnr !== undefined && barnFraNesteSak.fnr.length > 0
            ? barnFraNesteSak.fnr[0]
            : undefined;
    const familieHendelseDatoNesteSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.familiehendelsesdato : undefined;
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const bareFarMedmorHarRett = !getMorHarRettPåForeldrepengerINorgeEllerEØS(
        søkersituasjon.rolle,
        erFarEllerMedmor,
        annenForelder,
    );

    const barnFnr = !isUfødtBarn(barn) && barn.fnr !== undefined && barn.fnr.length > 0 ? barn.fnr[0] : undefined;
    const eksisterendeSakAnnenPartRequestIsSuspended =
        !søkerErAleneOmOmsorg &&
        annenForelderFnr !== undefined &&
        annenForelderFnr !== '' &&
        (barnFnr !== undefined || familiehendelsesdato !== undefined)
            ? false
            : true;

    useSaveLoadedRoute(SøknadRoutes.UTTAKSPLAN);

    const { eksisterendeSakAnnenPartData, eksisterendeSakAnnenPartError, eksisterendeSakAnnenPartRequestStatus } =
        Api.useGetAnnenPartsVedtak(
            annenForelderFnr,
            barnFnr,
            familiehendelsesdato,
            eksisterendeSakAnnenPartRequestIsSuspended,
        );

    const eksisterendeVedtakAnnenPart = useMemo(
        () =>
            mapAnnenPartsEksisterendeSakFromDTO(
                eksisterendeSakAnnenPartData,
                barn,
                erFarEllerMedmor,
                familiehendelsesdato,
                førsteUttaksdagNesteBarnsSak,
            ),
        [eksisterendeSakAnnenPartData, barn, erFarEllerMedmor, familiehendelsesdato, førsteUttaksdagNesteBarnsSak],
    );

    const saksgrunnlagsTermindato = getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter(
        eksisterendeSak?.grunnlag.termindato,
        eksisterendeVedtakAnnenPart?.grunnlag.termindato,
    );
    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.grunnlag.antallBarn,
    );
    useEffect(() => {
        if (erFarEllerMedmor && søknad.barn.antallBarn !== saksgrunnlagsAntallBarn) {
            const søknadMedOppdatertAntallBarn = {
                ...søknad,
                barn: { ...søknad.barn, antallBarn: saksgrunnlagsAntallBarn },
            };
            dispatch(actionCreator.setSøknad(søknadMedOppdatertAntallBarn));
        }
    }, [erFarEllerMedmor, saksgrunnlagsAntallBarn, dispatch, søknad]);

    const nesteBarnsSakAnnenPartRequestIsSuspended =
        annenForelderFnrNesteSak !== undefined &&
        annenForelderFnrNesteSak !== '' &&
        (førsteBarnFraNesteSakFnr !== undefined || familieHendelseDatoNesteSak !== undefined) &&
        (eksisterendeSakAnnenPartRequestIsSuspended || eksisterendeSakAnnenPartRequestStatus === RequestStatus.FINISHED)
            ? false
            : true;

    const {
        eksisterendeSakAnnenPartData: nesteSakAnnenPartData,
        eksisterendeSakAnnenPartError: nesteSakAnnenPartError,
        eksisterendeSakAnnenPartRequestStatus: nesteSakAnnenPartRequestStatus,
    } = Api.useGetAnnenPartsVedtak(
        annenForelderFnrNesteSak,
        førsteBarnFraNesteSakFnr,
        dateToISOString(familieHendelseDatoNesteSak),
        nesteBarnsSakAnnenPartRequestIsSuspended,
    );

    const førsteUttaksdagAnnenPart = getStartdatoFørstePeriodeAnnenPart(nesteSakAnnenPartData);

    useEffect(() => {
        if (
            førsteUttaksdagAnnenPart !== undefined &&
            state.barnFraNesteSak !== undefined &&
            (dayjs(førsteUttaksdagAnnenPart).isBefore(state.barnFraNesteSak.startdatoFørsteStønadsperiode, 'd') ||
                state.barnFraNesteSak.startdatoFørsteStønadsperiode === undefined)
        ) {
            const oppdatertBarnNesteSak = {
                ...state.barnFraNesteSak,
                startdatoFørsteStønadsperiode: førsteUttaksdagAnnenPart,
            };
            dispatch(actionCreator.setBarnFraNesteSak(oppdatertBarnNesteSak));
        }
    }, [førsteUttaksdagNesteBarnsSak, førsteUttaksdagAnnenPart, barnFraNesteSak, dispatch, state.barnFraNesteSak]);

    const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
        erDeltUttak,
        morHarRett,
        søkerErAleneOmOmsorg,
    });

    //Legg til annen parts perioder i planen til bruker
    useEffect(() => {
        if (
            eksisterendeSak !== undefined &&
            opprinneligPlan !== undefined &&
            eksisterendeVedtakAnnenPart !== undefined &&
            !annenPartsUttakErLagtTilIPlan
        ) {
            //Sett samtidigUttak på søkerens perioder hvis de overlapper med annen parts samtidig uttak:
            opprinneligPlan.forEach((p) => {
                if (isUttaksperiode(p)) {
                    const overlappendePerioderAnnenPart = Periodene(
                        eksisterendeVedtakAnnenPart.uttaksplan,
                    ).finnOverlappendePerioder(p);

                    if (
                        overlappendePerioderAnnenPart.length !== 0 &&
                        overlappendePerioderAnnenPart.find(
                            (periode) => isUttakAnnenPart(periode) && periode.ønskerSamtidigUttak === true,
                        )
                    ) {
                        if (!p.ønskerSamtidigUttak) {
                            p.ønskerSamtidigUttak = true;
                            p.samtidigUttakProsent = getSamtidigUttaksprosent(p.gradert, p.stillingsprosent);
                        }
                    }
                }
            });

            const uttaksplanMedAnnenPart = finnOgSettInnHull(
                settInnAnnenPartsUttak(
                    opprinneligPlan,
                    eksisterendeVedtakAnnenPart.uttaksplan,
                    familiehendelsesdatoDate!,
                    førsteUttaksdagNesteBarnsSak,
                    true,
                ),
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdatoDate!,
                erAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            );
            const eksisterendeSakMedAnnenPartsPlan = {
                ...eksisterendeSak,
                uttaksplan: uttaksplanMedAnnenPart,
            };
            dispatch(actionCreator.setUttaksplan(uttaksplanMedAnnenPart));
            dispatch(actionCreator.setEksisterendeSak(eksisterendeSakMedAnnenPartsPlan));
            dispatch(actionCreator.setAnnenPartsUttakErLagtTilIPlan(true));
        }
    }, [
        eksisterendeVedtakAnnenPart,
        opprinneligPlan,
        familiehendelsesdatoDate,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        dispatch,
        førsteUttaksdagNesteBarnsSak,
        eksisterendeSak,
        annenPartsUttakErLagtTilIPlan,
    ]);

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
    useEffect(() => {
        const periodeAngittAvAnnenPart = opprinneligPlan?.find((p) => isUttaksperiode(p) && p.angittAvAnnenPart);

        if (periodeAngittAvAnnenPart && endringstidspunkt === undefined) {
            const tidspunktForEndring = periodeAngittAvAnnenPart.tidsperiode.fom;
            dispatch(actionCreator.setEndringstidspunkt(tidspunktForEndring));

            const perioderForÅSendeInn = getPerioderSomSkalSendesInn(
                søknad.uttaksplan,
                erEndringssøknad,
                erFarEllerMedmor,
                opprinneligPlan,
                tidspunktForEndring,
            );
            setPerioderSomSkalSendesInn(perioderForÅSendeInn);
            dispatch(actionCreator.setPerioderSomSkalSendesInn(perioderForÅSendeInn));
        }
    }, [opprinneligPlan, dispatch, endringstidspunkt, erFarEllerMedmor, søknad.uttaksplan, erEndringssøknad]);

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        nextRoute,
        (state: ForeldrepengesøknadContextState) => storeAppState(state),
    );

    const perioderMedUttakRundtFødsel = getPerioderMedUttakRundtFødsel(
        søknad.uttaksplan,
        familiehendelsesdatoDate!,
        termindato,
    );

    const visAutomatiskJusteringForm = getVisAutomatiskJusteringForm(
        erFarEllerMedmor,
        familiehendelsesdatoDate!,
        situasjon,
        perioderMedUttakRundtFødsel,
        barn,
        termindato,
        bareFarMedmorHarRett,
    );

    const kanJustereAutomatiskVedFødsel = getKanJustereAutomatiskVedFødsel(
        perioderMedUttakRundtFødsel,
        termindato,
        erFarEllerMedmor,
        barn,
    );

    const setØnskerJustertUttakVedFødselTilUndefinedHvisUgyldig = () => {
        if ((visAutomatiskJusteringForm || erEndringssøknad) && !kanJustereAutomatiskVedFødsel) {
            dispatch(actionCreator.setØnskerJustertUttakVedFødsel(undefined));
        }
    };

    const ønskerJustertUttakVedFødselErBesvart = (ønskerAutomatiskJusteringSvar: boolean | undefined) => {
        return (
            visAutomatiskJusteringForm && kanJustereAutomatiskVedFødsel && ønskerAutomatiskJusteringSvar !== undefined
        );
    };

    const ref = useRef<FormikValues>(null);
    const clickHandler = (values: any) => {
        setSubmitIsClicked(true);
        if (uttaksplanErGyldig && !erTomEndringssøknad) {
            if (ref.current) {
                ref.current.handleSubmit();
            }

            setØnskerJustertUttakVedFødselTilUndefinedHvisUgyldig();

            if (ønskerJustertUttakVedFødselErBesvart(values.ønskerAutomatiskJustering)) {
                handleSubmit(values);
            }
        }
    };

    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    useEffect(() => {
        Api.storeAppState(debouncedState, person.fnr);
    }, [person.fnr, debouncedState]);

    const foreldreSituasjon = getForeldreparSituasjon(
        person.kjønn,
        annenForelderKjønn,
        erDeltUttak,
        morErAleneOmOmsorg,
        farMedmorErAleneOmOmsorg,
        rolle,
    );
    const kontoRequestIsSuspended =
        (eksisterendeSakAnnenPartRequestIsSuspended
            ? false
            : eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED) ||
        (nesteBarnsSakAnnenPartRequestIsSuspended ? false : nesteSakAnnenPartRequestStatus !== RequestStatus.FINISHED);

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
                saksgrunnlagsAntallBarn,
                saksgrunnlagsTermindato,
            ),
            kontoRequestIsSuspended,
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
            saksgrunnlagsAntallBarn,
            saksgrunnlagsTermindato,
        ),
        kontoRequestIsSuspended,
    );

    const handleOnPlanChange = (nyPlan: Periode[]) => {
        setSubmitIsClicked(false);
        dispatch(actionCreator.setUttaksplan(nyPlan));
        const tidspunktForEndring = getEndringstidspunkt(opprinneligPlan, nyPlan, erEndringssøknad);
        setEndringstidspunkt(tidspunktForEndring);

        const perioderForÅSendeInn = getPerioderSomSkalSendesInn(
            nyPlan,
            erEndringssøknad,
            erFarEllerMedmor,
            opprinneligPlan,
            tidspunktForEndring,
        );
        setPerioderSomSkalSendesInn(perioderForÅSendeInn);
        dispatch(actionCreator.setPerioderSomSkalSendesInn(perioderForÅSendeInn));
    };

    useEffect(() => {
        if (tilgjengeligeStønadskontoerError) {
            sendErrorMessageToSentry(tilgjengeligeStønadskontoerError);
            throw new Error(
                `Vi klarte ikke å hente opp stønadskontoer. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
        if (eksisterendeSakAnnenPartError) {
            sendErrorMessageToSentry(eksisterendeSakAnnenPartError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om saken til annen forelder. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }

        if (nesteSakAnnenPartError) {
            sendErrorMessageToSentry(nesteSakAnnenPartError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om saken til annen forelder for neste barn. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
    }, [tilgjengeligeStønadskontoerError, eksisterendeSakAnnenPartError, nesteSakAnnenPartError]);

    if (
        !stønadskontoer100 ||
        !stønadskontoer80 ||
        (eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED &&
            !eksisterendeSakAnnenPartRequestIsSuspended) ||
        (nesteSakAnnenPartRequestStatus !== RequestStatus.FINISHED && !nesteBarnsSakAnnenPartRequestIsSuspended)
    ) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader size="2xlarge" />
            </div>
        );
    }

    const stønadskontoer = getValgtStønadskontoFor80Og100Prosent(stønadskontoer80, stønadskontoer100);
    const minsterettUkerToTette = getAntallUkerMinsterett(stønadskontoer100.minsteretter.toTette);

    const valgteStønadskontoer =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskontoer[100] : stønadskontoer[80];

    const erTomEndringssøknad =
        erEndringssøknad && (perioderSomSkalSendesInn === undefined || perioderSomSkalSendesInn.length === 0);

    const handleSlettUttaksplan = () => {
        const slettetPlanUtenomFpFørFødsel = søknad.uttaksplan.filter((periode) =>
            isUttakAvForeldrepengerFørFødsel(periode),
        );
        dispatch(actionCreator.slettUttaksplan(slettetPlanUtenomFpFørFødsel));
        dispatch(actionCreator.setUttaksplanSlettet(true));
    };

    const handleResetUttaksplan = () => {
        if (state.eksisterendeSak) {
            dispatch(actionCreator.setUttaksplan(state.eksisterendeSak.uttaksplan));
            dispatch(actionCreator.setPerioderSomSkalSendesInn([]));
            setPerioderSomSkalSendesInn([]);
        }
    };

    return (
        <UttaksplanFormComponents.FormikWrapper
            initialValues={getUttaksplanFormInitialValues(state.søknad.ønskerJustertUttakVedFødsel)}
            onSubmit={handleSubmit}
            innerRef={ref}
            renderForm={({ values: formValues }) => {
                const visibility = uttaksplanQuestionsConfig.getVisbility({
                    ...formValues,
                    termindato,
                    perioderMedUttakRundtFødsel,
                } as UttaksplanQuestionPayload);

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="uttaksplan"
                        pageTitle={intlUtils(intl, 'søknad.uttaksplan')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, erEndringssøknad)}
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
                            arbeidsforhold={getAktiveArbeidsforhold(
                                arbeidsforhold,
                                erAdopsjon,
                                erFarEllerMedmor,
                                ISOStringToDate(familiehendelsesdato),
                            )}
                            erEndringssøknad={erEndringssøknad}
                            erFarEllerMedmor={erFarEllerMedmor}
                            erFlerbarnssøknad={erFlerbarnssøknad}
                            erAleneOmOmsorg={søkerErAleneOmOmsorg}
                            harMidlertidigOmsorg={harMidlertidigOmsorg}
                            situasjon={situasjon}
                            erMorUfør={erMorUfør}
                            morHarRett={morHarRett}
                            søkersituasjon={søkersituasjon}
                            dekningsgrad={dekningsgrad}
                            antallBarn={antallBarn}
                            tilleggsopplysninger={tilleggsopplysninger}
                            setUttaksplanErGyldig={setUttaksplanErGyldig}
                            handleBegrunnelseChange={handleBegrunnelseChange}
                            eksisterendeSak={eksisterendeSak}
                            perioderSomSkalSendesInn={perioderSomSkalSendesInn}
                            morsSisteDag={morsSisteDag}
                            harKomplettUttaksplan={harKomplettUttaksplan}
                            opprinneligPlan={harUttaksplanBlittSlettet ? undefined : opprinneligPlan}
                            handleSlettUttaksplan={handleSlettUttaksplan}
                            handleResetUttaksplan={handleResetUttaksplan}
                            termindato={termindato}
                            barn={barn}
                            visibility={visibility}
                            visAutomatiskJusteringForm={visAutomatiskJusteringForm}
                            perioderMedUttakRundtFødsel={perioderMedUttakRundtFødsel}
                            barnFraNesteSak={barnFraNesteSak}
                            familiehendelsesdatoNesteSak={familieHendelseDatoNesteSak}
                            førsteUttaksdagNesteBarnsSak={førsteUttaksdagNesteBarnsSak}
                            minsterettUkerToTette={minsterettUkerToTette}
                        />
                        <VilDuGåTilbakeModal isOpen={gåTilbakeIsOpen} setIsOpen={setGåTilbakeIsOpen} />
                        {!uttaksplanErGyldig && submitIsClicked && (
                            <Block textAlignCenter={true} padBottom="l">
                                <Alert variant="error">
                                    <FormattedMessage id="uttaksplan.validering.kanIkkeGåVidere" />
                                </Alert>
                            </Block>
                        )}
                        {erTomEndringssøknad && submitIsClicked && (
                            <Block textAlignCenter={true} padBottom="l">
                                <Alert variant="error">
                                    <FormattedMessage id="uttaksplan.validering.kanIkkeGåVidereEndringssøknad" />
                                </Alert>
                            </Block>
                        )}
                        <Block textAlignCenter={true} padBottom="l">
                            <StepButtonWrapper>
                                {!erEndringssøknad && (
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setGåTilbakeIsOpen(true);
                                        }}
                                        to={getPreviousStepHref('uttaksplan')}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    onClick={clickHandler}
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                >
                                    {intlUtils(intl, 'søknad.gåVidere')}
                                </Button>
                            </StepButtonWrapper>
                        </Block>
                    </Step>
                );
            }}
        />
    );
};
export default UttaksplanStep;
