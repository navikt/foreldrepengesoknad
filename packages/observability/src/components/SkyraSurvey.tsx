import { TasklistIcon } from '@navikt/aksel-icons';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Skeleton, VStack } from '@navikt/ds-react';

import './SkyraSurvey.css';

type SkyraEvent =
    | { type: 'surveyStarted'; slug: string }
    | { type: 'surveyCompleted'; slug: string }
    | { type: 'surveyRejected'; slug: string };

declare global {
    var skyra:
        | {
              on: (event: SkyraEvent['type'], callback: (event: { slug: string }) => void) => () => void;
          }
        | undefined;
}

export interface SkyraSurveyProps {
    slug: string;
}

export const SkyraSurvey = ({ slug }: SkyraSurveyProps) => {
    const intl = useIntl();
    const resolvedTitle = intl.formatMessage({ id: 'SkyraSurvey.Tittel' });
    const surveyKey = `skyra-survey-${slug}-completed`;
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [hasCompletedSurvey, setHasCompletedSurvey] = useState(() => sessionStorage.getItem(surveyKey) === 'true');
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem(surveyKey) === 'true') {
            return;
        }

        let hasLoaded = false;

        const unsubscribeSurveyStarted = globalThis.skyra?.on('surveyStarted', (event) => {
            if (event.slug === slug) {
                hasLoaded = true;
                setIsLoaded(true);
            }
        });

        const unsubscribeSurveyCompleted = globalThis.skyra?.on('surveyCompleted', (event) => {
            if (event.slug === slug) {
                setHasCompletedSurvey(true);
                setIsOpen(false);
                sessionStorage.setItem(surveyKey, 'true');
            }
        });

        const unsubscribeSurveyRejected = globalThis.skyra?.on('surveyRejected', (event) => {
            if (event.slug === slug) {
                setHasFailed(true);
            }
        });

        const timeout = setTimeout(() => {
            if (!hasLoaded) {
                setHasFailed(true);
            }
        }, 30000);

        return () => {
            unsubscribeSurveyStarted?.();
            unsubscribeSurveyCompleted?.();
            unsubscribeSurveyRejected?.();
            clearTimeout(timeout);
        };
    }, [slug]);

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
                <div>
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
