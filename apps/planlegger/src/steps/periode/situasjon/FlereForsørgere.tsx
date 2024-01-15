import { BodyLong, Box, Heading, Radio, VStack } from '@navikt/ds-react';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isMorOgFar } from 'types/HvemPlanlegger';
import { PeriodeEnum } from 'types/Periode';

const FlereForsørgere: FunctionComponent = () => {
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const navnMor = isMorOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåMor : undefined;
    const navnFar = isMorOgFar(hvemPlanlegger) ? hvemPlanlegger.navnPåFar : undefined;

    return (
        <VStack gap="10">
            <Heading size="large">
                <FormattedMessage id="periode.tittel" />
            </Heading>
            <VStack gap="1">
                <Heading size="small">
                    <FormattedMessage id="periode.hvaGjelderBegge" />
                </Heading>
                <RadioGroup name="periode">
                    <Radio
                        value={PeriodeEnum.HUNDRE}
                        description={intl.formatMessage(
                            { id: 'periode.hvaGjelder.beskrivelse' },
                            {
                                navn1: navnMor,
                                kr1: '10',
                                navn2: navnFar,
                                kr2: '12',
                            },
                        )}
                        className="margin-bottom-2 panel green"
                    >
                        <FormattedMessage id="periode.100" />
                    </Radio>
                    <Radio
                        value={PeriodeEnum.ÅTTI}
                        description={intl.formatMessage(
                            { id: 'periode.hvaGjelder.beskrivelse' },
                            {
                                navn1: navnMor,
                                kr1: '10',
                                navn2: navnFar,
                                kr2: '12',
                            },
                        )}
                        className="margin-bottom-2 panel green"
                    >
                        <FormattedMessage id="periode.80" />
                    </Radio>
                </RadioGroup>
            </VStack>

            <VStack gap="10">
                <Box padding="4" borderRadius="large" borderColor="border-alt-3" borderWidth="2">
                    <Heading size="small" spacing>
                        <FormattedMessage id="periode.ikkeDekketTittel" />
                    </Heading>

                    <BodyLong>
                        <FormattedMessage id="periode.ikkeDekketTekst" />
                    </BodyLong>
                </Box>

                <Box padding="4" borderColor="border-alt-3" borderRadius="large" background="bg-subtle">
                    <Heading size="small" spacing>
                        <FormattedMessage id="periode.utbetalingTittel" />
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

export default FlereForsørgere;
