import { BodyLong, Box, Heading, Radio, VStack } from '@navikt/ds-react';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PeriodeEnum } from 'types/Periode';

const Aleneforsørger: FunctionComponent = () => {
    const intl = useIntl();

    const penger100 = '34 000';
    const penger80 = '27 000';

    return (
        <VStack gap="10">
            <Heading size="large" spacing>
                <FormattedMessage id="periode.tittelDeg" />
            </Heading>
            <VStack gap="2">
                <Heading size="small">
                    <FormattedMessage id="periode.hvaGjelderDeg" />
                </Heading>
                <RadioGroup
                    name="periode"
                    validate={[
                        isRequired(
                            intl.formatMessage({
                                id: 'feilmelding.periode.hvorLangPeriodeAlene.duMåOppgi',
                            }),
                        ),
                    ]}
                >
                    <Radio
                        value={PeriodeEnum.HUNDRE}
                        description={intl.formatMessage(
                            { id: 'periode.hvaGjelder.beskrivelseDeg' },
                            {
                                kr1: penger100,
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
                                kr1: penger80,
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
