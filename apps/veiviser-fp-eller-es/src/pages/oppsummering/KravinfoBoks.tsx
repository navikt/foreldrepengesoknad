import { CheckmarkCircleFillIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

interface Props {
    headerText: ReactElement;
    headerLevel?: '1' | '2' | '3' | '4' | '5' | '6';
    boxBodyText: ReactElement;
    erOppfylt: boolean;
    testId?: string;
    jobberINorge?: boolean;
}

export const KravinfoBoks = ({
    headerText,
    headerLevel = '1',
    boxBodyText,
    erOppfylt,
    testId,
    jobberINorge,
}: Props) => (
    <VStack gap="1" data-testid={testId}>
        <Heading size="small" level={headerLevel}>
            {headerText}
        </Heading>
        <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
            <HStack gap="2" wrap={false}>
                <div>
                    {erOppfylt && (
                        <CheckmarkCircleFillIcon height={24} width={24} fontSize="1.5rem" aria-hidden color="#06893A" />
                    )}
                    {!erOppfylt && (
                        <XMarkOctagonFillIcon height={24} width={24} fontSize="1.5rem" aria-hidden fill="#010B18" />
                    )}
                </div>
                <VStack gap="2">
                    <Heading size="xsmall" level="4">
                        {erOppfylt && <FormattedMessage id="KravinfoBoks.DuOppfyllerKravet" />}
                        {!erOppfylt && (
                            <>
                                {jobberINorge !== undefined && jobberINorge === false ? (
                                    <FormattedMessage id="KravinfoBoks.DuIkkeMestSannsynligOppfyllerKravet" />
                                ) : (
                                    <FormattedMessage id="KravinfoBoks.DuIkkeOppfyllerKravet" />
                                )}
                            </>
                        )}
                    </Heading>
                    <BodyShort>{boxBodyText}</BodyShort>
                </VStack>
            </HStack>
        </Box>
    </VStack>
);
