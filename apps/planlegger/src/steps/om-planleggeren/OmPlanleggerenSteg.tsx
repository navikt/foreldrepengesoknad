import { ArrowRightIcon, CalendarIcon, QuestionmarkIcon } from '@navikt/aksel-icons';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';

import { Alert, BodyShort, Button, HStack, Heading, InlineMessage, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { PlanleggerForside } from './PlanleggerForside';

export const OmPlanleggerenSteg = () => {
    const navigator = usePlanleggerNavigator();
    const location = useLocation();
    const navigate = useNavigate();
    const [lenkeErUgyldig] = useState(
        () => (location.state as { ugyldigLenke?: boolean } | null)?.ugyldigLenke === true,
    );

    // Fjerner flagget fra historikkoppføringen slik at varselet ikke vises igjen ved tilbakenavigering
    useEffect(() => {
        if (lenkeErUgyldig) {
            void navigate({ pathname: location.pathname, search: location.search }, { replace: true });
        }
    }, [lenkeErUgyldig, navigate, location.pathname, location.search]);

    return (
        <PlanleggerForside>
            <VStack gap={{ xs: 'space-12', sm: 'space-40' }}>
                {lenkeErUgyldig && (
                    <Alert variant="warning">
                        <FormattedMessage id="OmPlanleggerenSteg.UgyldigLenke" />
                    </Alert>
                )}
                <BodyShort size="large">
                    <FormattedMessage id="OmPlanleggerenSteg.Ingress" />
                </BodyShort>
                <VStack gap={{ xs: 'space-32', sm: 'space-80' }}>
                    <VStack gap={{ xs: 'space-8', sm: 'space-20' }}>
                        <Heading level="2" size="xsmall">
                            <FormattedMessage id="OmPlanleggerenSteg.Underoverskrift" />
                        </Heading>
                        <HStack gap="space-16" align="center" wrap={false}>
                            <IconCircleWrapper color="lightBlue" size="medium">
                                <QuestionmarkIcon width="24" height="25" aria-hidden />
                            </IconCircleWrapper>
                            <BodyShort>
                                <FormattedMessage id="OmPlanleggerenSteg.Trinn1" />
                            </BodyShort>
                        </HStack>
                        <HStack gap="space-16" align="center" wrap={false}>
                            <IconCircleWrapper color="lightBlue" size="medium">
                                <CalendarIcon width="24" height="25" aria-hidden />
                            </IconCircleWrapper>
                            <BodyShort>
                                <FormattedMessage id="OmPlanleggerenSteg.Trinn2" />
                            </BodyShort>
                        </HStack>
                    </VStack>
                    <InlineMessage status="info">
                        <BodyShort size="small" className="text-text-subtle">
                            <FormattedMessage id="OmPlanleggerenSteg.IngenLagring" />
                        </BodyShort>
                    </InlineMessage>
                    <HStack justify="center">
                        <Button
                            onClick={navigator.goToNextDefaultStep}
                            icon={<ArrowRightIcon aria-hidden height={24} width={24} />}
                            iconPosition="right"
                            className="w-full md:w-[100px]"
                            autoFocus
                        >
                            <FormattedMessage id="OmPlanleggerenSteg.Start.Planlegger" />
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </PlanleggerForside>
    );
};
