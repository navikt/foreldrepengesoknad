import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger, getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';

import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
}

//TODO Skal denne brukast?

const Foreldrepengeinfo: FunctionComponent<Props> = ({ hvemPlanlegger }) => {
    const intl = useIntl();

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
                                {/* TODO Bytt ut tekst */}
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
                                    values={{ navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage
                                    id="barnet.foreldrepengerInfoTekstMor"
                                    values={{ navn: getNavnPåSøker(hvemPlanlegger, intl) }}
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
