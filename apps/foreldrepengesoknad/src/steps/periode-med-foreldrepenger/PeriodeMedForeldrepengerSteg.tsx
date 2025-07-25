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

import { Dekningsgrad, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';
import { IconCircleWrapper, SkjemaRotLayout, Spinner, Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { DekningsgradForm } from './DekningsgradForm';
import { DekningsgradValgtAvAnnenPartPanel } from './DekningsgradValgtAvAnnenPartPanel';
import { InfoOmUtvidet80ProsentPeriode } from './InfoOmUtvidet80ProsentPeriode';

type Props = {
    arbeidsforhold: Arbeidsforhold[];
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
                            <Box padding="4" background="surface-alt-3-subtle" style={{ marginBottom: '2rem' }}>
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
                                dekningsgrad={
                                    annenPartVedtak.dekningsgrad === 'HUNDRE'
                                        ? Dekningsgrad.HUNDRE_PROSENT
                                        : Dekningsgrad.ÅTTI_PROSENT
                                }
                                valgtStønadskonto={
                                    tilgjengeligeStønadskontoerQuery.data[
                                        annenPartVedtak.dekningsgrad === 'HUNDRE'
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
                                onAvsluttOgSlett={avbrytSøknad}
                                onFortsettSenere={navigator.fortsettSøknadSenere}
                                barn={barn}
                                søkersituasjon={søkersituasjon}
                                stønadskonto100={tilgjengeligeStønadskontoerQuery.data[Dekningsgrad.HUNDRE_PROSENT]}
                                stønadskonto80={tilgjengeligeStønadskontoerQuery.data[Dekningsgrad.ÅTTI_PROSENT]}
                            />
                        )}
                    </>
                )}
            </Step>
        </SkjemaRotLayout>
    );
};
