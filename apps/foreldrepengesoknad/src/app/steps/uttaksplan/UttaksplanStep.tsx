import {
    Block,
    Dekningsgrad,
    Forelder,
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
    ISOStringToDate,
    isUfødtBarn,
    isUttakAnnenPart,
    isUttakAvForeldrepengerFørFødsel,
    isUttaksperiode,
    Periode,
    Periodene,
    SenEndringÅrsak,
    Step,
    StepButtonWrapper,
    Søkerinfo,
} from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import Api from 'app/api/api';
import getStønadskontoParams, {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
    getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'app/api/getStønadskontoParams';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import useDebounce from 'app/utils/hooks/useDebounce';
import { getPerioderSomSkalSendesInn } from 'app/utils/submitUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { getEndringstidspunkt, getMorsSisteDag } from 'app/utils/dateUtils';
import { cleanupInvisibleCharsFromTilleggsopplysninger } from 'app/utils/tilleggsopplysningerUtils';
import VilDuGåTilbakeModal from './components/vil-du-gå-tilbake-modal/VilDuGåTilbakeModal';
import { UttaksplanFormComponents, UttaksplanFormField } from 'app/steps/uttaksplan/UttaksplanFormConfig';
import { getUttaksplanFormInitialValues } from './UttaksplanFormUtils';
import { FormikValues } from 'formik';
import {
    getStartdatoFørstePeriodeAnnenPart,
    mapAnnenPartsEksisterendeSakFromDTO,
} from 'app/utils/eksisterendeSakUtils';
import { RequestStatus } from 'app/types/RequestState';
import dayjs from 'dayjs';
import { getAntallUkerMinsterett } from '../uttaksplan-info/utils/stønadskontoer';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import { Alert, Button, Loader } from '@navikt/ds-react';
import { dateToISOString, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Link } from 'react-router-dom';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import { getHarAktivitetskravIPeriodeUtenUttak, Uttaksplan } from '@navikt/uttaksplan';
import AttachmentApi from '../../api/attachmentApi';
import { finnOgSettInnHull, settInnAnnenPartsUttak } from '@navikt/uttaksplan/src/builder/uttaksplanbuilderUtils';
import {
    getKanJustereAutomatiskVedFødsel,
    getVisAutomatiskJusteringForm,
} from './automatisk-justering-form/automatiskJusteringUtils';
import { getSamtidigUttaksprosent } from '../../utils/uttaksplanInfoUtils';
import AutomatiskJusteringForm from './automatisk-justering-form/AutomatiskJusteringForm';
import uttaksplanQuestionsConfig from './uttaksplanQuestionConfig';
import { FpDataType, useFpState, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    mellomlagreSøknadOgNaviger: () => void;
    avbrytSøknad: () => void;
};

const UttaksplanStep: React.FunctionComponent<Props> = ({
    søkerInfo,
    erEndringssøknad,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [gåTilbakeIsOpen, setGåTilbakeIsOpen] = useState(false);
    const [uttaksplanErGyldig, setUttaksplanErGyldig] = useState(true);

    const søkersituasjon = notEmpty(useFpStateData(FpDataType.SØKERSITUASJON));
    const barn = notEmpty(useFpStateData(FpDataType.OM_BARNET));
    const annenForelder = notEmpty(useFpStateData(FpDataType.ANNEN_FORELDER));
    const søker = notEmpty(useFpStateData(FpDataType.SØKER));
    const uttaksplanMetadata = notEmpty(useFpStateData(FpDataType.UTTAKSPLAN_METADATA));
    const uttaksplanInfo = notEmpty(useFpStateData(FpDataType.UTTAKSPLAN_INFO));
    const uttaksplan = notEmpty(useFpStateData(FpDataType.UTTAKSPLAN));
    const barnFraNesteSak = useFpStateData(FpDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useFpStateData(FpDataType.EKSISTERENDE_SAK);

    const lagreBarn = useFpStateSaveFn(FpDataType.OM_BARNET);
    const lagreBarnFraNesteSak = useFpStateSaveFn(FpDataType.BARN_FRA_NESTE_SAK);
    const lagreUttaksplan = useFpStateSaveFn(FpDataType.UTTAKSPLAN);
    const lagreEksisterendeSak = useFpStateSaveFn(FpDataType.EKSISTERENDE_SAK);
    const lagreUttaksplanMetadata = useFpStateSaveFn(FpDataType.UTTAKSPLAN_METADATA);
    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);

    const [endringstidspunkt, setEndringstidspunkt] = useState(uttaksplanMetadata.endringstidspunkt);
    const [perioderSomSkalSendesInn, setPerioderSomSkalSendesInn] = useState(
        uttaksplanMetadata.perioderSomSkalSendesInn || [],
    );

    const nextRoute = erEndringssøknad ? SøknadRoutes.OPPSUMMERING : SøknadRoutes.UTENLANDSOPPHOLD;
    const { person, arbeidsforhold } = søkerInfo;
    const { erAleneOmOmsorg } = søker;
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

    const debouncedState = useDebounce(useFpState(), 3000);
    useEffect(() => {
        mellomlagreSøknadOgNaviger();
    }, [debouncedState, mellomlagreSøknadOgNaviger]);

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

    const goToPreviousStep = () => {
        setGåTilbakeIsOpen(false);

        lagreAppRoute(SøknadRoutes.UTTAKSPLAN_INFO);
        mellomlagreSøknadOgNaviger();
    };

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
        if (erFarEllerMedmor && barn.antallBarn !== saksgrunnlagsAntallBarn) {
            lagreBarn({ ...barn, antallBarn: saksgrunnlagsAntallBarn });
        }
    }, [erFarEllerMedmor, saksgrunnlagsAntallBarn, barn, lagreBarn]);

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
            barnFraNesteSak !== undefined &&
            (dayjs(førsteUttaksdagAnnenPart).isBefore(barnFraNesteSak.startdatoFørsteStønadsperiode, 'd') ||
                barnFraNesteSak.startdatoFørsteStønadsperiode === undefined)
        ) {
            const oppdatertBarnNesteSak = {
                ...barnFraNesteSak,
                startdatoFørsteStønadsperiode: førsteUttaksdagAnnenPart,
            };
            lagreBarnFraNesteSak(oppdatertBarnNesteSak);
        }
    }, [førsteUttaksdagNesteBarnsSak, førsteUttaksdagAnnenPart, barnFraNesteSak, lagreBarnFraNesteSak]);

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
            lagreUttaksplan(uttaksplanMedAnnenPart);
            lagreEksisterendeSak(eksisterendeSakMedAnnenPartsPlan);

            lagreUttaksplanMetadata({
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
        lagreUttaksplan,
        lagreEksisterendeSak,
        lagreUttaksplanMetadata,
    ]);

    const handleBegrunnelseChange = (årsak: SenEndringÅrsak, begrunnelse: string) => {
        const ekstraInformasjon = årsak !== SenEndringÅrsak.Ingen ? årsak : undefined;
        const opplysninger = {
            ...(uttaksplanMetadata.tilleggsopplysninger || {}),
            begrunnelseForSenEndring: {
                ...(uttaksplanMetadata.tilleggsopplysninger || {}).begrunnelseForSenEndring,
                tekst: begrunnelse,
                ekstraInformasjon: ekstraInformasjon,
            },
        };

        lagreUttaksplanMetadata({
            ...uttaksplanMetadata,
            tilleggsopplysninger: opplysninger,
        });
    };

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

            lagreUttaksplanMetadata({
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
        lagreUttaksplanMetadata,
        uttaksplanMetadata,
    ]);

    const onSubmit = async () => {
        setIsSubmitting(true);

        const cleanedTilleggsopplysninger = cleanupInvisibleCharsFromTilleggsopplysninger(
            uttaksplanMetadata.tilleggsopplysninger,
        );

        lagreUttaksplanMetadata({
            ...uttaksplanMetadata,
            endringstidspunkt,
            perioderSomSkalSendesInn,
            tilleggsopplysninger: cleanedTilleggsopplysninger,
        });

        lagreAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

    const perioderMedUttakRundtFødsel = getPerioderMedUttakRundtFødsel(
        uttaksplan,
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
            lagreUttaksplanMetadata({
                ...uttaksplanMetadata,
                ønskerJustertUttakVedFødsel: undefined,
            });
        }
    };

    const ønskerJustertUttakVedFødselErBesvart = (ønskerAutomatiskJusteringSvar: boolean | undefined) => {
        return (
            visAutomatiskJusteringForm && kanJustereAutomatiskVedFødsel && ønskerAutomatiskJusteringSvar !== undefined
        );
    };

    const ref = useRef<FormikValues>(null);
    const clickHandler = async (values: any) => {
        setIsSubmitting(true);
        if (uttaksplanErGyldig && !erTomEndringssøknad) {
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
        setIsSubmitting(false);

        lagreUttaksplan(nyPlan);

        const tidspunktForEndring = getEndringstidspunkt(opprinneligPlan, nyPlan, erEndringssøknad);

        setEndringstidspunkt(endringstidspunkt);

        const perioderForÅSendeInn = getPerioderSomSkalSendesInn(
            nyPlan,
            erEndringssøknad,
            erFarEllerMedmor,
            opprinneligPlan,
            tidspunktForEndring,
        );
        setPerioderSomSkalSendesInn(perioderForÅSendeInn);

        lagreUttaksplanMetadata({
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
        uttaksplanMetadata.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskontoer[100] : stønadskontoer[80];

    const erTomEndringssøknad =
        erEndringssøknad && (perioderSomSkalSendesInn === undefined || perioderSomSkalSendesInn.length === 0);

    const handleSlettUttaksplan = () => {
        const slettetPlanUtenomFpFørFødsel = uttaksplan.filter((periode) => isUttakAvForeldrepengerFørFødsel(periode));
        lagreUttaksplan(slettetPlanUtenomFpFørFødsel);
        lagreUttaksplanMetadata({
            ...uttaksplanMetadata,
            harUttaksplanBlittSlettet: true,
        });
    };

    const handleResetUttaksplan = () => {
        if (eksisterendeSak) {
            lagreUttaksplan(eksisterendeSak.uttaksplan);

            lagreUttaksplanMetadata({
                ...uttaksplanMetadata,
                perioderSomSkalSendesInn: [],
            });
            setPerioderSomSkalSendesInn([]);
        }
    };

    return (
        <UttaksplanFormComponents.FormikWrapper
            initialValues={getUttaksplanFormInitialValues(uttaksplanMetadata.ønskerJustertUttakVedFødsel)}
            onSubmit={onSubmit}
            innerRef={ref}
            renderForm={({ values }) => {
                const visibility = uttaksplanQuestionsConfig.getVisbility({
                    ønskerAutomatiskJustering: values[UttaksplanFormField.ønskerAutomatiskJustering] ?? YesOrNo.NO,
                    termindato,
                    perioderMedUttakRundtFødsel,
                });

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="uttaksplan"
                        pageTitle={intlUtils(intl, 'søknad.uttaksplan')}
                        onCancel={avbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, erEndringssøknad)}
                    >
                        <Block padBottom="l">
                            <InfoOmSøknaden
                                eksisterendeSak={eksisterendeSak}
                                erIUttaksplanenSteg={true}
                                tilgjengeligeStønadskontoer={valgteStønadskontoer}
                                minsterettUkerToTette={minsterettUkerToTette}
                                person={søkerInfo.person}
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
                            dekningsgrad={uttaksplanMetadata.dekningsgrad!}
                            antallBarn={antallBarn}
                            tilleggsopplysninger={uttaksplanMetadata.tilleggsopplysninger || {}}
                            setUttaksplanErGyldig={setUttaksplanErGyldig}
                            handleBegrunnelseChange={handleBegrunnelseChange}
                            eksisterendeSak={eksisterendeSak}
                            perioderSomSkalSendesInn={perioderSomSkalSendesInn}
                            morsSisteDag={morsSisteDag}
                            harKomplettUttaksplan={harKomplettUttaksplan}
                            opprinneligPlan={uttaksplanMetadata.harUttaksplanBlittSlettet ? undefined : opprinneligPlan}
                            handleSlettUttaksplan={handleSlettUttaksplan}
                            handleResetUttaksplan={handleResetUttaksplan}
                            termindato={termindato}
                            barn={barn}
                            saveAttachment={AttachmentApi.saveAttachment}
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
                                    termindato={termindato!}
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
                        {!uttaksplanErGyldig && isSubmitting && (
                            <Block textAlignCenter={true} padBottom="l">
                                <Alert variant="error">
                                    <FormattedMessage id="uttaksplan.validering.kanIkkeGåVidere" />
                                </Alert>
                            </Block>
                        )}
                        {erTomEndringssøknad && isSubmitting && (
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
