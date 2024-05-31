import { forwardRef } from 'react';

import { Heading } from '@navikt/ds-react';

import { GreenHeading, Page } from '@navikt/fp-ui';

interface Props {
    label: string;
    children: React.ReactElement | React.ReactElement[];
}

const VeilederPage = forwardRef<HTMLDivElement, Props>(({ label, children }, ref) => (
    <>
        <Page
            header={
                <GreenHeading>
                    <Heading size="large">{label}</Heading>
                </GreenHeading>
            }
        >
            {children}
        </Page>
        <div ref={ref} />
    </>
));

export default VeilederPage;
