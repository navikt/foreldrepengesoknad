import { CalendarIcon } from '@navikt/aksel-icons';
import { forwardRef } from 'react';

import { HStack, Heading } from '@navikt/ds-react';

import { GreenHeading, IconCircleWrapper, Page } from '@navikt/fp-ui';

interface Props {
    label: string;
    children: React.ReactElement | React.ReactElement[];
}

const VeilederPage = forwardRef<HTMLDivElement, Props>(({ label, children }, ref) => (
    <>
        <Page
            header={
                <GreenHeading>
                    <HStack gap="5" align="center">
                        <IconCircleWrapper color="darkGreen" size="xl">
                            <CalendarIcon height={28} width={28} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <Heading size="large">{label}</Heading>
                    </HStack>
                </GreenHeading>
            }
        >
            {children}
        </Page>
        <div ref={ref} />
    </>
));

export default VeilederPage;
