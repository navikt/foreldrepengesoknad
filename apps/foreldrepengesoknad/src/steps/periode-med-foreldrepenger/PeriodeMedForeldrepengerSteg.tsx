import { CalendarIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useAnnenPartVedtakOptions, useStønadsKontoerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useIntl } from 'react-intl';
import { getVis1Juli2024Info } from 'utils/dateUtils';
import { getKjønnFromFnr } from 'utils/personUtils';

import { Box, HStack } from '@navikt/ds-react';

import { isAnnenForelderOppgitt } from '@navikt/fp-common';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { IconCircleWrapper, SkjemaRotLayout, Spinner, Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { DekningsgradForm } from './DekningsgradForm';
import { DekningsgradValgtAvAnnenPartPanel } from './DekningsgradValgtAvAnnenPartPanel';
import { InfoOmUtvidet80ProsentPeriode } from './InfoOmUtvidet80ProsentPeriode';

type Props = {
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

export const PeriodeMedForeldrepengerSteg = ({ arbeidsforhold, mellomlagreSøknadOgNaviger, avbrytSøknad }: Props) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));

    const annenPartVedtakOptions = useAnnenPartVedtakOptions();
    const annenPartVedtak = useQuery(annenPartVedtakOptions).data;

    const kontoerOptions = useStønadsKontoerOptions();
    const tilgjengeligeStønadskontoerQuery = useQuery(kontoerOptions);

    const visAnnenPartsValg = annenPartVedtak && annenPartVedtak.perioder.length > 0;
    const vis1Juli2024Info = getVis1Juli2024Info(barn, annenForelder) && !annenPartVedtak;

    if (tilgjengeligeStønadskontoerQuery.isPending) {
        return <Spinner />;
    }

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'søknad.pageheading' })}>
            <Step steps={stepConfig}>
                {tilgjengeligeStønadskontoerQuery.data && (
                    <>
                        {vis1Juli2024Info && (
                            <Box padding="space-16" background="brand-blue-moderate" style={{ marginBottom: '2rem' }}>
                                <HStack justify="space-between" align="start">
                                    <InfoOmUtvidet80ProsentPeriode />
                                    <IconCircleWrapper color="lightBlue" size="medium">
                                        <CalendarIcon height={24} width={24} />
                                    </IconCircleWrapper>
                                </HStack>
                            </Box>
                        )}
                        {visAnnenPartsValg && isAnnenForelderOppgitt(annenForelder) && (
                            <DekningsgradValgtAvAnnenPartPanel
                                onAvsluttOgSlett={avbrytSøknad}
                                onFortsettSenere={navigator.fortsettSøknadSenere}
                                goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                                goToNextDefaultStep={navigator.goToNextDefaultStep}
                                fornavnAnnenForelder={annenForelder.fornavn}
                                kjønnAnnenForelder={getKjønnFromFnr(annenForelder)}
                                dekningsgrad={annenPartVedtak.dekningsgrad === 'HUNDRE' ? '100' : '80'}
                                valgtStønadskonto={
                                    tilgjengeligeStønadskontoerQuery.data[
                                        annenPartVedtak.dekningsgrad === 'HUNDRE' ? '100' : '80'
                                    ]
                                }
                            />
                        )}
                        {!visAnnenPartsValg && (
                            <DekningsgradForm
                                goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                                goToNextDefaultStep={navigator.goToNextDefaultStep}
                                onAvsluttOgSlett={avbrytSøknad}
                                onFortsettSenere={navigator.fortsettSøknadSenere}
                                barn={barn}
                                søkersituasjon={søkersituasjon}
                                stønadskonto100={tilgjengeligeStønadskontoerQuery.data['100']}
                                stønadskonto80={tilgjengeligeStønadskontoerQuery.data['80']}
                            />
                        )}
                    </>
                )}
            </Step>
        </SkjemaRotLayout>
    );
};
