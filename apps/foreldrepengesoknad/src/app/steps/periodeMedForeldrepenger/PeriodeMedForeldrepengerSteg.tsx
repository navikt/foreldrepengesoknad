import { CalendarIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';

import { Box, HStack, Loader } from '@navikt/ds-react';

import {
    Dekningsgrad,
    DekningsgradDTO,
    Step,
    bemUtils,
    getKjønnFromFnr,
    isAnnenForelderOppgitt,
} from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import { useApiPostData } from 'app/api/context/useFpApiData';
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { RequestStatus } from 'app/types/RequestState';
import { getAnnenPartVedtakParam, shouldSuspendAnnenPartVedtakApiRequest } from 'app/utils/annenForelderUtils';
import { getVis1Juli2024Info } from 'app/utils/dateUtils';

import DekningsgradForm from './DekningsgradForm';
import DekningsgradValgtAvAnnenPartPanel from './DekningsgradValgtAvAnnenPartPanel';
import InfoOmUtvidet80ProsentPeriode from './InfoOmUtvidet80ProsentPeriode';
import './panelWithCircleIcon.less';

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
    const bem = bemUtils('circle');
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

    const suspendStønadskontoApiRequests = suspendAnnenPartVedtakApiRequest
        ? false
        : statusAnnenPartVedtak !== RequestStatus.FINISHED;

    const { data: tilgjengeligeStønadskontoer } = useApiPostData(
        FpApiDataType.STØNADSKONTOER,
        getStønadskontoParams(barn, annenForelder, søkersituasjon, barnFraNesteSak, annenPartsVedtak, eksisterendeSak),
        suspendStønadskontoApiRequests,
    );

    const visAnnenPartsValg = annenPartsVedtak && annenPartsVedtak.perioder.length > 0;
    const vis1Juli2024Info = getVis1Juli2024Info(barn, annenForelder) && !annenPartsVedtak;

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
                    {vis1Juli2024Info && (
                        <Box padding="4" background="surface-alt-3-subtle" style={{ marginBottom: '2rem' }}>
                            <HStack justify="space-between" align="start">
                                <InfoOmUtvidet80ProsentPeriode />
                                <div className={bem.block}>
                                    <CalendarIcon height={24} width={24} color="#005B82" />
                                </div>
                            </HStack>
                        </Box>
                    )}
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
