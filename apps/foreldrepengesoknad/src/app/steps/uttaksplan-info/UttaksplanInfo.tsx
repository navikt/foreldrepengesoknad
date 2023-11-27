import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Loader } from '@navikt/ds-react';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { notEmpty } from '@navikt/fp-validation';
import {
    Dekningsgrad,
    getFarMedmorErAleneOmOmsorg,
    getMorErAleneOmOmsorg,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isFødtBarn,
    Step,
    Søkerinfo,
} from '@navikt/fp-common';
import stepConfig from '../stepsConfig';
import Api from 'app/api/api';
import UttaksplanInfoScenarios from './components/UttaksplanInfoScenarios';
import getStønadskontoParams, {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
    getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'app/api/getStønadskontoParams';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { RequestStatus } from 'app/types/RequestState';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import { FpDataType, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';

type Props = {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    mellomlagreSøknadOgNaviger: () => void;
    avbrytSøknad: () => void;
};

const UttaksplanInfo: React.FunctionComponent<Props> = ({
    søkerInfo,
    erEndringssøknad,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const søkersituasjon = notEmpty(useFpStateData(FpDataType.SØKERSITUASJON));
    const barn = notEmpty(useFpStateData(FpDataType.OM_BARNET));
    const annenForelder = notEmpty(useFpStateData(FpDataType.ANNEN_FORELDER));
    const søker = notEmpty(useFpStateData(FpDataType.SØKER));
    const barnFraNesteSak = useFpStateData(FpDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useFpStateData(FpDataType.EKSISTERENDE_SAK);
    const uttaksplanMetadata = useFpStateData(FpDataType.UTTAKSPLAN_METADATA);

    const lagreOmBarnet = useFpStateSaveFn(FpDataType.OM_BARNET);
    const lagreUttaksplan = useFpStateSaveFn(FpDataType.UTTAKSPLAN);
    const lagreUttaksplanMetaData = useFpStateSaveFn(FpDataType.UTTAKSPLAN_METADATA);
    const lagreEksisterendeSak = useFpStateSaveFn(FpDataType.EKSISTERENDE_SAK);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const { erAleneOmOmsorg } = søker;

    const familieHendelseDatoNesteSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.familiehendelsesdato : undefined;
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

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
            eksisterendeSakAnnenPartRequestIsSuspended,
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

    //TODO (TOR) Går det an å skriva useEffects under på ein annan måte?

    useEffect(() => {
        if (erFarEllerMedmor && barn.antallBarn !== saksgrunnlagsAntallBarn) {
            lagreOmBarnet({ ...barn, antallBarn: saksgrunnlagsAntallBarn });
        }
    }, [barn, erFarEllerMedmor, lagreOmBarnet, saksgrunnlagsAntallBarn]);

    //Uttaksplaninfo vises ikke hvis endringssøknad, så det er nok å sette annen parts sak og uttaksplan her
    useEffect(() => {
        if (eksisterendeVedtakAnnenPart !== undefined) {
            lagreUttaksplan(eksisterendeVedtakAnnenPart.uttaksplan);
            lagreEksisterendeSak(eksisterendeVedtakAnnenPart);

            lagreUttaksplanMetaData({
                ...uttaksplanMetadata,
                annenPartsUttakErLagtTilIPlan: true,
            });
        }
    }, [
        eksisterendeVedtakAnnenPart,
        lagreUttaksplan,
        lagreEksisterendeSak,
        lagreUttaksplanMetaData,
        uttaksplanMetadata,
    ]);

    useEffect(() => {
        if (uttaksplanMetadata?.harUttaksplanBlittSlettet !== false) {
            lagreUttaksplanMetaData({
                ...uttaksplanMetadata,
                harUttaksplanBlittSlettet: false,
            });
        }
    }, [lagreUttaksplanMetaData, uttaksplanMetadata]);

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
            eksisterendeSakAnnenPartRequestIsSuspended
                ? false
                : eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED,
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
        eksisterendeSakAnnenPartRequestIsSuspended
            ? false
            : eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED,
    );

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
            activeStepId="uttaksplanInfo"
            pageTitle={intlUtils(intl, 'søknad.uttaksplanInfo')}
            onCancel={avbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl, false)}
        >
            <UttaksplanInfoScenarios
                tilgjengeligeStønadskontoer100DTO={stønadskontoer100}
                tilgjengeligeStønadskontoer80DTO={stønadskontoer80}
                eksisterendeSakAnnenPart={eksisterendeVedtakAnnenPart}
                søkersituasjon={søkersituasjon}
                søker={søker}
                annenForelder={annenForelder}
                erEndringssøknad={erEndringssøknad}
                person={søkerInfo.person}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />
        </Step>
    );
};

export default UttaksplanInfo;
