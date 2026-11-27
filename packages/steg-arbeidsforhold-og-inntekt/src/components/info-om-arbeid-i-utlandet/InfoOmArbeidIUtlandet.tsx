import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ReadMore } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-observability';

export const InfoOmArbeidIUtlandet = () => {
    const intl = useIntl();
    return (
        <ReadMore
            onOpenChange={(open) =>
                loggUmamiEvent({
                    origin: 'svangerskapspengesoknad',
                    eventName: open ? 'les mer åpnet' : 'les mer lukket',
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
