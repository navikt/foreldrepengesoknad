import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { Box, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';

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
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const surveyElement = containerRef.current.querySelector('skyra-survey');
        if (!surveyElement) return;

        // Sjekk med intervall om surveyen har fått innhold
        const intervalId = setInterval(() => {
            const hasContent =
                surveyElement.shadowRoot?.childNodes.length ||
                surveyElement.children.length > 0 ||
                surveyElement.childNodes.length > 0;

            if (hasContent) {
                setIsLoaded(true);
                clearInterval(intervalId);
            }
        }, 100);

        // Timeout på 30 sekunder - hvis ikke lastet, vis feilmelding
        const timeout = setTimeout(() => {
            if (!isLoaded) {
                setHasFailed(true);
            }
            clearInterval(intervalId);
        }, 30000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeout);
        };
    }, [isLoaded]);

    // Vis kun surveyen for norsk bokmål og nynorsk
    if (intl.locale !== 'nb' && intl.locale !== 'nn') {
        return null;
    }

    if (hasFailed) {
        return null;
    }

    return (
        <Box padding="space-16" className="border-ax-neutral-500 border mb-6 ax-border-default rounded-xl">
            <div ref={containerRef}>
                {!isLoaded && (
                    <VStack gap="space-8">
                        <Heading as={Skeleton} size="large">
                            Vi ønsker din tilbakemelding
                        </Heading>
                        <Skeleton variant="rounded" width="100%" height={30} />
                        <HStack justify={'end'}>
                            <Skeleton variant="rounded" width="30%" height={50} />
                        </HStack>
                    </VStack>
                )}
                {/* @ts-expect-error - skyra-survey er et custom element */}
                <skyra-survey
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        position: isLoaded ? 'relative' : 'absolute',
                        pointerEvents: isLoaded ? 'auto' : 'none',
                    }}
                    slug="arbeids-og-velferdsetaten-nav/planlegg-foreldrepenger-inline"
                >
                    {/* @ts-expect-error - skyra-survey er et custom element */}
                </skyra-survey>
            </div>
        </Box>
    );
};
