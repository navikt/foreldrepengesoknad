import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import CalendarIconLabel from './CalendarIconLabel';

const ForeldrepengerLabel: FunctionComponent = () => {
    return (
        <CalendarIconLabel iconType="blue">
            <BodyShort>
                <FormattedMessage id="OversiktSteg.ForeldrepengerLabel" />
            </BodyShort>
        </CalendarIconLabel>
    );
};

export default ForeldrepengerLabel;
