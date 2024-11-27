import { Heading } from '@navikt/ds-react';

import { Banner } from './banner/Banner';

interface StepBannerProps {
    text: string;
    level?: '1' | '2' | '3';
}

export const StepBanner = ({ text, level = '1' }: StepBannerProps) => (
    <Banner size="small">
        <Heading size="large" level={level}>
            {text}
        </Heading>
    </Banner>
);
