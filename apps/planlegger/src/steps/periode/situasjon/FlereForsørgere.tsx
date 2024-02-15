import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import GreenRadio from 'components/radio/GreenRadio';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger, isFarOgFar, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';
import { PeriodeEnum } from 'types/Periode';

const finnNavn = (hvemPlanlegger: HvemPlanlegger) => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor, hvemPlanlegger.navnPåMedmor];
    }
    if (isMorOgFar(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor, hvemPlanlegger.navnPåFar];
    }
    if (!isFarOgFar(hvemPlanlegger)) {
        throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
    }
    return [hvemPlanlegger.navnPåFar, hvemPlanlegger.navnPåMedfar];
};

const FlereForsørgere: FunctionComponent = () => {
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const navn = finnNavn(hvemPlanlegger);

    const Nr1Penger100 = '34 000';
    const Nr2Penger100 = '31 000';

    const Nr1Penger80 = '27 000';
    const Nr2Penger80 = '24 000';

    return (
        <VStack gap="10">
            <Heading size="large" spacing>
                <FormattedMessage id="periode.tittel" />
            </Heading>
            <VStack gap="2">
                <Heading size="small">
                    <FormattedMessage id="periode.hvaGjelderBegge" />
                </Heading>
                <RadioGroup
                    name="periode"
                    validate={[
                        isRequired(
                            intl.formatMessage({
                                id: 'feilmelding.periode.hvorLangPeriode.duMåOppgi',
                            }),
                        ),
                    ]}
                >
                    <GreenRadio
                        value={PeriodeEnum.HUNDRE}
                        description={intl.formatMessage(
                            { id: 'periode.hvaGjelder.beskrivelse' },
                            {
                                navn1: navn[0],
                                kr1: Nr1Penger100,
                                navn2: navn[1],
                                kr2: Nr2Penger100,
                            },
                        )}
                    >
                        <FormattedMessage id="periode.100" />
                    </GreenRadio>
                    <GreenRadio
                        value={PeriodeEnum.ÅTTI}
                        description={intl.formatMessage(
                            { id: 'periode.hvaGjelder.beskrivelse' },
                            {
                                navn1: navn[0],
                                kr1: Nr1Penger80,
                                navn2: navn[1],
                                kr2: Nr2Penger80,
                            },
                        )}
                    >
                        <FormattedMessage id="periode.80" />
                    </GreenRadio>
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
