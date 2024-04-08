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
    const erAlenesøker = isAlene(hvemPlanlegger);
    return (
        <VStack gap="10">
            <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
                <VStack gap="2">
                    {erAlenesøker && (
                        <VStack gap="2">
                            <Heading size="small">
                                <FormattedMessage id="Foreldrepengeinfo.ForeldrepengerInfo" values={{ erAlenesøker }} />
                            </Heading>

                            <BodyLong>
                                <FormattedMessage
                                    id="Foreldrepengeinfo.ForeldrepengerInfoTekst"
                                    values={{ erAlenesøker }}
                                />
                            </BodyLong>

                            <BodyLong>
                                {/* TODO Bytt ut tekst */}
                                <FormattedMessage
                                    id="Foreldrepengeinfo.ForeldrepengerInfoTekst"
                                    values={{ erAlenesøker }}
                                />
                            </BodyLong>
                        </VStack>
                    )}
                    {!erAlenesøker && (
                        <VStack gap="2">
                            <Heading size="small">
                                <FormattedMessage id="Foreldrepengeinfo.ForeldrepengerInfo" values={{ erAlenesøker }} />
                            </Heading>

                            <BodyLong>
                                <FormattedMessage
                                    id="Foreldrepengeinfo.ForeldrepengerInfoTekst"
                                    values={{ erAlenesøker, navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage
                                    id="Foreldrepengeinfo.ForeldrepengerInfoTekstMor"
                                    values={{ navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage id="Foreldrepengeinfo.ForeldrepengerInfoTekstFar" />
                            </BodyLong>
                        </VStack>
                    )}
                </VStack>
            </Box>
        </VStack>
    );
};

export default Foreldrepengeinfo;
