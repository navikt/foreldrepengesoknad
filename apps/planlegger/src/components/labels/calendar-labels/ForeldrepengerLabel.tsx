import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { CalendarIconLabel } from './CalendarIconLabel';

export const ForeldrepengerLabel = () => {
    return (
        <CalendarIconLabel iconType="blue">
            <BodyShort>
                <FormattedMessage id="OversiktSteg.ForeldrepengerLabel" />
            </BodyShort>
        </CalendarIconLabel>
    );
};
