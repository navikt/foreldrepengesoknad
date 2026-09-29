import { TasklistIcon } from '@navikt/aksel-icons';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Skeleton, VStack } from '@navikt/ds-react';

import './SkyraSurvey.css';

type SkyraEvent = { type: 'surveyCompleted'; slug: string };
type SurveyStatus = 'loading' | 'ready' | 'error' | 'unavailable';

declare global {
    var skyra:
        | {
              on: (event: SkyraEvent['type'], callback: (event: { slug: string }) => void) => () => void;
          }
        | undefined;
}

export interface SkyraSurveyProps {
    slug: string;
    /** Heading-nivå (h1-h6) for tittelen, slik at ho passar inn i den omkringliggande overskriftsstrukturen. */
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const SkyraSurvey = ({ slug, titleAs = 'h2' }: SkyraSurveyProps) => {
    const intl = useIntl();
    const resolvedTitle = intl.formatMessage({ id: 'SkyraSurvey.Tittel' });
    const surveyKey = `skyra-survey-${slug}-completed`;
    const [surveyStatus, setSurveyStatus] = useState<SurveyStatus>('loading');
    const [hasCompletedSurvey, setHasCompletedSurvey] = useState(() => sessionStorage.getItem(surveyKey) === 'true');
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem(surveyKey) === 'true') {
            return;
        }

        const unsubscribeSurveyCompleted = globalThis.skyra?.on('surveyCompleted', (event) => {
            if (event.slug === slug) {
                setHasCompletedSurvey(true);
                setIsOpen(false);
                sessionStorage.setItem(surveyKey, 'true');
            }
        });

        return () => {
            unsubscribeSurveyCompleted?.();
        };
    }, [slug]);

    if (intl.locale !== 'nb' && intl.locale !== 'nn') {
        return null;
    }

    // Visningsreglene til Skyra matcher ikke bruker/side, eller undersøkelsen finnes ikke – vis ingenting.
    if (surveyStatus === 'unavailable') {
        return null;
    }

    let surveyContent = null;
    if (hasCompletedSurvey) {
        surveyContent = (
            <BodyShort>
                <FormattedMessage id="SkyraSurvey.Takk" />
            </BodyShort>
        );
    } else if (surveyStatus === 'error') {
        surveyContent = (
            <BodyShort>
                <FormattedMessage id="SkyraSurvey.Feil" />
            </BodyShort>
        );
    } else if (surveyStatus === 'loading') {
        surveyContent = (
            <VStack gap="space-8">
                <Skeleton variant="text" />
                <Skeleton variant="rounded" width="100%" height={30} />
                <HStack justify="end">
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
                    <ExpansionCard.Title size="small" as={titleAs}>
                        {resolvedTitle}
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div>
                    {surveyContent}
                    {!hasCompletedSurvey && surveyStatus !== 'error' && (
                        // @ts-expect-error skyra-survey er et custom element
                        <skyra-survey
                            style={{
                                opacity: surveyStatus === 'ready' ? 1 : 0,
                                position: surveyStatus === 'ready' ? 'relative' : 'absolute',
                                pointerEvents: surveyStatus === 'ready' ? 'auto' : 'none',
                            }}
                            slug={slug}
                            inline
                            onReady={() => setSurveyStatus('ready')}
                            onError={() => setSurveyStatus('error')}
                            onUnavailable={() => setSurveyStatus('unavailable')}
                        />
                    )}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
