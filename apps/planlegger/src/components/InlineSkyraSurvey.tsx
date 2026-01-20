import { Box } from '@navikt/ds-react';

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
    return (
        <Box padding="space-16" className="border-ax-neutral-500 border mb-2 ax-border-default rounded-xl">
            {/* @ts-expect-error - skyra-survey er et custom element */}
            <skyra-survey
                className=""
                slug="arbeids-og-velferdsetaten-nav/planlegg-foreldrepenger-inline"
            ></skyra-survey>
        </Box>
    );
};
