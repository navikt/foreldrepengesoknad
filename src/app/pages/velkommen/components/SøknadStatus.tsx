import React from 'react';
import { useIntl } from 'react-intl';
import { intlUtils } from '@navikt/fp-common';
import EtikettBase from 'nav-frontend-etiketter';

import './søknadStatus.less';
import './wrapper.less';

interface Props {
    sakErFerdigbehandlet: boolean;
}

const SøknadStatusEtikett: React.FunctionComponent<Props> = ({ sakErFerdigbehandlet }) => {
    const intl = useIntl();
    const etikettType = sakErFerdigbehandlet ? 'suksess' : 'fokus';
    const statusTekst = sakErFerdigbehandlet
        ? 'velkommen.sak.status.ferdigBehandlet'
        : 'velkommen.sak.status.underBehandling';
    return (
        <EtikettBase className="blokk-xxxs" type={etikettType}>
            {intlUtils(intl, statusTekst)}
        </EtikettBase>
    );
};

export default SøknadStatusEtikett;
