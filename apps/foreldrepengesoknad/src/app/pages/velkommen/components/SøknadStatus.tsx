import React from 'react';
import { useIntl } from 'react-intl';
import { intlUtils } from '@navikt/fp-common';
import { BodyShort, Tag } from '@navikt/ds-react';

import './søknadStatus.less';
import './wrapper.less';

interface Props {
    sakErFerdigbehandlet: boolean;
}

const SøknadStatusEtikett: React.FunctionComponent<Props> = ({ sakErFerdigbehandlet }) => {
    const intl = useIntl();
    const etikettType = sakErFerdigbehandlet ? 'success' : 'warning';
    const statusTekst = sakErFerdigbehandlet
        ? 'velkommen.sak.status.ferdigBehandlet'
        : 'velkommen.sak.status.underBehandling';
    return (
        <Tag className="blokk-xxxs" variant={etikettType}>
            <BodyShort size="small">{intlUtils(intl, statusTekst)} </BodyShort>
        </Tag>
    );
};

export default SøknadStatusEtikett;
