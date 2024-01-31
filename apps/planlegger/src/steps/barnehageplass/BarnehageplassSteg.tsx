import { FormattedMessage } from 'react-intl';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { BodyLong, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { PlanleggerRoutes } from 'appData/routes';
import Kalender from 'components/ikoner/Kalender';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { date1YearAgo } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { isAlene } from 'types/HvemPlanlegger';
import { erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';

const BarnehageplassSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);

    const barnehageStartdato = () => {
        if (erFødt && dayjs(barnet.fødselsdato).isAfter(date1YearAgo, 'day')) {
            return dayjs(barnet.fødselsdato).add(1, 'year').add(4, 'days').format(DDMMYYYY_DATE_FORMAT);
        }
        if (erIkkeFødt && dayjs(barnet.termindato).isAfter(date1YearAgo, 'day')) {
            return dayjs(barnet.termindato).add(1, 'year').add(4, 'days').format(DDMMYYYY_DATE_FORMAT);
        }
        return 'undefined';
    };

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large">
                    <FormattedMessage id="barnehageplass.tittel" />
                </Heading>
                <VStack gap="10">
                    {!isAlene(hvemPlanlegger) && (
                        <VStack gap="10">
                            <Box borderColor="border-alt-3" padding="4" borderWidth="2" borderRadius="xlarge">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.datoTittel" />
                                    </Heading>

                                    <HStack gap="5" align="center">
                                        <Kalender />
                                        <BodyLong>
                                            {erFødt && (
                                                <FormattedMessage
                                                    id="barnehageplass.dato"
                                                    values={{
                                                        dato: barnehageStartdato(),
                                                    }}
                                                />
                                            )}
                                            {erIkkeFødt && (
                                                <FormattedMessage
                                                    id="barnehageplass.dato"
                                                    values={{ dato: barnehageStartdato() }}
                                                />
                                            )}
                                        </BodyLong>
                                    </HStack>
                                    <BodyLong>
                                        {erFødt && (
                                            <FormattedMessage
                                                id="barnehageplass.datoTekst"
                                                values={{
                                                    dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                                                }}
                                            />
                                        )}
                                        {erIkkeFødt && (
                                            <FormattedMessage
                                                id="barnehageplass.datoTekstTermin"
                                                values={{ dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT) }}
                                            />
                                        )}
                                    </BodyLong>
                                </VStack>
                            </Box>

                            <Box padding="4" borderRadius="large" background="bg-subtle">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.barnehageTittel" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage id="barnehageplass.barnehageTekst" />
                                    </BodyLong>
                                </VStack>
                            </Box>

                            <Box padding="4" borderRadius="large" background="bg-subtle">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.kommuneTittel" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage id="barnehageplass.kommuneTekst" />
                                    </BodyLong>
                                </VStack>
                            </Box>

                            <Box padding="4" borderRadius="large" background="bg-subtle">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.alleredeTittel" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage id="barnehageplass.alleredeTekst" />
                                    </BodyLong>
                                    <HStack>
                                        <Button variant="secondary" type="button">
                                            <FormattedMessage id="barnehageplass.knapp" />
                                        </Button>
                                    </HStack>
                                </VStack>
                            </Box>
                        </VStack>
                    )}
                    {isAlene(hvemPlanlegger) && (
                        <VStack gap="10">
                            <Box borderColor="border-alt-3" padding="4" borderWidth="2" borderRadius="xlarge">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.datoTittelDeg" />
                                    </Heading>
                                    <HStack gap="5" align="center">
                                        <Kalender />
                                        <BodyLong>
                                            {erFødt && (
                                                <FormattedMessage
                                                    id="barnehageplass.dato"
                                                    values={{
                                                        dato: barnehageStartdato(),
                                                    }}
                                                />
                                            )}
                                            {erIkkeFødt && (
                                                <FormattedMessage
                                                    id="barnehageplass.dato"
                                                    values={{ dato: barnehageStartdato() }}
                                                />
                                            )}
                                        </BodyLong>
                                    </HStack>
                                    <BodyLong>
                                        {erFødt && (
                                            <FormattedMessage
                                                id="barnehageplass.datoTekstDeg"
                                                values={{
                                                    dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                                                }}
                                            />
                                        )}
                                        {erIkkeFødt && (
                                            <FormattedMessage
                                                id="barnehageplass.datoTekstTerminDeg"
                                                values={{ dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT) }}
                                            />
                                        )}{' '}
                                    </BodyLong>
                                </VStack>
                            </Box>

                            <Box padding="4" borderRadius="large" background="bg-subtle">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.barnehageTittel" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage id="barnehageplass.barnehageTekstDeg" />
                                    </BodyLong>
                                </VStack>
                            </Box>

                            <Box padding="4" borderRadius="large" background="bg-subtle">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.kommuneTittel" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage id="barnehageplass.kommuneTekstDeg" />
                                    </BodyLong>
                                </VStack>
                            </Box>

                            <Box padding="4" borderRadius="large" background="bg-subtle">
                                <VStack gap="2">
                                    <Heading size="small">
                                        <FormattedMessage id="barnehageplass.alleredeTittelDeg" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage id="barnehageplass.alleredeTekstDeg" />
                                    </BodyLong>
                                    <HStack>
                                        <Button variant="secondary" type="button">
                                            <FormattedMessage id="barnehageplass.knapp" />
                                        </Button>
                                    </HStack>
                                </VStack>
                            </Box>
                        </VStack>
                    )}
                </VStack>

                <VStack gap="20">
                    <HvorforSpørViOmDette text="TODO" />
                    <VStack className="button-wrapper content-wrapper">
                        <StepButtons
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonText="Neste"
                            previousButtonText="Tilbake"
                            nextButtonOnClick={() => {
                                navigator.goToNextStep(PlanleggerRoutes.ARBEIDSSITUASJON);
                            }}
                        />
                    </VStack>
                </VStack>
            </VStack>
        </ContentWrapper>
    );
};

export default BarnehageplassSteg;
