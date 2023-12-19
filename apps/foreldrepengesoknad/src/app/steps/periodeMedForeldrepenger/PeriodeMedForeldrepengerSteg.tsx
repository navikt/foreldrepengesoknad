import { useIntl } from 'react-intl';
import { Loader } from '@navikt/ds-react';
import {
    AnnenForelder,
    Barn,
    Dekningsgrad,
    DekningsgradDTO,
    Step,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isFødtBarn,
} from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { useApiPostData, useApiGetData } from 'app/api/context/useFpApiData';
import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { RequestStatus } from 'app/types/RequestState';
import stepConfig from '../stepsConfig';
import DekningsgradForm from './DekningsgradForm';
import DekningsgradValgtAvAnnenPartPanel from './DekningsgradValgtAvAnnenPartPanel';

const getAnnenPartVedtakParam = (annenForelder: AnnenForelder, barn: Barn) => {
    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr === false ? annenForelder.fnr : undefined;
    const barnFnr = isFødtBarn(barn) && barn.fnr !== undefined && barn.fnr?.length > 0 ? barn.fnr[0] : undefined;
    return {
        annenPartFnr,
        barnFnr,
        familiehendelsesdato: getFamiliehendelsedato(barn),
    };
};

const shouldSuspendAnnenPartVedtakApiRequest = (annenForelder: AnnenForelder) => {
    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr !== true ? annenForelder.fnr : undefined;
    return annenPartFnr !== undefined && annenPartFnr !== '' ? false : true;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => void;
    avbrytSøknad: () => void;
};

const PeriodeMedForeldrepengerSteg: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);

    const suspendAnnenPartVedtakApiRequest = shouldSuspendAnnenPartVedtakApiRequest(annenForelder);

    const { data: annenPartsVedtak, requestStatus: statusAnnenPartVedtak } = useApiPostData(
        FpApiDataType.ANNEN_PART_VEDTAK,
        getAnnenPartVedtakParam(annenForelder, barn),
        suspendAnnenPartVedtakApiRequest,
    );

    const params = getStønadskontoParams(
        barn,
        annenForelder,
        søkersituasjon,
        søker,
        barnFraNesteSak,
        annenPartsVedtak,
        eksisterendeSak,
    );

    const suspendStønadskontoApiRequests = suspendAnnenPartVedtakApiRequest
        ? false
        : statusAnnenPartVedtak !== RequestStatus.FINISHED;

    const { data: tilgjengeligeStønadskontoer80, error: error1 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_80,
        params.stønadskontoParams80,
        suspendStønadskontoApiRequests,
    );
    const { data: tilgjengeligeStønadskontoer100 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_100,
        params.stønadskontoParams100,
        suspendStønadskontoApiRequests,
    );
    console.log(error1);
    // console.log(error2);

    const tilgjengeligeStønadskontoer =
        tilgjengeligeStønadskontoer80 && tilgjengeligeStønadskontoer100
            ? getValgtStønadskontoFor80Og100Prosent(tilgjengeligeStønadskontoer80, tilgjengeligeStønadskontoer100)
            : undefined;

    const visAnnenPartsValg =
        isFarEllerMedmor(søkersituasjon.rolle) && annenPartsVedtak && annenPartsVedtak.perioder.length > 0;

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="periodeMedForeldrepenger"
            pageTitle={intl.formatMessage({ id: 'søknad.søkersituasjon' })}
            onCancel={avbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl, false)}
        >
            {!tilgjengeligeStønadskontoer && (
                <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                    <Loader size="2xlarge" />
                </div>
            )}
            {tilgjengeligeStønadskontoer && (
                <>
                    {visAnnenPartsValg && isAnnenForelderOppgitt(annenForelder) && (
                        <DekningsgradValgtAvAnnenPartPanel
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            fornavn={annenForelder.fornavn}
                            dekningsgrad={
                                annenPartsVedtak.dekningsgrad === DekningsgradDTO.HUNDRE_PROSENT
                                    ? Dekningsgrad.HUNDRE_PROSENT
                                    : Dekningsgrad.ÅTTI_PROSENT
                            }
                            valgtStønadskonto={
                                tilgjengeligeStønadskontoer[
                                    annenPartsVedtak.dekningsgrad === DekningsgradDTO.HUNDRE_PROSENT
                                        ? Dekningsgrad.HUNDRE_PROSENT
                                        : Dekningsgrad.ÅTTI_PROSENT
                                ]
                            }
                        />
                    )}
                    {!visAnnenPartsValg && (
                        <DekningsgradForm
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            termindato={params.stønadskontoParams100.termindato}
                            stønadskonto100={tilgjengeligeStønadskontoer[Dekningsgrad.HUNDRE_PROSENT]}
                            stønadskonto80={tilgjengeligeStønadskontoer[Dekningsgrad.ÅTTI_PROSENT]}
                        />
                    )}
                </>
            )}
        </Step>
    );
};

export default PeriodeMedForeldrepengerSteg;
