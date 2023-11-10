import { HStack, LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import OversiktRoutes from 'app/routes/routes';
import './ettersend-dokumenter.css';
import { Link } from 'react-router-dom';
import { FilesIcon } from '@navikt/aksel-icons';

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
                <FilesIcon className={bem.element('icon')} width={52} height={52} color="#0056B4" />
                <LinkPanel.Title as="h2" className={bem.element('link')}>
                    Ettersend dokumentasjon
                </LinkPanel.Title>
            </HStack>
        </LinkPanel>
    );
};

export default EttersendDokumenter;
