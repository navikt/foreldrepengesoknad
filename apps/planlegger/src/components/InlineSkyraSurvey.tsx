import { TasklistIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import '../styles/InlineSkyraSurvey.css';

const SURVEY_COMPLETED_KEY = 'skyra-survey-planlegger-completed';

export const InlineSkyraSurvey = () => {
    const intl = useIntl();
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [hasCompletedSurvey, setHasCompletedSurvey] = useState(() => {
        return sessionStorage.getItem(SURVEY_COMPLETED_KEY) === 'true';
    });
    const [isOpen, setIsOpen] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hvis undersøkelsen allerede er fullført, ikke last den på nytt
        if (sessionStorage.getItem(SURVEY_COMPLETED_KEY) === 'true') {
            return;
        }

        if (!containerRef.current) return;

        const surveyElement = containerRef.current.querySelector('skyra-survey');
        if (!(surveyElement instanceof HTMLElement)) {
            return;
        }

        let hasLoadedOnce = false;
        let observer: MutationObserver | null = null;

        const checkSurveyState = () => {
            const hasContent =
                (surveyElement.shadowRoot?.childNodes.length ?? 0) > 0 ||
                surveyElement.children.length > 0 ||
                surveyElement.childNodes.length > 0;

            const isHidden =
                globalThis.getComputedStyle(surveyElement).display === 'none' ||
                surveyElement.getAttribute('hidden') !== null ||
                surveyElement.style.display === 'none';

            if (hasContent && !hasLoadedOnce) {
                setIsLoaded(true);
                hasLoadedOnce = true;
            }

            if (hasLoadedOnce && (!hasContent || isHidden)) {
                setHasCompletedSurvey(true);
                setIsOpen(false);
                sessionStorage.setItem(SURVEY_COMPLETED_KEY, 'true');
                if (observer) {
                    observer.disconnect();
                }
                clearTimeout(timeout);
            }
        };

        observer = new MutationObserver(() => {
            checkSurveyState();
        });

        observer.observe(surveyElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['hidden', 'style', 'class'],
        });

        if (surveyElement.shadowRoot) {
            observer.observe(surveyElement.shadowRoot, {
                childList: true,
                subtree: true,
            });
        }

        // Initial sjekk i tilfelle surveyen allerede er lastet
        checkSurveyState();

        // Timeout på 30 sekunder - hvis ikke lastet, skjul komponenten
        const timeout = setTimeout(() => {
            if (!hasLoadedOnce) {
                setHasFailed(true);
            }
            if (observer) {
                observer.disconnect();
            }
        }, 30000);

        return () => {
            if (observer) {
                observer.disconnect();
            }
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
    if (hasCompletedSurvey) {
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
                    {!hasCompletedSurvey && (
                        // @ts-expect-error skyra-survey er et custom element
                        <skyra-survey
                            style={{
                                opacity: isLoaded ? 1 : 0,
                                position: isLoaded ? 'relative' : 'absolute',
                                pointerEvents: isLoaded ? 'auto' : 'none',
                            }}
                            slug="arbeids-og-velferdsetaten-nav/planlegg-foreldrepenger-inline"
                        />
                    )}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
