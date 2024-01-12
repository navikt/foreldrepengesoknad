import { BodyLong, BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import Hjerte from 'components/ikoner/Hjerte';
import RosaSirkel from 'components/ikoner/RosaSirkel';
import BlåSirkel from 'components/ikoner/BlåSirkel';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { notEmpty } from '@navikt/fp-validation';
import { PeriodeEnum } from 'types/Periode';
import { PlanleggerRoutes } from 'appData/routes';

const OversiktSteg = () => {
    const navigate = useNavigate();
    const navigator = usePlanleggerNavigator();
    const valgtPeriode = notEmpty(useContextGetData(ContextDataType.PERIODE));

    return (
        <ContentWrapper>
            <VStack gap="10">
                <Heading size="large" spacing>
                    <FormattedMessage id="oversikt.tittel" />
                </Heading>

                <BodyLong size="large">
                    <FormattedMessage id="oversikt.ingress" />
                </BodyLong>
                <Box padding="4" borderRadius="large" borderColor="border-alt-3" borderWidth="2">
                    <Heading size="small" spacing>
                        <FormattedMessage id="oversikt.valgtTittel" />
                    </Heading>

                    <HStack align="center" justify="space-between">
                        <BodyLong>
                            {valgtPeriode.periode === PeriodeEnum.HUNDRE && <FormattedMessage id="oversikt.100" />}
                            {valgtPeriode.periode === PeriodeEnum.ÅTTI && <FormattedMessage id="oversikt.80" />}
                        </BodyLong>
                        <Button icon={<PencilIcon aria-hidden />} className="icon-right" />
                    </HStack>
                </Box>
                <VStack gap="2">
                    <HStack justify="space-between">
                        <HStack gap="5" align="center">
                            <BlåSirkel />
                            <BodyShort>
                                {valgtPeriode.periode === PeriodeEnum.HUNDRE && (
                                    <FormattedMessage id="ukerForeldrepenger.100" />
                                )}
                                {valgtPeriode.periode === PeriodeEnum.ÅTTI && (
                                    <FormattedMessage id="ukerForeldrepenger.80" />
                                )}
                            </BodyShort>
                        </HStack>

                        <HStack gap="5" align="center">
                            <Hjerte />
                            <BodyShort>
                                <FormattedMessage id="termindatoIkontekst" />
                            </BodyShort>
                        </HStack>
                    </HStack>

                    <HStack gap="4">
                        <HStack gap="5" align="center">
                            <RosaSirkel />
                            <BodyShort>
                                <FormattedMessage id="barnehagestartIkontekst" />
                            </BodyShort>
                        </HStack>
                    </HStack>
                </VStack>
                <Block>
                    <Heading size="small" spacing>
                        <FormattedMessage id="oversikt.2024" />
                    </Heading>
                    {/* TODO: Add a panel/box component*/}
                    <Box padding="4" borderRadius="large" background="surface-alt-3-subtle">
                        <BodyShort>Kalenderoversikt</BodyShort>
                    </Box>
                </Block>
                <Block>
                    <Heading size="small" spacing>
                        <FormattedMessage id="oversikt.2025" />
                    </Heading>
                    <Box padding="4" borderRadius="large" background="surface-alt-3-subtle">
                        <BodyShort>Kalenderoversikt</BodyShort>
                    </Box>
                </Block>
                <Block margin="xxl" className="button-wrapper content-wrapper">
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={() => navigate(PlanleggerRoutes.OPPSUMMERING)}
                        nextButtonText="Tilpass plan"
                        previousButtonText="Tilbake"
                    />
                </Block>
            </VStack>
        </ContentWrapper>
    );
};

export default OversiktSteg;
