import { HStack, LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import OversiktRoutes from 'app/routes/routes';

import { Link } from 'react-router-dom';

import './se-dokumenter.css';
import { FolderFileIcon } from '@navikt/aksel-icons';

const SeDokumenter = () => {
    const bem = bemUtils('se-dokumenter');

    return (
        <LinkPanel as={Link} to={OversiktRoutes.DOKUMENTER} border={false} className={bem.element('linkPanel')}>
            <HStack gap="1">
                <FolderFileIcon className={bem.element('icon')} width={52} height={52} color="#0056B4" />
                <LinkPanel.Title className={bem.element('link')} as="h2">
                    <div className={bem.block}>Dokumenter</div>
                </LinkPanel.Title>
            </HStack>
        </LinkPanel>
    );
};

export default SeDokumenter;