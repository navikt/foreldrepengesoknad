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
    <VStack gap="space-4" data-testid={testId}>
        <Heading size="small" level={headerLevel}>
            {headerText}
        </Heading>
        <Box.New background="brand-blue-moderate" padding="4" borderRadius="large">
            <HStack gap="space-8" wrap={false}>
                <div>
                    {erOppfylt && (
                        <CheckmarkCircleFillIcon
                            height={24}
                            width={24}
                            fontSize="1.5rem"
                            aria-hidden
                            color="var(--ax-bg-success-strong)"
                        />
                    )}
                    {!erOppfylt && <XMarkOctagonFillIcon height={24} width={24} fontSize="1.5rem" aria-hidden />}
                </div>
                <VStack gap="space-8">
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
        </Box.New>
    </VStack>
);
