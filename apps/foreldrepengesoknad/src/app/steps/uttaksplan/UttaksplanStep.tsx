import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { Uttaksplan, getHarAktivitetskravIPeriodeUtenUttak, kreverUttaksplanVedlegg } from '@navikt/uttaksplan';
import { finnOgSettInnHull, settInnAnnenPartsUttak } from '@navikt/uttaksplan/src/builder/uttaksplanbuilderUtils';
import dayjs from 'dayjs';
import { FormikValues } from 'formik';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Button, Loader } from '@navikt/ds-react';

import {
    Block,
    Dekningsgrad,
    Forelder,
    ISOStringToDate,
    Periode,
    Periodene,
    Step,
    StepButtonWrapper,
    getAktiveArbeidsforhold,
    getErMorUfør,
    getFarMedmorErAleneOmOmsorg,
    getForeldreparSituasjon,
    getKjønnFromFnr,
    getMorErAleneOmOmsorg,
    getMorHarRettPåForeldrepengerINorgeEllerEØS,
    getNavnPåForeldre,
    getPerioderMedUttakRundtFødsel,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isUfødtBarn,
    isUttakAnnenPart,
    isUttakAvForeldrepengerFørFødsel,
    isUttaksperiode,
} from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';
import { Søkerinfo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import { useApiGetData, useApiPostData } from 'app/api/context/useFpApiData';
import getStønadskontoParams, {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'app/api/getStønadskontoParams';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import { ContextDataType, useContextComplete, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { UttaksplanFormComponents, UttaksplanFormField } from 'app/steps/uttaksplan/UttaksplanFormConfig';
import { RequestStatus } from 'app/types/RequestState';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { getEndringstidspunkt, getMorsSisteDag } from 'app/utils/dateUtils';
import {
    getStartdatoFørstePeriodeAnnenPart,
    mapAnnenPartsEksisterendeSakFromDTO,
} from 'app/utils/eksisterendeSakUtils';
import useDebounce from 'app/utils/hooks/useDebounce';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { getPerioderSomSkalSendesInn } from 'app/utils/submitUtils';

import { getSamtidigUttaksprosent } from '../../utils/uttaksplanInfoUtils';
import { getUttaksplanNextStep } from '../stepsConfig';
import { getAntallUker, getAntallUkerMinsterett } from '../uttaksplan-info/utils/stønadskontoer';
import { getUttaksplanFormInitialValues } from './UttaksplanFormUtils';
import AutomatiskJusteringForm from './automatisk-justering-form/AutomatiskJusteringForm';
import {
    getKanPerioderRundtFødselAutomatiskJusteres,
    getKanSøkersituasjonAutomatiskJustereRundtFødsel,
} from './automatisk-justering-form/automatiskJusteringUtils';
import VilDuGåTilbakeModal from './components/vil-du-gå-tilbake-modal/VilDuGåTilbakeModal';
import uttaksplanQuestionsConfig from './uttaksplanQuestionConfig';

const EMPTY_PERIOD_ARRAY: Periode[] = [];

type Props = {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const UttaksplanStep: React.FunctionComponent<Props> = ({
    søkerInfo,
    erEndringssøknad,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(erEndringssøknad);
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger, erEndringssøknad);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitIsClicked, setSubmitIsClicked] = useState(false);

    const [gåTilbakeIsOpen, setGåTilbakeIsOpen] = useState(false);
    const [uttaksplanErGyldig, setUttaksplanErGyldig] = useState(true);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const uttaksplanMetadata = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA));
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplanInfo = useContextGetData(ContextDataType.UTTAKSPLAN_INFO);
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN) || EMPTY_PERIOD_ARRAY;
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);

    const oppdaterBarn = useContextSaveData(ContextDataType.OM_BARNET);
    const oppdaterBarnFraNesteSak = useContextSaveData(ContextDataType.BARN_FRA_NESTE_SAK);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);
    const oppdaterEksisterendeSak = useContextSaveData(ContextDataType.EKSISTERENDE_SAK);
    const oppdaterUttaksplanMetadata = useContextSaveData(ContextDataType.UTTAKSPLAN_METADATA);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterManglerDokumentasjon = useContextSaveData(ContextDataType.MANGLER_DOKUMENTASJON);
    const oppdaterVedlegg = useContextSaveData(ContextDataType.VEDLEGG);

    const [endringstidspunkt, setEndringstidspunkt] = useState(uttaksplanMetadata.endringstidspunkt);
    const [perioderSomSkalSendesInn, setPerioderSomSkalSendesInn] = useState(
        uttaksplanMetadata.perioderSomSkalSendesInn || [],
    );

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erAleneOmOmsorg = oppgittAnnenForelder?.erAleneOmOmsorg || false;
    const { situasjon } = søkersituasjon;
    const { rolle } = søkersituasjon;
    const annenForelderKjønn = getKjønnFromFnr(annenForelder);
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const søkerErAleneOmOmsorg = morErAleneOmOmsorg || farMedmorErAleneOmOmsorg;
    const forelderVedAleneomsorg = erDeltUttak ? undefined : erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato)!;
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const navnPåForeldre = getNavnPåForeldre(søkerInfo.søker, annenForelder, erFarEllerMedmor, intl);
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

    const debouncedState = useDebounce(useContextComplete(), 3000);
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current === false) {
            mellomlagreSøknadOgNaviger();
        }
        initialRender.current = false;
    }, [debouncedState, mellomlagreSøknadOgNaviger]);

    const {
        data: eksisterendeSakAnnenPartData,
        requestStatus: eksisterendeSakAnnenPartRequestStatus,
        error: eksisterendeSakAnnenPartError,
    } = useApiPostData(
        FpApiDataType.ANNEN_PART_VEDTAK,
        {
            annenPartFødselsnummer: annenForelderFnr,
            barnFødselsnummer: barnFnr,
            familiehendelse: familiehendelsesdato,
        },
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

    const goToPreviousStep = () => {
        setGåTilbakeIsOpen(false);

        const nullstiltePeriodeVedlegg: VedleggDataType = {
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: [],
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: [],
            [Skjemanummer.DOK_SYKDOM_MOR]: [],
            [Skjemanummer.DOK_SYKDOM_FAR]: [],
            [Skjemanummer.DOK_INNLEGGELSE_BARN]: [],
            [Skjemanummer.DOK_INNLEGGELSE_MOR]: [],
            [Skjemanummer.DOK_INNLEGGELSE_FAR]: [],
            [Skjemanummer.DOK_ARBEID_MOR]: [],
            [Skjemanummer.DOK_UTDANNING_MOR]: [],
            [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [],
        };

        oppdaterUttaksplanMetadata({
            ...uttaksplanMetadata,
            perioderSomSkalSendesInn: [],
            endringstidspunkt: undefined,
            ønskerJustertUttakVedFødsel: undefined,
        });
        oppdaterUttaksplan([]);
        oppdaterVedlegg({ ...vedlegg, ...nullstiltePeriodeVedlegg });
        oppdaterManglerDokumentasjon(false);
        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN_INFO);
        mellomlagreSøknadOgNaviger();
        navigator.goToPreviousDefaultStep();
    };

    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.grunnlag.antallBarn,
    );
    useEffect(() => {
        if (erFarEllerMedmor && barn.antallBarn !== saksgrunnlagsAntallBarn) {
            oppdaterBarn({ ...barn, antallBarn: saksgrunnlagsAntallBarn });
        }
    }, [erFarEllerMedmor, saksgrunnlagsAntallBarn, barn, oppdaterBarn]);

    const nesteBarnsSakAnnenPartRequestIsSuspended =
        annenForelderFnrNesteSak !== undefined &&
        annenForelderFnrNesteSak !== '' &&
        (førsteBarnFraNesteSakFnr !== undefined || familieHendelseDatoNesteSak !== undefined) &&
        (eksisterendeSakAnnenPartRequestIsSuspended || eksisterendeSakAnnenPartRequestStatus === RequestStatus.FINISHED)
            ? false
            : true;

    const {
        data: nesteSakAnnenPartData,
        requestStatus: nesteSakAnnenPartRequestStatus,
        error: nesteSakAnnenPartError,
    } = useApiPostData(
        FpApiDataType.NESTE_SAK_ANNEN_PART_VEDTAK,
        {
            annenPartFødselsnummer: annenForelderFnrNesteSak,
            barnFødselsnummer: førsteBarnFraNesteSakFnr,
            familiehendelse: dateToISOString(familieHendelseDatoNesteSak),
        },
        nesteBarnsSakAnnenPartRequestIsSuspended,
    );

    const førsteUttaksdagAnnenPart = getStartdatoFørstePeriodeAnnenPart(nesteSakAnnenPartData);

    useEffect(() => {
        if (
            førsteUttaksdagAnnenPart !== undefined &&
            barnFraNesteSak !== undefined &&
            (dayjs(førsteUttaksdagAnnenPart).isBefore(barnFraNesteSak.startdatoFørsteStønadsperiode, 'd') ||
                barnFraNesteSak.startdatoFørsteStønadsperiode === undefined)
        ) {
            const oppdatertBarnNesteSak = {
                ...barnFraNesteSak,
                startdatoFørsteStønadsperiode: førsteUttaksdagAnnenPart,
            };
            oppdaterBarnFraNesteSak(oppdatertBarnNesteSak);
        }
    }, [førsteUttaksdagNesteBarnsSak, førsteUttaksdagAnnenPart, barnFraNesteSak, oppdaterBarnFraNesteSak]);

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
            !uttaksplanMetadata.annenPartsUttakErLagtTilIPlan
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
            oppdaterUttaksplan(uttaksplanMedAnnenPart);
            oppdaterEksisterendeSak(eksisterendeSakMedAnnenPartsPlan);

            oppdaterUttaksplanMetadata({
                ...uttaksplanMetadata,
                annenPartsUttakErLagtTilIPlan: true,
            });
        }
    }, [
        eksisterendeVedtakAnnenPart,
        opprinneligPlan,
        familiehendelsesdatoDate,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
        eksisterendeSak,
        uttaksplanMetadata,
        oppdaterUttaksplan,
        oppdaterEksisterendeSak,
        oppdaterUttaksplanMetadata,
    ]);

    useEffect(() => {
        const periodeAngittAvAnnenPart = opprinneligPlan?.find((p) => isUttaksperiode(p) && p.angittAvAnnenPart);

        if (periodeAngittAvAnnenPart && endringstidspunkt === undefined) {
            const tidspunktForEndring = periodeAngittAvAnnenPart.tidsperiode.fom;

            const perioderForÅSendeInn = getPerioderSomSkalSendesInn(
                uttaksplan,
                erEndringssøknad,
                erFarEllerMedmor,
                opprinneligPlan,
                tidspunktForEndring,
            );
            setPerioderSomSkalSendesInn(perioderForÅSendeInn);

            oppdaterUttaksplanMetadata({
                ...uttaksplanMetadata,
                perioderSomSkalSendesInn: perioderForÅSendeInn,
                endringstidspunkt,
            });
        }
    }, [
        opprinneligPlan,
        endringstidspunkt,
        erFarEllerMedmor,
        uttaksplan,
        erEndringssøknad,
        oppdaterUttaksplanMetadata,
        uttaksplanMetadata,
    ]);

    const onSubmit = async () => {
        const planKreverVedlegg = kreverUttaksplanVedlegg(
            uttaksplan,
            erFarEllerMedmor,
            annenForelder,
            erEndringssøknad,
            uttaksplanMetadata?.perioderSomSkalSendesInn,
        );
        const nextRoute = getUttaksplanNextStep(erEndringssøknad, planKreverVedlegg);

        setIsSubmitting(true);
        setSubmitIsClicked(true);
        oppdaterManglerDokumentasjon(planKreverVedlegg);

        oppdaterUttaksplanMetadata({
            ...uttaksplanMetadata,
            endringstidspunkt,
            perioderSomSkalSendesInn,
            antallUkerIUttaksplan,
        });

        navigator.goToNextStep(nextRoute);
    };

    const perioderMedUttakRundtFødsel = getPerioderMedUttakRundtFødsel(
        uttaksplan,
        familiehendelsesdatoDate!,
        termindato ? dayjs(termindato).toDate() : undefined,
    );

    const visAutomatiskJusteringForm = getKanSøkersituasjonAutomatiskJustereRundtFødsel(
        erFarEllerMedmor,
        familiehendelsesdatoDate!,
        situasjon,
        perioderMedUttakRundtFødsel,
        barn,
        termindato,
        bareFarMedmorHarRett,
    );

    const periodeRundtFødselKanAutomatiskJusteres = getKanPerioderRundtFødselAutomatiskJusteres(
        visAutomatiskJusteringForm,
        perioderMedUttakRundtFødsel,
        termindato,
    );

    const setØnskerJustertUttakVedFødselTilUndefinedHvisUgyldig = () => {
        if (!periodeRundtFødselKanAutomatiskJusteres) {
            oppdaterUttaksplanMetadata({
                ...uttaksplanMetadata,
                ønskerJustertUttakVedFødsel: undefined,
            });
        }
    };

    const ønskerJustertUttakVedFødselErBesvart = (ønskerAutomatiskJusteringSvar: boolean | undefined) => {
        return periodeRundtFødselKanAutomatiskJusteres && ønskerAutomatiskJusteringSvar !== undefined;
    };

    const ref = useRef<FormikValues>(null);
    const clickHandler = async (values: any) => {
        setSubmitIsClicked(true);
        if (uttaksplanErGyldig && !erTomEndringssøknad) {
            setIsSubmitting(true);
            if (ref.current) {
                ref.current.handleSubmit();
            }

            setØnskerJustertUttakVedFødselTilUndefinedHvisUgyldig();

            if (ønskerJustertUttakVedFødselErBesvart(values.ønskerAutomatiskJustering)) {
                await onSubmit();
            }
        }
    };

    const foreldreSituasjon = getForeldreparSituasjon(
        søkerInfo.søker.kjønn,
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

    const { stønadskontoParams100, stønadskontoParams80 } = getStønadskontoParams(
        barn,
        annenForelder,
        søkersituasjon,
        barnFraNesteSak,
        eksisterendeSakAnnenPartData,
        eksisterendeSak,
    );

    const { data: stønadskontoer80 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_80,
        stønadskontoParams80,
        kontoRequestIsSuspended,
    );
    const { data: stønadskontoer100, error: tilgjengeligeStønadskontoerError } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_100,
        stønadskontoParams100,
        kontoRequestIsSuspended,
    );

    const handleOnPlanChange = (nyPlan: Periode[]) => {
        setSubmitIsClicked(false);
        setIsSubmitting(false);

        oppdaterUttaksplan(nyPlan);

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

        oppdaterUttaksplanMetadata({
            ...uttaksplanMetadata,
            perioderSomSkalSendesInn: perioderForÅSendeInn,
        });
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
        periodeMedForeldrepenger.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? stønadskontoer[100]
            : stønadskontoer[80];

    const erTomEndringssøknad =
        erEndringssøknad && (perioderSomSkalSendesInn === undefined || perioderSomSkalSendesInn.length === 0);

    const handleSlettUttaksplan = () => {
        const slettetPlanUtenomFpFørFødsel = uttaksplan.filter((periode) => isUttakAvForeldrepengerFørFødsel(periode));
        oppdaterUttaksplan(slettetPlanUtenomFpFørFødsel);
        oppdaterUttaksplanMetadata({
            ...uttaksplanMetadata,
            harUttaksplanBlittSlettet: true,
        });
    };

    const handleResetUttaksplan = () => {
        if (eksisterendeSak) {
            oppdaterUttaksplan(eksisterendeSak.uttaksplan);

            oppdaterUttaksplanMetadata({
                ...uttaksplanMetadata,
                perioderSomSkalSendesInn: [],
            });
            setPerioderSomSkalSendesInn([]);
        }
    };
    const antallUkerIUttaksplan = getAntallUker(valgteStønadskontoer);

    return (
        <UttaksplanFormComponents.FormikWrapper
            initialValues={getUttaksplanFormInitialValues(
                uttaksplanMetadata.ønskerJustertUttakVedFødsel,
                periodeRundtFødselKanAutomatiskJusteres,
            )}
            onSubmit={onSubmit}
            innerRef={ref}
            renderForm={({ values }) => {
                const visibility = uttaksplanQuestionsConfig.getVisbility({
                    ønskerAutomatiskJustering: values[UttaksplanFormField.ønskerAutomatiskJustering] ?? YesOrNo.NO,
                    periodeRundtFødselKanAutomatiskJusteres,
                });

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        onCancel={avbrytSøknad}
                        onContinueLater={navigator.fortsettSøknadSenere}
                        steps={stepConfig}
                    >
                        <Block padBottom="l">
                            <InfoOmSøknaden
                                eksisterendeSak={eksisterendeSak}
                                erIUttaksplanenSteg={true}
                                tilgjengeligeStønadskontoer={valgteStønadskontoer}
                                minsterettUkerToTette={minsterettUkerToTette}
                                søker={søkerInfo.søker}
                            />
                        </Block>
                        <Uttaksplan
                            foreldreSituasjon={foreldreSituasjon}
                            forelderVedAleneomsorg={forelderVedAleneomsorg}
                            erDeltUttak={erDeltUttak}
                            uttaksplan={uttaksplan}
                            familiehendelsesdato={familiehendelsesdato}
                            handleOnPlanChange={handleOnPlanChange}
                            stønadskontoer={valgteStønadskontoer}
                            navnPåForeldre={navnPåForeldre}
                            annenForelder={annenForelder}
                            arbeidsforhold={getAktiveArbeidsforhold(
                                søkerInfo.arbeidsforhold,
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
                            dekningsgrad={periodeMedForeldrepenger.dekningsgrad}
                            antallBarn={antallBarn}
                            setUttaksplanErGyldig={setUttaksplanErGyldig}
                            eksisterendeSak={eksisterendeSak}
                            perioderSomSkalSendesInn={perioderSomSkalSendesInn}
                            morsSisteDag={morsSisteDag}
                            harKomplettUttaksplan={harKomplettUttaksplan}
                            opprinneligPlan={uttaksplanMetadata.harUttaksplanBlittSlettet ? undefined : opprinneligPlan}
                            handleSlettUttaksplan={handleSlettUttaksplan}
                            handleResetUttaksplan={handleResetUttaksplan}
                            termindato={termindato ? dayjs(termindato).toDate() : undefined}
                            barn={barn}
                            visAutomatiskJusteringForm={visAutomatiskJusteringForm}
                            perioderMedUttakRundtFødsel={perioderMedUttakRundtFødsel}
                            barnFraNesteSak={barnFraNesteSak}
                            familiehendelsesdatoNesteSak={familieHendelseDatoNesteSak}
                            førsteUttaksdagNesteBarnsSak={førsteUttaksdagNesteBarnsSak}
                            minsterettUkerToTette={minsterettUkerToTette}
                        />
                        {visAutomatiskJusteringForm && (
                            <Block padBottom="l">
                                <AutomatiskJusteringForm
                                    termindato={termindato ? dayjs(termindato).toDate() : undefined!}
                                    perioderMedUttakRundtFødsel={perioderMedUttakRundtFødsel}
                                    antallBarn={barn.antallBarn}
                                    visibility={visibility}
                                />
                            </Block>
                        )}
                        <VilDuGåTilbakeModal
                            isOpen={gåTilbakeIsOpen}
                            setIsOpen={setGåTilbakeIsOpen}
                            goToPreviousStep={goToPreviousStep}
                        />
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
                            <StepButtonWrapper singleButton={true}>
                                {!erEndringssøknad && (
                                    <Button
                                        variant="secondary"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setGåTilbakeIsOpen(true);
                                        }}
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
