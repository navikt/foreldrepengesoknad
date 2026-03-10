import { TasklistIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Skeleton, VStack } from '@navikt/ds-react';

import './SkyraSurvey.module.css';

export interface SkyraSurveyProps {
    slug: string;
}

export const SkyraSurvey = ({ slug }: SkyraSurveyProps) => {
    const intl = useIntl();
    const resolvedTitle = intl.formatMessage({ id: 'SkyraSurvey.Tittel' });
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [hasCompletedSurvey, setHasCompletedSurvey] = useState(() => {
        const key = `skyra-survey-${slug}-completed`;
        return sessionStorage.getItem(key) === 'true';
    });
    const [isOpen, setIsOpen] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const surveyKey = `skyra-survey-${slug}-completed`;

        // Hvis undersøkelsen allerede er fullført, ikke last den på nytt
        if (sessionStorage.getItem(surveyKey) === 'true') {
            return;
        }

        if (!containerRef.current) {
            return;
        }

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
                sessionStorage.setItem(surveyKey, 'true');
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
    }, [slug]);

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
                <FormattedMessage id="SkyraSurvey.Takk" />
            </BodyShort>
        );
    } else if (isLoaded) {
        surveyContent = null;
    } else {
        surveyContent = (
            <VStack gap="space-8">
                <Skeleton variant="text" />
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
            aria-label={resolvedTitle}
            size="small"
            open={isOpen}
            onToggle={setIsOpen}
        >
            <ExpansionCard.Header>
                <HStack gap="space-24" align="center" wrap={false}>
                    <TasklistIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                    <ExpansionCard.Title size="small">{resolvedTitle}</ExpansionCard.Title>
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
                            slug={slug}
                        />
                    )}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
