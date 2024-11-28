import { FormattedMessage, useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { OmBarnet } from 'types/Barnet';

import { BodyShort } from '@navikt/ds-react';

import { CalendarIconLabel } from './CalendarIconLabel';

interface Props {
    barnet: OmBarnet;
}

export const BarnehageplassLabel = ({ barnet }: Props) => {
    const intl = useIntl();

    const barnehageplassdato = barnehagestartDato(barnet);

    return (
        <CalendarIconLabel iconType="purple">
            <BodyShort>
                <FormattedMessage
                    id="BarnehageplassLabel.Barnehagestartdato"
                    values={{
                        dato: intl.formatDate(barnehageplassdato, {
                            day: '2-digit',
                            month: 'short',
                        }),
                    }}
                />
            </BodyShort>
        </CalendarIconLabel>
    );
};
