import * as Sentry from '@sentry/browser';
import { useQuery } from '@tanstack/react-query';
import getStønadskontoParams, { getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter } from 'api/getStønadskontoParams';
import { ContextDataType, useContextComplete, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import {
    annenPartVedtakOptions,
    nesteSakAnnenPartVedtakOptions,
    tilgjengeligeStønadskontoerOptions,
} from 'appData/api';
import SøknadRoutes from 'appData/routes';
import useFpNavigator from 'appData/useFpNavigator';
import useStepConfig from 'appData/useStepConfig';
import dayjs from 'dayjs';
import { FormikValues } from 'formik';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { UttaksplanFormComponents, UttaksplanFormField } from 'steps/uttaksplan/UttaksplanFormConfig';
import InfoOmNesteBarn from 'steps/uttaksplan/components/info-om-neste-barn/InfoOmNesteBarn';
import { VedleggDataType } from 'types/VedleggDataType';
import { getErMorUfør } from 'utils/annenForelderUtils';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { getFamiliehendelsedato, getTermindato } from 'utils/barnUtils';
import { ISOStringToDate, dateToISOString, getEndringstidspunkt } from 'utils/dateUtils';
import { getStartdatoFørstePeriodeAnnenPart, mapAnnenPartsEksisterendeSakFromDTO } from 'utils/eksisterendeSakUtils';
import useDebounce from 'utils/hooks/useDebounce';
import isFarEllerMedmor from 'utils/isFarEllerMedmor';
import {
    getFarMedmorErAleneOmOmsorg,
    getKjønnFromFnr,
    getMorErAleneOmOmsorg,
    getMorHarRettPåForeldrepengerINorgeEllerEØS,
    getNavnPåForeldre,
} from 'utils/personUtils';
import { getAntallUker, getAntallUkerMinsterett } from 'utils/stønadskontoerUtils';
import { getPerioderSomSkalSendesInn } from 'utils/submitUtils';

import { Alert, Button, Loader, VStack } from '@navikt/ds-react';

import {
    Dekningsgrad,
    Forelder,
    Periode,
    isAnnenForelderOppgitt,
    isUfødtBarn,
    isUttakAnnenPart,
    isUttakAvForeldrepengerFørFødsel,
    isUttaksperiode,
} from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';
import { Søkerinfo } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import {
    Periodene,
    Uttaksplan,
    YesOrNo,
    finnOgSettInnHull,
    getForeldreparSituasjon,
    getHarAktivitetskravIPeriodeUtenUttak,
    getPerioderMedUttakRundtFødsel,
    settInnAnnenPartsUttak,
} from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import { getSamtidigUttaksprosent } from '../../utils/uttaksplanInfoUtils';
import { getUttaksplanFormInitialValues } from './UttaksplanFormUtils';
import AutomatiskJusteringForm from './automatisk-justering-form/AutomatiskJusteringForm';
import {
    getKanPerioderRundtFødselAutomatiskJusteres,
    getKanSøkersituasjonAutomatiskJustereRundtFødsel,
} from './automatisk-justering-form/automatiskJusteringUtils';
import StepButtonWrapper from './components/StepButtonWrapper';
import VilDuGåTilbakeModal from './components/vil-du-gå-tilbake-modal/VilDuGåTilbakeModal';
import { lagUttaksplanForslag } from './lagUttaksplanForslag';
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

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad);
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitIsClicked, setSubmitIsClicked] = useState(false);
    const [harPlanBlittEndret, setHarPlanBlittEndret] = useState(false);

    const [gåTilbakeIsOpen, setGåTilbakeIsOpen] = useState(false);
    const [uttaksplanErGyldig, setUttaksplanErGyldig] = useState(true);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN) || EMPTY_PERIOD_ARRAY;
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const [harPlanForslagIFørstegangssøknad, setHarPlanForslagIFørstegangssøknad] = useState(
        erEndringssøknad || uttaksplan.length > 0,
    );
    const oppdaterBarn = useContextSaveData(ContextDataType.OM_BARNET);
    const oppdaterBarnFraNesteSak = useContextSaveData(ContextDataType.BARN_FRA_NESTE_SAK);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);
    const oppdaterEksisterendeSak = useContextSaveData(ContextDataType.EKSISTERENDE_SAK);
    const oppdaterUttaksplanMetadata = useContextSaveData(ContextDataType.UTTAKSPLAN_METADATA);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterVedlegg = useContextSaveData(ContextDataType.VEDLEGG);

    const [endringstidspunkt, setEndringstidspunkt] = useState(uttaksplanMetadata?.endringstidspunkt);
    const [perioderSomSkalSendesInn, setPerioderSomSkalSendesInn] = useState(
        uttaksplanMetadata?.perioderSomSkalSendesInn || [],
    );

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;
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
    const harMidlertidigOmsorg = false; //TODO søkerHarMidlertidigOmsorg - denne brukes vel ikke lenger og kan fjernes?
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

    const bareFarMedmorHarRett =
        !getMorHarRettPåForeldrepengerINorgeEllerEØS(søkersituasjon.rolle, erFarEllerMedmor, annenForelder) &&
        !søkerErAleneOmOmsorg;

    const barnFnr = !isUfødtBarn(barn) && barn.fnr !== undefined && barn.fnr.length > 0 ? barn.fnr[0] : undefined;

    const eksisterendeSakAnnenPartRequestIsSuspended =
        søkerErAleneOmOmsorg || !annenForelderFnr || (barnFnr === undefined && familiehendelsesdato === undefined);

    const startStønadsperiodeNyttBarn =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const debouncedState = useDebounce(useContextComplete(), 3000);
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current === false) {
            mellomlagreSøknadOgNaviger();
        }
        initialRender.current = false;
    }, [debouncedState, mellomlagreSøknadOgNaviger]);

    const annenPartVedtakQuery = useQuery(
        annenPartVedtakOptions(
            {
                annenPartFødselsnummer: annenForelderFnr,
                barnFødselsnummer: barnFnr,
                familiehendelse: familiehendelsesdato,
            },
            !eksisterendeSakAnnenPartRequestIsSuspended,
        ),
    );

    const eksisterendeVedtakAnnenPart = useMemo(
        () =>
            mapAnnenPartsEksisterendeSakFromDTO(
                annenPartVedtakQuery.data,
                barn,
                erFarEllerMedmor,
                familiehendelsesdato,
                førsteUttaksdagNesteBarnsSak,
            ),
        [annenPartVedtakQuery.data, barn, erFarEllerMedmor, familiehendelsesdato, førsteUttaksdagNesteBarnsSak],
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
        oppdaterAppRoute(SøknadRoutes.FORDELING);
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
        !annenForelderFnrNesteSak ||
        (førsteBarnFraNesteSakFnr === undefined && familieHendelseDatoNesteSak === undefined) ||
        (!eksisterendeSakAnnenPartRequestIsSuspended && annenPartVedtakQuery.isPending);

    const nesteSakAnnenPartVedtakQuery = useQuery(
        nesteSakAnnenPartVedtakOptions(
            {
                annenPartFødselsnummer: annenForelderFnrNesteSak,
                barnFødselsnummer: førsteBarnFraNesteSakFnr,
                familiehendelse: dateToISOString(familieHendelseDatoNesteSak),
            },
            !nesteBarnsSakAnnenPartRequestIsSuspended,
        ),
    );

    const førsteUttaksdagAnnenPart = getStartdatoFørstePeriodeAnnenPart(nesteSakAnnenPartVedtakQuery.data);

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
            !uttaksplanMetadata?.annenPartsUttakErLagtTilIPlan
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
        setIsSubmitting(true);
        setSubmitIsClicked(true);

        oppdaterUttaksplanMetadata({
            ...uttaksplanMetadata,
            endringstidspunkt,
            perioderSomSkalSendesInn,
            antallUkerIUttaksplan,
        });

        return navigator.goToNextDefaultStep();
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
        (eksisterendeSakAnnenPartRequestIsSuspended ? false : annenPartVedtakQuery.isPending) ||
        (nesteBarnsSakAnnenPartRequestIsSuspended ? false : nesteSakAnnenPartVedtakQuery.isPending);

    const stønadskontoParams = getStønadskontoParams(
        barn,
        annenForelder,
        søkersituasjon,
        barnFraNesteSak,
        annenPartVedtakQuery.data,
        eksisterendeSak,
    );
    const tilgjengeligeStønadskontoerQuery = useQuery(
        tilgjengeligeStønadskontoerOptions(stønadskontoParams, !kontoRequestIsSuspended),
    );

    const handleOnPlanChange = (nyPlan: Periode[]) => {
        setSubmitIsClicked(false);
        setIsSubmitting(false);
        setHarPlanBlittEndret(true);

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

    const valgteStønadskontoer = useMemo(() => {
        if (tilgjengeligeStønadskontoerQuery.data) {
            return dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
                ? tilgjengeligeStønadskontoerQuery.data[100]
                : tilgjengeligeStønadskontoerQuery.data[80];
        }
        return undefined;
    }, [tilgjengeligeStønadskontoerQuery.data, dekningsgrad]);

    useEffect(() => {
        if (uttaksplan.length === 0) {
            const uttaksplanForslag = lagUttaksplanForslag(
                valgteStønadskontoer!,
                eksisterendeVedtakAnnenPart?.uttaksplan,
                søkersituasjon,
                barn,
                barnFraNesteSak,
                annenForelder,
                fordeling,
                uttaksplanMetadata,
                oppdaterUttaksplanMetadata,
            );
            oppdaterUttaksplan(uttaksplanForslag);
            setHarPlanForslagIFørstegangssøknad(true);
            mellomlagreSøknadOgNaviger();
        }
    }, []);

    useEffect(() => {
        if (!eksisterendeSak && !erEndringssøknad && eksisterendeVedtakAnnenPart !== undefined) {
            oppdaterEksisterendeSak(eksisterendeVedtakAnnenPart);
        }
    }, [erEndringssøknad, eksisterendeVedtakAnnenPart, eksisterendeSak, oppdaterEksisterendeSak]);

    useEffect(() => {
        if (tilgjengeligeStønadskontoerQuery.error) {
            Sentry.captureMessage(tilgjengeligeStønadskontoerQuery.error.message);
            throw new Error(
                `Vi klarte ikke å hente opp stønadskontoer. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }
        if (annenPartVedtakQuery.error) {
            Sentry.captureMessage(annenPartVedtakQuery.error.message);
            throw new Error(
                `Vi klarte ikke å hente informasjon om saken til annen forelder. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`,
            );
        }

        if (nesteSakAnnenPartVedtakQuery.error) {
            Sentry.captureMessage(nesteSakAnnenPartVedtakQuery.error.message);
            throw new Error(
                'Vi klarte ikke å hente informasjon om saken til annen forelder for neste barn. ' +
                    'Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
            );
        }
    }, [tilgjengeligeStønadskontoerQuery.error, annenPartVedtakQuery.error, nesteSakAnnenPartVedtakQuery.error]);

    if (
        !harPlanForslagIFørstegangssøknad ||
        !tilgjengeligeStønadskontoerQuery.data ||
        (annenPartVedtakQuery.isPending && !eksisterendeSakAnnenPartRequestIsSuspended) ||
        (nesteSakAnnenPartVedtakQuery.isPending && !nesteBarnsSakAnnenPartRequestIsSuspended)
    ) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader size="2xlarge" />
            </div>
        );
    }

    const minsterettUkerToTette = getAntallUkerMinsterett(
        tilgjengeligeStønadskontoerQuery.data[Dekningsgrad.HUNDRE_PROSENT].minsteretter.toTette,
    );

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
    const antallUkerIUttaksplan = getAntallUker(valgteStønadskontoer!);

    return (
        <UttaksplanFormComponents.FormikWrapper
            initialValues={getUttaksplanFormInitialValues(
                uttaksplanMetadata?.ønskerJustertUttakVedFødsel,
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
                        bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
                        onCancel={avbrytSøknad}
                        onContinueLater={navigator.fortsettSøknadSenere}
                        steps={stepConfig}
                        noFieldsRequired
                    >
                        {startStønadsperiodeNyttBarn && (
                            <InfoOmNesteBarn minsterettUkerToTette={minsterettUkerToTette} />
                        )}
                        <VStack gap="2">
                            <Uttaksplan
                                foreldreSituasjon={foreldreSituasjon}
                                forelderVedAleneomsorg={forelderVedAleneomsorg}
                                erDeltUttak={erDeltUttak}
                                uttaksplan={uttaksplan}
                                familiehendelsesdato={familiehendelsesdato}
                                handleOnPlanChange={handleOnPlanChange}
                                stønadskontoer={valgteStønadskontoer!}
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
                                dekningsgrad={dekningsgrad}
                                antallBarn={antallBarn}
                                setUttaksplanErGyldig={setUttaksplanErGyldig}
                                eksisterendeSak={eksisterendeSak}
                                perioderSomSkalSendesInn={perioderSomSkalSendesInn}
                                harKomplettUttaksplan={harKomplettUttaksplan}
                                opprinneligPlan={
                                    uttaksplanMetadata?.harUttaksplanBlittSlettet ? undefined : opprinneligPlan
                                }
                                handleSlettUttaksplan={handleSlettUttaksplan}
                                handleResetUttaksplan={handleResetUttaksplan}
                                termindato={termindato ? dayjs(termindato).toDate() : undefined}
                                barn={barn}
                                visAutomatiskJusteringForm={visAutomatiskJusteringForm}
                                barnFraNesteSak={barnFraNesteSak}
                                familiehendelsesdatoNesteSak={familieHendelseDatoNesteSak}
                                førsteUttaksdagNesteBarnsSak={førsteUttaksdagNesteBarnsSak}
                                minsterettUkerToTette={minsterettUkerToTette}
                            />
                            {visAutomatiskJusteringForm && (
                                <AutomatiskJusteringForm
                                    termindato={termindato ? dayjs(termindato).toDate() : undefined!}
                                    perioderMedUttakRundtFødsel={perioderMedUttakRundtFødsel}
                                    antallBarn={barn.antallBarn}
                                    visibility={visibility}
                                />
                            )}
                            <VilDuGåTilbakeModal
                                isOpen={gåTilbakeIsOpen}
                                setIsOpen={setGåTilbakeIsOpen}
                                goToPreviousStep={goToPreviousStep}
                            />
                            {!uttaksplanErGyldig && submitIsClicked && (
                                <Alert variant="error">
                                    <FormattedMessage id="uttaksplan.validering.kanIkkeGåVidere" />
                                </Alert>
                            )}
                            {erTomEndringssøknad && submitIsClicked && (
                                <Alert variant="error">
                                    <FormattedMessage id="uttaksplan.validering.kanIkkeGåVidereEndringssøknad" />
                                </Alert>
                            )}
                            <StepButtonWrapper singleButton={true}>
                                {!erEndringssøknad && (
                                    <Button
                                        variant="secondary"
                                        onClick={
                                            harPlanBlittEndret
                                                ? (event) => {
                                                      event.preventDefault();
                                                      setGåTilbakeIsOpen(true);
                                                  }
                                                : goToPreviousStep
                                        }
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
                                    <FormattedMessage id="søknad.gåVidere" />
                                </Button>
                            </StepButtonWrapper>
                        </VStack>
                    </Step>
                );
            }}
        />
    );
};
export default UttaksplanStep;
