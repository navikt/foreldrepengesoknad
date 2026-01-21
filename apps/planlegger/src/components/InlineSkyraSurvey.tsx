import { useEffect, useState } from 'react';

import { Box, HStack, Heading, Skeleton } from '@navikt/ds-react';

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
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        // Vis skeleton i 2 sekunder, deretter vis surveyen
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            padding="space-16"
            className="border-ax-neutral-500 border mb-6 ax-border-default rounded-xl ax-drop-shadow-ax-accent-500"
        >
            {showSkeleton && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Heading as={Skeleton} size="large">
                        Vi ønsker din tilbakemelding
                    </Heading>
                    <Skeleton variant="rounded" width="100%" height={30} />
                    <HStack justify={'end'}>
                        <Skeleton variant="rounded" width="30%" height={50} />
                    </HStack>
                </div>
            )}
            {/* @ts-expect-error - skyra-survey er et custom element */}
            <skyra-survey
                style={{ display: showSkeleton ? 'none' : 'block' }}
                slug="arbeids-og-velferdsetaten-nav/planlegg-foreldrepenger-inline"
            ></skyra-survey>
        </Box>
    );
};
