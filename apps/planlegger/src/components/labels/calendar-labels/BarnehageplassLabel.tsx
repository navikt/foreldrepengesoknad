import { FormattedMessage, useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { OmBarnet } from 'types/Barnet';

import { BodyShort } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { CalendarLabel } from '@navikt/fp-ui';

interface Props {
    barnet: OmBarnet;
}

export const BarnehageplassLabel = ({ barnet }: Props) => {
    const intl = useIntl();

    const barnehageplassdato = barnehagestartDato(barnet);

    return (
        <CalendarLabel color={PeriodeColor.PURPLE}>
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
        </CalendarLabel>
    );
};
