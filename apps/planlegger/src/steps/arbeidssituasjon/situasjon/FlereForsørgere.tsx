import { Heading, VStack } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import GreenRadio from 'components/radio/GreenRadio';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger, isFarOgFar, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';

export const finnNavn = (hvemPlanlegger: HvemPlanlegger) => {
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

const finnHvemPlanlegger = (hvemPlanlegger: HvemPlanlegger) => {
    if (isMorOgFar(hvemPlanlegger)) {
        return ['mor', 'far'];
    }
    if (isMorOgMedmor(hvemPlanlegger)) {
        return ['mor', 'medmor'];
    }
    if (!isFarOgFar(hvemPlanlegger)) {
        throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
    }
    return ['far', 'far'];
};

const FlereForsørgere: FunctionComponent = () => {
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const navn = finnNavn(hvemPlanlegger);
    const hvem = finnHvemPlanlegger(hvemPlanlegger);

    return (
        <VStack gap="10">
            <VStack gap="1">
                <Heading size="small">
                    <FormattedMessage id={'arbeid.hvaGjelder'} values={{ navn: navn[0] }} />
                </Heading>
                <RadioGroup
                    name="arbeidssituasjonFørste"
                    validate={[
                        isRequired(intlUtils(intl, 'feilmelding.arbeidssituasjonFlere.duMåOppgi', { hvem: hvem[0] })),
                    ]}
                >
                    <GreenRadio
                        value={true}
                        description={intl.formatMessage(
                            { id: 'arbeid.jobber.beskrivelse' },
                            {
                                navn: navn[0],
                            },
                        )}
                    >
                        <FormattedMessage id="arbeid.jobber" />
                    </GreenRadio>

                    <GreenRadio
                        value={false}
                        description={intl.formatMessage(
                            { id: 'arbeid.jobberIkke.beskrivelse' },
                            {
                                navn: navn[0],
                            },
                        )}
                    >
                        <FormattedMessage id="arbeid.jobberIkke" />
                    </GreenRadio>
                </RadioGroup>
            </VStack>

            <VStack gap="1">
                <Heading size="small">
                    <FormattedMessage id={'arbeid.hvaGjelder'} values={{ navn: navn[1] }} />
                </Heading>
                <RadioGroup
                    name="arbeidssituasjonAndre"
                    validate={[
                        isRequired(intlUtils(intl, 'feilmelding.arbeidssituasjonFlere.duMåOppgi', { hvem: hvem[1] })),
                    ]}
                >
                    <GreenRadio
                        value={true}
                        description={intl.formatMessage(
                            { id: 'arbeid.jobber.beskrivelse' },
                            {
                                navn: navn[1],
                            },
                        )}
                    >
                        <FormattedMessage id="arbeid.jobber" />
                    </GreenRadio>
                    <GreenRadio
                        value={false}
                        description={intl.formatMessage(
                            { id: 'arbeid.jobberIkke.beskrivelse' },

                            { navn: navn[1] },
                        )}
                    >
                        <FormattedMessage id="arbeid.jobberIkke" />
                    </GreenRadio>
                </RadioGroup>
            </VStack>
        </VStack>
    );
};

export default FlereForsørgere;
