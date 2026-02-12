import { useQuery } from '@tanstack/react-query';
import { statusOptions, søkerinfoOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage } from 'react-intl';

import { Kvittering } from '@navikt/fp-steg-kvittering';

export const KvitteringPage = () => {
    const forsendelseStatus = useQuery({
        ...statusOptions(),
        refetchInterval: (query) => (query.state.data?.status === 'PENDING' ? 1000 : false),
    }).data;

    const søkerinfo = useQuery(søkerinfoOptions()).data;
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);

    return (
        <Kvittering
            forsendelseStatus={forsendelseStatus}
            pageTitle={<FormattedMessage id="søknad.pageheading" />}
            søkerinfo={søkerinfo}
            erEndringssøknad={!!eksisterendeSak}
        />
    );
};
