import { useQuery } from '@tanstack/react-query';
import { statusOptions } from 'api/queries';
import { FormattedMessage } from 'react-intl';

import { SkjemaRotLayout } from '@navikt/fp-ui';

export const KvitteringPage = () => {
    const a = useQuery({
        ...statusOptions(),
        refetchInterval: (query) => (query.state.data?.status === 'PENDING' ? 1000 : false),
    }).data;

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>Status: {a?.status}</SkjemaRotLayout>
    );
};
