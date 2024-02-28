import { BodyLong, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { BARNEHAGELOVEN_TEKST } from '../BarnehageplassSteg';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import Kalender from 'components/ikoner/Kalender';
import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { barnehageStartdato } from '../BarnehageplassSteg';

const Aleneforsørger: FunctionComponent = () => {
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);

    return (
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
                                        <Link href={BARNEHAGELOVEN_TEKST} target="_blank" inlineText>
                                            {msg}
                                        </Link>
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
                                        <Link href={BARNEHAGELOVEN_TEKST} target="_blank" inlineText>
                                            {msg}
                                        </Link>
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
    );
};

export default Aleneforsørger;
