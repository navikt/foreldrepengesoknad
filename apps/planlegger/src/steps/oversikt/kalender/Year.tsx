import { HStack, Heading, VStack } from '@navikt/ds-react';

type Props = {
    year: number;
    children: React.ReactNode;
};

const Year: React.FunctionComponent<Props> = ({ year, children }) => {
    return (
        <VStack gap="1">
            <Heading size="small">{year}</Heading>
            <HStack gap="10">{children}</HStack>
        </VStack>
    );
};
export default Year;
