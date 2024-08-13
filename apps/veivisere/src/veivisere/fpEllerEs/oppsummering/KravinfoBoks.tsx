import { CheckmarkCircleFillIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

interface Props {
    headerText: ReactElement;
    boxBodyText: ReactElement;
    erOppfylt: boolean;
}

const KravinfoBoks: React.FunctionComponent<Props> = ({ headerText, boxBodyText, erOppfylt }) => (
    <VStack gap="1">
        <Heading size="small">{headerText}</Heading>
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
                    <Heading size="xsmall">
                        {erOppfylt && <FormattedMessage id="KravinfoBoks.DuOppfyllerKravet" />}
                        {!erOppfylt && <FormattedMessage id="KravinfoBoks.DuIkkeOppfyllerKravet" />}
                    </Heading>
                    <BodyShort>{boxBodyText}</BodyShort>
                </VStack>
            </HStack>
        </Box>
    </VStack>
);

export default KravinfoBoks;
