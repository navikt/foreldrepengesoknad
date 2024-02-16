import { Heading, VStack } from '@navikt/ds-react';

type Props = {
    year: number;
    children: React.ReactNode;
};

const Year: React.FunctionComponent<Props> = ({ year, children }) => {
    return (
        <VStack gap="1">
            <Heading size="small">{year}</Heading>
            <div>{children}</div>
        </VStack>
    );
};
export default Year;
