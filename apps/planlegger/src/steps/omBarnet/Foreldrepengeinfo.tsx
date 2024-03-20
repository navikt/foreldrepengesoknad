import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';

import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

const Foreldrepengeinfo: FunctionComponent = () => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    return (
        <VStack gap="10">
            <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
                <VStack gap="2">
                    {isAlene(hvemPlanlegger) && (
                        <VStack gap="2">
                            <Heading size="small">
                                <FormattedMessage id="barnet.foreldrepengerInfoDeg" />
                            </Heading>

                            <BodyLong>
                                <FormattedMessage id="barnet.foreldrepengerInfoTekstDeg" />
                            </BodyLong>

                            <BodyLong>
                                {/* TODO Bytt ut test */}
                                <FormattedMessage id="barnet.foreldrepengerInfoTekstDeg" />
                            </BodyLong>
                        </VStack>
                    )}
                    {!isAlene(hvemPlanlegger) && (
                        <VStack gap="2">
                            <Heading size="small">
                                <FormattedMessage id="barnet.foreldrepengerInfo" />
                            </Heading>

                            <BodyLong>
                                <FormattedMessage
                                    id="barnet.foreldrepengerInfoTekst"
                                    values={{ navn: getNavnPåSøker(hvemPlanlegger) }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage
                                    id="barnet.foreldrepengerInfoTekstMor"
                                    values={{ navn: getNavnPåSøker(hvemPlanlegger) }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage id="barnet.foreldrepengerInfoTekstFar" />
                            </BodyLong>
                        </VStack>
                    )}
                </VStack>
            </Box>
        </VStack>
    );
};

export default Foreldrepengeinfo;
