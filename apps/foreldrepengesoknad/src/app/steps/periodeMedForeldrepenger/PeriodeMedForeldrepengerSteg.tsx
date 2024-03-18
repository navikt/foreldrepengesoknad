import { useIntl } from 'react-intl';

import { Loader } from '@navikt/ds-react';

import { Dekningsgrad, DekningsgradDTO, Step, getKjønnFromFnr, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import { useApiGetData, useApiPostData } from 'app/api/context/useFpApiData';
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { RequestStatus } from 'app/types/RequestState';
import { getAnnenPartVedtakParam, shouldSuspendAnnenPartVedtakApiRequest } from 'app/utils/annenForelderUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';

import DekningsgradForm from './DekningsgradForm';
import DekningsgradValgtAvAnnenPartPanel from './DekningsgradValgtAvAnnenPartPanel';

type Props = {
    arbeidsforhold: Arbeidsforhold[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const PeriodeMedForeldrepengerSteg: React.FunctionComponent<Props> = ({
    arbeidsforhold,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
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
        barnFraNesteSak,
        annenPartsVedtak,
        eksisterendeSak,
    );

    const suspendStønadskontoApiRequests = suspendAnnenPartVedtakApiRequest
        ? false
        : statusAnnenPartVedtak !== RequestStatus.FINISHED;

    const { data: tilgjengeligeStønadskontoer80 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_80,
        params.stønadskontoParams80,
        suspendStønadskontoApiRequests,
    );
    const { data: tilgjengeligeStønadskontoer100 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_100,
        params.stønadskontoParams100,
        suspendStønadskontoApiRequests,
    );

    const tilgjengeligeStønadskontoer =
        tilgjengeligeStønadskontoer80 && tilgjengeligeStønadskontoer100
            ? getValgtStønadskontoFor80Og100Prosent(tilgjengeligeStønadskontoer80, tilgjengeligeStønadskontoer100)
            : undefined;

    const visAnnenPartsValg = annenPartsVedtak && annenPartsVedtak.perioder.length > 0;

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
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
                            goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                            goToNextDefaultStep={navigator.goToNextDefaultStep}
                            fornavnAnnenForelder={annenForelder.fornavn}
                            kjønnAnnenForelder={getKjønnFromFnr(annenForelder)}
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
                            goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                            goToNextDefaultStep={navigator.goToNextDefaultStep}
                            barn={barn}
                            søkersituasjon={søkersituasjon}
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
