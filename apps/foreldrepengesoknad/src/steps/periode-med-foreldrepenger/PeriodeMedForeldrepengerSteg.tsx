import { CalendarIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { getStønadskontoParams } from 'api/getStønadskontoParams';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { annenPartVedtakOptions, tilgjengeligeStønadskontoerOptions } from 'appData/api';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useIntl } from 'react-intl';
import { getAnnenPartVedtakParam, shouldSuspendAnnenPartVedtakApiRequest } from 'utils/annenForelderUtils';
import { getVis1Juli2024Info } from 'utils/dateUtils';
import { getKjønnFromFnr } from 'utils/personUtils';

import { Box, HStack, Loader } from '@navikt/ds-react';

import { Dekningsgrad, DekningsgradDTO, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { bemUtils } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { DekningsgradForm } from './DekningsgradForm';
import { DekningsgradValgtAvAnnenPartPanel } from './DekningsgradValgtAvAnnenPartPanel';
import { InfoOmUtvidet80ProsentPeriode } from './InfoOmUtvidet80ProsentPeriode';
import './panelWithCircleIcon.less';

type Props = {
    arbeidsforhold: Arbeidsforhold[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const PeriodeMedForeldrepengerSteg = ({ arbeidsforhold, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
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

    const annenPartVedtakParams = getAnnenPartVedtakParam(annenForelder, barn);
    const annenPartVedtakQuery = useQuery(
        annenPartVedtakOptions(annenPartVedtakParams, !suspendAnnenPartVedtakApiRequest),
    );
    const suspendStønadskontoApiRequests = suspendAnnenPartVedtakApiRequest ? false : annenPartVedtakQuery.isPending;

    const stønadskontoParams = getStønadskontoParams(
        barn,
        annenForelder,
        søkersituasjon,
        barnFraNesteSak,
        annenPartVedtakQuery.data,
        eksisterendeSak,
    );
    const tilgjengeligeStønadskontoerQuery = useQuery(
        tilgjengeligeStønadskontoerOptions(stønadskontoParams, !suspendStønadskontoApiRequests),
    );

    const visAnnenPartsValg = annenPartVedtakQuery.data && annenPartVedtakQuery.data.perioder.length > 0;
    const vis1Juli2024Info = getVis1Juli2024Info(barn, annenForelder) && !annenPartVedtakQuery.data;

    if (tilgjengeligeStønadskontoerQuery.isPending) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader size="2xlarge" />
            </div>
        );
    }

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            {tilgjengeligeStønadskontoerQuery.data && (
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
                                annenPartVedtakQuery.data.dekningsgrad === DekningsgradDTO.HUNDRE_PROSENT
                                    ? Dekningsgrad.HUNDRE_PROSENT
                                    : Dekningsgrad.ÅTTI_PROSENT
                            }
                            valgtStønadskonto={
                                tilgjengeligeStønadskontoerQuery.data[
                                    annenPartVedtakQuery.data.dekningsgrad === DekningsgradDTO.HUNDRE_PROSENT
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
                            stønadskonto100={tilgjengeligeStønadskontoerQuery.data[Dekningsgrad.HUNDRE_PROSENT]}
                            stønadskonto80={tilgjengeligeStønadskontoerQuery.data[Dekningsgrad.ÅTTI_PROSENT]}
                        />
                    )}
                </>
            )}
        </Step>
    );
};
