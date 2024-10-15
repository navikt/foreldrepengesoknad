import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { OmBarnet } from 'types/Barnet';

import { BodyShort } from '@navikt/ds-react';

import CalendarIconLabel from './CalendarIconLabel';

interface Props {
    barnet: OmBarnet;
}

const BarnehageplassLabel: FunctionComponent<Props> = ({ barnet }) => {
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
export default BarnehageplassLabel;
