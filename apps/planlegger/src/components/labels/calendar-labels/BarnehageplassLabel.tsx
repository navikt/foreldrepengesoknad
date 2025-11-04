import { useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { OmBarnet } from 'types/Barnet';

import { Chips } from '@navikt/ds-react';

interface Props {
    barnet: OmBarnet;
}

export const BarnehageplassLabel = ({ barnet }: Props) => {
    const intl = useIntl();

    const barnehageplassdato = barnehagestartDato(barnet);

    return (
        <Chips.Toggle>
            {intl.formatMessage(
                { id: 'BarnehageplassLabel.Barnehagestartdato' },
                { dato: intl.formatDate(barnehageplassdato, { day: '2-digit', month: 'short' }) },
            )}
        </Chips.Toggle>
    );
};
