import { useQuery } from '@tanstack/react-query';
import { statusOptions } from 'app-data/queries';
import { FormattedMessage } from 'react-intl';

import { Kvittering } from '@navikt/fp-steg-kvittering';

export const KvitteringPage = () => {
    const forsendelseStatus = useQuery({
        ...statusOptions(),
        refetchInterval: (query) => (query.state.data?.status === 'PENDING' ? 1000 : false),
    }).data;

    return (
        <Kvittering forsendelseStatus={forsendelseStatus} pageTitle={<FormattedMessage id="søknad.pageheading" />} />
    );
};
