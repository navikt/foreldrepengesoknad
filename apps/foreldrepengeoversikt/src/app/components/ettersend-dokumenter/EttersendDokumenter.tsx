import { FilesIcon } from '@navikt/aksel-icons';
import { Link } from 'react-router-dom';

import { HStack, LinkPanel } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import OversiktRoutes from 'app/routes/routes';

import './ettersend-dokumenter.css';

const EttersendDokumenter = () => {
    const bem = bemUtils('ettersend-dokumenter');
    return (
        <LinkPanel
            as={Link}
            to={`${OversiktRoutes.DOKUMENTER}/${OversiktRoutes.ETTERSEND}`}
            border={false}
            className={bem.element('linkPanel')}
        >
            <HStack gap="1">
                <FilesIcon className={bem.element('icon')} width={52} height={52} color="#0056B4" aria-hidden={true} />
                <LinkPanel.Title as="h2" className={bem.element('link')}>
                    Ettersend dokumentasjon
                </LinkPanel.Title>
            </HStack>
        </LinkPanel>
    );
};

export default EttersendDokumenter;
