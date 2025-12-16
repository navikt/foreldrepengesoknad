import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-metrics';

export const InfoOmArbeidIUtlandet = () => {
    const intl = useIntl();
    return (
        <ReadMore
            onOpenChange={(open) =>
                loggUmamiEvent({
                    origin: 'svangerskapspengesoknad',
                    eventName: open ? 'readmore åpnet' : 'readmore lukket',
                    eventData: { tittel: 'InfoOmArbeidIUtlandet.apneLabel' },
                })
            }
            header={intl.formatMessage({ id: 'InfoOmArbeidIUtlandet.apneLabel' })}
        >
            <BodyShort>
                <FormattedMessage id="InfoOmArbeidIUtlandet.innhold" />
            </BodyShort>
        </ReadMore>
    );
};
