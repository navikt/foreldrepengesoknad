import { Box } from '@navikt/ds-react';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

const GreenPanel: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <Box background="surface-alt-2-moderate" borderRadius="medium" padding="4">
            {children}
        </Box>
    );
};
export default GreenPanel;
