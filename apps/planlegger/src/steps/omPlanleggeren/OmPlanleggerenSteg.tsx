import { ClockIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { ContentWrapper } from '@navikt/fp-ui';
import { PlanleggerRoutes } from 'appData/routes';
import Kalender from 'components/ikoner/Kalender';
import Spørsmålstegn from 'components/ikoner/Spørsmålstegn';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const OmPlanleggerenSteg = () => {
    const navigate = useNavigate();

    return (
        <ContentWrapper>
            <VStack gap="10">
                <VStack gap="1">
                    <Heading size="large">
                        <FormattedMessage id="om.tittel" />
                    </Heading>
                    <Heading size="small">
                        <HStack gap="4" align="center">
                            <ClockIcon />
                            <FormattedMessage id="om.label" />
                        </HStack>
                    </Heading>
                </VStack>

                <BodyShort size="large">
                    <FormattedMessage id="om.ingress" />
                </BodyShort>

                <Heading level="2" size="xsmall">
                    <FormattedMessage id="om.underoverskrift" />
                </Heading>

                <VStack gap="5">
                    <HStack gap="4" align="center">
                        <Spørsmålstegn />
                        <BodyShort>
                            <FormattedMessage id="om.trinn1" />
                        </BodyShort>
                    </HStack>
                    <HStack gap="4" align="center">
                        <Kalender />
                        <BodyShort>
                            <FormattedMessage id="om.trinn2" />
                        </BodyShort>
                    </HStack>
                </VStack>

                <VStack gap="10" className="content-wrapper button-wrapper">
                    <Button
                        variant="secondary"
                        className="planleggerKnapp"
                        onClick={() => navigate(PlanleggerRoutes.HVEM_PLANLEGGER)}
                    >
                        <FormattedMessage id="om.start.planlegger" />
                    </Button>
                </VStack>
            </VStack>
        </ContentWrapper>
    );
};

export default OmPlanleggerenSteg;
