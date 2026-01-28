import { TasklistIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import './InlineSkyraSurvey.module.css';

// Declare custom element to avoid TypeScript errors
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'skyra-survey': { slug: string; className?: string };
        }
    }
}

export const InlineSkyraSurvey = () => {
    const intl = useIntl();
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [isSurveyEmpty, setIsSurveyEmpty] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const surveyElement = containerRef.current.querySelector('skyra-survey');
        if (!surveyElement) return;

        let hasLoadedOnce = false;

        // Sjekk med intervall om surveyen har fått innhold eller er lukket
        const intervalId = setInterval(() => {
            const hasContent =
                surveyElement.shadowRoot?.childNodes.length ||
                surveyElement.children.length > 0 ||
                surveyElement.childNodes.length > 0;

            // Sjekk om surveyen er skjult (display: none) eller har blitt fjernet
            const isHidden =
                globalThis.getComputedStyle(surveyElement).display === 'none' ||
                surveyElement.getAttribute('hidden') !== null ||
                (surveyElement as HTMLElement).style.display === 'none';

            if (hasContent && !hasLoadedOnce) {
                setIsLoaded(true);
                hasLoadedOnce = true;
            }

            // Hvis surveyen har lastet men nå er tom eller skjult, er undersøkelsen over
            if (hasLoadedOnce && (!hasContent || isHidden)) {
                setIsSurveyEmpty(true);
                setIsOpen(false);
                clearInterval(intervalId);
            }
        }, 100);

        // Timeout på 30 sekunder - hvis ikke lastet, skjul komponenten
        const timeout = setTimeout(() => {
            if (!hasLoadedOnce) {
                setHasFailed(true);
            }
            clearInterval(intervalId);
        }, 30000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeout);
        };
    }, []);

    // Vis kun surveyen for norsk bokmål og nynorsk
    if (intl.locale !== 'nb' && intl.locale !== 'nn') {
        return null;
    }

    if (hasFailed) {
        return null;
    }

    let surveyContent;
    if (isSurveyEmpty) {
        surveyContent = (
            <BodyShort>
                <FormattedMessage id="InlineSkyraSurvey.Takk" />
            </BodyShort>
        );
    } else if (isLoaded) {
        surveyContent = null;
    } else {
        surveyContent = (
            <VStack gap="space-8">
                <Heading as={Skeleton} size="large">
                    <FormattedMessage id="InlineSkyraSurvey.Heading" />
                </Heading>
                <Skeleton variant="rounded" width="100%" height={30} />
                <HStack justify={'end'}>
                    <Skeleton variant="rounded" width="30%" height={50} />
                </HStack>
            </VStack>
        );
    }

    return (
        <ExpansionCard
            data-color="brand-beige"
            aria-label={intl.formatMessage({ id: 'InlineSkyraSurvey.Tittel' })}
            size="small"
            open={isOpen}
            onToggle={setIsOpen}
        >
            <ExpansionCard.Header>
                <HStack gap="space-24" align="center" wrap={false}>
                    <IconCircleWrapper size="medium" color="lightBlue">
                        <TasklistIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                    </IconCircleWrapper>
                    <ExpansionCard.Title size="small">
                        <FormattedMessage id="InlineSkyraSurvey.Tittel" />
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div ref={containerRef}>
                    {surveyContent}
                    {/* @ts-expect-error - skyra-survey er et custom element */}
                    <skyra-survey
                        style={{
                            opacity: isLoaded && !isSurveyEmpty ? 1 : 0,
                            position: isLoaded && !isSurveyEmpty ? 'relative' : 'absolute',
                            pointerEvents: isLoaded && !isSurveyEmpty ? 'auto' : 'none',
                        }}
                        slug="arbeids-og-velferdsetaten-nav/planlegg-foreldrepenger-inline"
                    >
                        {/* @ts-expect-error - skyra-survey er et custom element */}
                    </skyra-survey>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
