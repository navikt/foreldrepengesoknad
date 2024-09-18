import { FolderFileIcon } from '@navikt/aksel-icons';
import { Link } from 'react-router-dom';

import { HStack, LinkPanel } from '@navikt/ds-react';

import OversiktRoutes from 'app/routes/routes';

const SeDokumenter = () => {
    return (
        <LinkPanel as={Link} to={OversiktRoutes.DOKUMENTER} border={false} className="rounded-lg">
            <HStack gap="4" align="center">
                <FolderFileIcon
                    className="p-2 rounded-[50%] bg-deepblue-100"
                    width={52}
                    height={52}
                    color="#0056B4"
                    aria-hidden={true}
                />
                <LinkPanel.Title as="h2">Dokumenter</LinkPanel.Title>
            </HStack>
        </LinkPanel>
    );
};

export default SeDokumenter;
