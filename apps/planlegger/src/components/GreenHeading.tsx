import { Box } from '@navikt/ds-react';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

const GreenHeading: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <Box
            background="surface-alt-2-subtle"
            borderRadius="medium medium 0 0"
            padding="4"
            borderWidth="0 0 2"
            borderColor="border-alt-2"
        >
            {children}
        </Box>
    );
};
export default GreenHeading;
