import { BodyLong, Box, Heading, Radio, VStack } from '@navikt/ds-react';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PeriodeEnum } from 'types/Periode';

const Aleneforsørger: FunctionComponent = () => {
    const intl = useIntl();

    return (
        <VStack>
            <Heading size="large">
                <FormattedMessage id="periode.tittel" />
            </Heading>
            <VStack gap="10">
                <VStack gap="2">
                    <Heading size="small">
                        <FormattedMessage id="periode.hvaGjelderDeg" />
                    </Heading>
                    <RadioGroup name="periode">
                        <Radio
                            value={PeriodeEnum.HUNDRE}
                            description={intl.formatMessage(
                                { id: 'periode.hvaGjelder.beskrivelseDeg' },
                                {
                                    kr1: '10',
                                },
                            )}
                            className="margin-bottom-2 panel green"
                        >
                            <FormattedMessage id="periode.100" />
                        </Radio>
                        <Radio
                            value={PeriodeEnum.ÅTTI}
                            description={intl.formatMessage(
                                { id: 'periode.hvaGjelder.beskrivelseDeg' },
                                {
                                    kr1: '10',
                                },
                            )}
                            className="margin-bottom-2 panel green"
                        >
                            <FormattedMessage id="periode.80" />
                        </Radio>
                    </RadioGroup>
                </VStack>

                <Box padding="4" borderRadius="large" borderColor="border-alt-3" borderWidth="2">
                    <Heading size="small">
                        <FormattedMessage id="periode.ikkeDekketTittel" />
                    </Heading>
                    <BodyLong>
                        <FormattedMessage id="periode.ikkeDekketTekstDeg" />
                    </BodyLong>
                </Box>

                <Box padding="4" borderRadius="large" background="bg-subtle">
                    <Heading size="small">
                        <FormattedMessage id="periode.utbetalingTittelDeg" />
                    </Heading>
                    <BodyLong>
                        <FormattedMessage id="periode.utbetalingTekst" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage id="periode.utbetalingTekst.del2" />
                    </BodyLong>
                </Box>
            </VStack>
        </VStack>
    );
};

export default Aleneforsørger;
