import { TasklistIcon } from '@navikt/aksel-icons';
import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, HStack, Skeleton, VStack } from '@navikt/ds-react';

import './SkyraSurvey.css';
import { useSkyraSurvey } from './useSkyraSurvey';

export interface SkyraSurveyProps {
    slug: string;
    /** Heading-nivå (h1-h6) for tittelen, slik at ho passar inn i den omkringliggande overskriftsstrukturen. */
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const SkyraSurvey = ({ slug, titleAs = 'h2' }: SkyraSurveyProps) => {
    const intl = useIntl();
    const resolvedTitle = intl.formatMessage({ id: 'SkyraSurvey.Tittel' });
    const [isOpen, setIsOpen] = useState(true);
    const closeCard = useCallback(() => setIsOpen(false), []);
    const {
        erAktiv,
        status: surveyStatus,
        hasCompletedSurvey,
        surveyKey,
        surveyRef,
    } = useSkyraSurvey({
        slug,
        locale: intl.locale,
        onCompleted: closeCard,
    });

    if (intl.locale !== 'nb' && intl.locale !== 'nn') {
        return null;
    }

    if (!erAktiv || surveyStatus === 'unavailable') {
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
                            key={surveyKey}
                            ref={surveyRef}
                            style={{
                                opacity: surveyStatus === 'ready' ? 1 : 0,
                                position: surveyStatus === 'ready' ? 'relative' : 'absolute',
                                pointerEvents: surveyStatus === 'ready' ? 'auto' : 'none',
                            }}
                            slug={slug}
                            inline
                        />
                    )}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
