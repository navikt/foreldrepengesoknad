import { FilesIcon } from '@navikt/aksel-icons';
import { Link } from 'react-router-dom';

import { HStack, LinkPanel } from '@navikt/ds-react';

import OversiktRoutes from 'app/routes/routes';

const EttersendDokumenter = () => {
    return (
        <LinkPanel
            as={Link}
            to={`${OversiktRoutes.DOKUMENTER}/${OversiktRoutes.ETTERSEND}`}
            border={false}
            className="rounded-lg"
        >
            <HStack gap="4" align="center">
                <FilesIcon
                    className="p-2 rounded-[50%] bg-deepblue-100"
                    width={52}
                    height={52}
                    color="#0056B4"
                    aria-hidden={true}
                />
                <LinkPanel.Title as="h2">Ettersend dokumentasjon</LinkPanel.Title>
            </HStack>
        </LinkPanel>
    );
};

export default EttersendDokumenter;
