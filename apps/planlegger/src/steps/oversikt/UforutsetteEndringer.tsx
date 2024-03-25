import { ExclamationmarkIcon, PersonPregnantIcon, StethoscopeIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';
import { Situasjon } from 'types/Søkersituasjon';

import { BodyLong, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

const UforutsetteEndringer: React.FunctionComponent = () => {
    return (
        <ExpansionCard aria-label=".">
            <ExpansionCard.Header>
                <HStack gap="10" align="center">
                    <div>
                        <IconCircleWrapper color="green" size="large">
                            <ExclamationmarkIcon height={22} width={22} fontSize="1.5rem" />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <ExpansionCard.Title size="medium">
                            <FormattedMessage id="oversikt.uforutsetteEndringer" />
                        </ExpansionCard.Title>
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Innhold />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

const Innhold = () => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const erFar = hvemPlanlegger.type === Situasjon.FAR;
    // TODO: endre fra erFar til kun far har rett

    return (
        <>
            <VStack gap="5">
                <HStack gap="5" align="start" wrap={false} justify="space-between">
                    <div>
                        <IconCircleWrapper color="lightBlue" size="medium">
                            <StethoscopeIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <Heading size="small">
                            {erFar ? (
                                <FormattedMessage id="oversikt.uforutsetteEndringer.hvisManBlirSyk.far" />
                            ) : (
                                <FormattedMessage id="oversikt.uforutsetteEndringer.hvisManBlirSyk" />
                            )}
                        </Heading>

                        <BodyLong>
                            {erFar ? (
                                <FormattedMessage id="oversikt.uforutsetteEndringer.hvisManBlirSyk.tekstFar" />
                            ) : (
                                <FormattedMessage id="oversikt.uforutsetteEndringer.hvisManBlirSyk.tekst" />
                            )}
                        </BodyLong>
                    </div>
                </HStack>
                {!erFar && (
                    <HStack gap="5" align="start" wrap={false} justify="space-between">
                        <div>
                            <IconCircleWrapper color="lightBlue" size="medium">
                                <StethoscopeIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                            </IconCircleWrapper>
                        </div>
                        <div>
                            <Heading size="small">
                                <FormattedMessage id="oversikt.uforutsetteEndringer.hvisMorBlirSyk" />
                            </Heading>
                            <BodyLong>
                                <FormattedMessage id="oversikt.uforutsetteEndringer.hvisMorBlirSyk.tekst" />
                            </BodyLong>
                        </div>
                    </HStack>
                )}

                <HStack gap="5" align="start" wrap={false} justify="space-between">
                    <div>
                        <IconCircleWrapper color="lightBlue" size="medium">
                            <PersonPregnantIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <Heading size="small">
                            <FormattedMessage id="oversikt.uforutsetteEndringer.hvisManFårNyttBarnFørTreÅr" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="oversikt.uforutsetteEndringer.hvisManFårNyttBarnFørTreÅr.tekst" />
                        </BodyLong>
                    </div>
                </HStack>
            </VStack>
        </>
    );
};
export default UforutsetteEndringer;