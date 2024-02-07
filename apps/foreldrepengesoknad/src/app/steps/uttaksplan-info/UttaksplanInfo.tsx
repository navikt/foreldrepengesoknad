import { Loader } from '@navikt/ds-react';
import { Step, Søkerinfo, intlUtils, isAnnenForelderOppgitt, isFarEllerMedmor, isFødtBarn } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';
import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import { useApiGetData, useApiPostData } from 'app/api/context/useFpApiData';
import getStønadskontoParams, {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'app/api/getStønadskontoParams';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { RequestStatus } from 'app/types/RequestState';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import UttaksplanInfoScenarios from './components/UttaksplanInfoScenarios';

type Props = {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const UttaksplanInfo: React.FunctionComponent<Props> = ({
    søkerInfo,
    erEndringssøknad,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);

    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const oppdaterUttaksplanMetaData = useContextSaveData(ContextDataType.UTTAKSPLAN_METADATA);
    const oppdaterEksisterendeSak = useContextSaveData(ContextDataType.EKSISTERENDE_SAK);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);

    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr === false ? annenForelder.fnr : undefined;
    const eksisterendeSakAnnenPartRequestIsSuspended = annenPartFnr !== undefined && annenPartFnr !== '' ? false : true;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const barnFnr = isFødtBarn(barn) && barn.fnr !== undefined && barn.fnr?.length > 0 ? barn.fnr[0] : undefined;

    const {
        data: eksisterendeSakAnnenPartData,
        error: eksisterendeSakAnnenPartError,
        requestStatus: eksisterendeSakAnnenPartRequestStatus,
    } = useApiPostData(
        FpApiDataType.ANNEN_PART_VEDTAK,
        {
            annenPartFødselsnummer: annenPartFnr,
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

    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.grunnlag.antallBarn,
    );

    const oppdaterBarnOgLagreUttaksplandata = (metadata: UttaksplanMetaData) => {
        if (erFarEllerMedmor && barn.antallBarn !== saksgrunnlagsAntallBarn) {
            oppdaterOmBarnet({ ...barn, antallBarn: saksgrunnlagsAntallBarn });
        }

        // TODO (TOR) Kvifor blir dette gjort her? Bedre å isolera denne funksjonaliteten til UttaksplanStep
        if (eksisterendeVedtakAnnenPart !== undefined) {
            oppdaterEksisterendeSak(eksisterendeVedtakAnnenPart);

            metadata = {
                ...metadata,
                annenPartsUttakErLagtTilIPlan: true,
            };
        }

        // TODO (TOR) Kvifor blir dette gjort her? Bedre å isolera denne funksjonaliteten til UttaksplanStep
        if (uttaksplanMetadata?.harUttaksplanBlittSlettet !== false) {
            metadata = {
                ...metadata,
                harUttaksplanBlittSlettet: false,
            };
        }

        oppdaterUttaksplanMetaData({
            ...uttaksplanMetadata,
            ...metadata,
        });
    };

    const { stønadskontoParams100, stønadskontoParams80 } = getStønadskontoParams(
        barn,
        annenForelder,
        søkersituasjon,
        søker,
        barnFraNesteSak,
        eksisterendeSakAnnenPartData,
        eksisterendeSak,
    );

    const suspendRequest = eksisterendeSakAnnenPartRequestIsSuspended
        ? false
        : eksisterendeSakAnnenPartRequestStatus !== RequestStatus.FINISHED;

    const { data: stønadskontoer80 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_80,
        stønadskontoParams80,
        suspendRequest,
    );
    const { data: stønadskontoer100, error: tilgjengeligeStønadskontoerError } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_100,
        stønadskontoParams100,
        suspendRequest,
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
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
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
                goToNextDefaultStep={navigator.goToNextDefaultStep}
                goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                oppdaterBarnOgLagreUttaksplandata={oppdaterBarnOgLagreUttaksplandata}
            />
        </Step>
    );
};

export default UttaksplanInfo;
