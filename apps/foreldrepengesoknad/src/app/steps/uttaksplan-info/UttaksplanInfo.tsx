import { intlUtils, Step } from '@navikt/fp-common';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import Api from 'app/api/api';
import UttaksplanInfoScenarios from './components/UttaksplanInfoScenarios';
import getStønadskontoParams, {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
    getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'app/api/getStønadskontoParams';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import actionCreator from 'app/context/action/actionCreator';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { RequestStatus } from 'app/types/RequestState';
import { getFarMedmorErAleneOmOmsorg, getMorErAleneOmOmsorg } from 'app/utils/personUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { isFødtBarn } from 'app/context/types/Barn';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import SøknadRoutes from 'app/routes/routes';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import { Loader } from '@navikt/ds-react';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

const UttaksplanInfo = () => {
    const intl = useIntl();

    const søknad = useSøknad();
    const { dispatch, state } = useForeldrepengesøknadContext();

    const { barn, annenForelder, søkersituasjon, søker } = søknad;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const { erAleneOmOmsorg } = søker;
    const { barnFraNesteSak, eksisterendeSak } = state;

    const familieHendelseDatoNesteSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.familiehendelsesdato : undefined;
    const førsteUttaksdagNesteBarnsSak =
        state.barnFraNesteSak !== undefined ? state.barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr === false ? annenForelder.fnr : undefined;
    const eksisterendeSakAnnenPartRequestIsSuspended = annenPartFnr !== undefined && annenPartFnr !== '' ? false : true;
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

    useSaveLoadedRoute(SøknadRoutes.UTTAKSPLAN_INFO);

    const saksgrunnlagsTermindato = getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter(
        eksisterendeSak?.grunnlag.termindato,
        eksisterendeVedtakAnnenPart?.grunnlag.termindato
    );

    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.grunnlag.antallBarn
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

    //Uttaksplaninfo vises ikke hvis endringssøknad, så det er nok å sette annen parts sak og uttaksplan her
    useEffect(() => {
        if (eksisterendeVedtakAnnenPart !== undefined) {
            dispatch(actionCreator.setUttaksplan(eksisterendeVedtakAnnenPart.uttaksplan));
            dispatch(actionCreator.setEksisterendeSak(eksisterendeVedtakAnnenPart));
            dispatch(actionCreator.setAnnenPartsUttakErLagtTilIPlan(true));
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
                saksgrunnlagsAntallBarn,
                saksgrunnlagsTermindato
            ),
            eksisterendeSakAnnenPartRequestIsSuspended
                ? false
                : eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED
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
            saksgrunnlagsTermindato
        ),
        eksisterendeSakAnnenPartRequestIsSuspended
            ? false
            : eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    useEffect(() => {
        if (tilgjengeligeStønadskontoerError) {
            sendErrorMessageToSentry(tilgjengeligeStønadskontoerError);
            throw new Error(
                `Vi klarte ikke å hente opp stønadskontoer. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`
            );
        }
        if (eksisterendeSakAnnenPartError) {
            sendErrorMessageToSentry(eksisterendeSakAnnenPartError);
            throw new Error(
                `Vi klarte ikke å hente informasjon om saken til annen forelder. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.`
            );
        }
    }, [tilgjengeligeStønadskontoerError, eksisterendeSakAnnenPartError]);

    if (
        !stønadskontoer100 ||
        !stønadskontoer80 ||
        (eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED &&
            !eksisterendeSakAnnenPartRequestIsSuspended)
    ) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader size="2xlarge" />
            </div>
        );
    }

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('uttaksplanInfo')}
            activeStepId="uttaksplanInfo"
            pageTitle={intlUtils(intl, 'søknad.uttaksplanInfo')}
            onCancel={onAvbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl)}
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
