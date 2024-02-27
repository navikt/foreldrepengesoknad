import { BodyLong, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import Kalender from 'components/ikoner/Kalender';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { FormattedMessage } from 'react-intl';
import { OmBarnet, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';
dayjs.locale('nb');

const BARNEHAGELOVEN_TEKST =
    'https://www.regjeringen.no/no/tema/familie-og-barn/barnehager/innsikt/Rett-til-barnehageplass/id2344761/';

const barnehageStartdato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    if (erFødt || erIkkeFødt) {
        const dato = erIkkeFødt ? barnet.termindato : barnet.fødselsdato;

        if (dayjs(dato).month() < 8)
            return dayjs(dato).startOf('year').add(1, 'year').add(7, 'months').format('MMMM YYYY');

        if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) return dayjs(dato).add(1, 'year').format('MMMM YYYY');

        if (dayjs(dato).month() === 11)
            return dayjs(dato).startOf('year').add(2, 'year').add(7, 'months').format('MMMM YYYY');
    }
    return undefined;
};

const BarnehageplassSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);

    //TODO Bytt ut <a href> med Link-komponent (Aksel)

    return (
        <PlanleggerPage steps={stepConfig}>
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
                                                        dato: barnehageStartdato(barnet),
                                                    }}
                                                />
                                            )}
                                            {erIkkeFødt && (
                                                <FormattedMessage
                                                    id="barnehageplass.dato"
                                                    values={{ dato: barnehageStartdato(barnet) }}
                                                />
                                            )}
                                        </BodyLong>
                                    </HStack>
                                    <BodyLong>
                                        {erFødt && (
                                            <FormattedMessage
                                                id="barnehageplass.datoTekst"
                                                values={{
                                                    a: (msg: any) => (
                                                        <a
                                                            href={BARNEHAGELOVEN_TEKST}
                                                            className="lenke"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </a>
                                                    ),
                                                    dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                                                }}
                                            />
                                        )}
                                        {erIkkeFødt && (
                                            <FormattedMessage
                                                id="barnehageplass.datoTekstTermin"
                                                values={{
                                                    a: (msg: any) => (
                                                        <a
                                                            href={BARNEHAGELOVEN_TEKST}
                                                            className="lenke"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </a>
                                                    ),
                                                    dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT),
                                                }}
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
                                                        dato: barnehageStartdato(barnet),
                                                    }}
                                                />
                                            )}
                                            {erIkkeFødt && (
                                                <FormattedMessage
                                                    id="barnehageplass.dato"
                                                    values={{ dato: barnehageStartdato(barnet) }}
                                                />
                                            )}
                                        </BodyLong>
                                    </HStack>
                                    <BodyLong>
                                        {erFødt && (
                                            <FormattedMessage
                                                id="barnehageplass.datoTekstDeg"
                                                values={{
                                                    a: (msg: any) => (
                                                        <a
                                                            href={BARNEHAGELOVEN_TEKST}
                                                            className="lenke"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </a>
                                                    ),
                                                    dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                                                }}
                                            />
                                        )}
                                        {erIkkeFødt && (
                                            <FormattedMessage
                                                id="barnehageplass.datoTekstTerminDeg"
                                                values={{
                                                    a: (msg: any) => (
                                                        <a
                                                            href={BARNEHAGELOVEN_TEKST}
                                                            className="lenke"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </a>
                                                    ),
                                                    dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT),
                                                }}
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
                    <VStack>
                        <StepButtons
                            nextButtonOnClick={navigator.goToNextDefaultStep}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonText="Neste"
                            previousButtonText="Tilbake"
                        />
                    </VStack>
                </VStack>
            </VStack>
        </PlanleggerPage>
    );
};

export default BarnehageplassSteg;
