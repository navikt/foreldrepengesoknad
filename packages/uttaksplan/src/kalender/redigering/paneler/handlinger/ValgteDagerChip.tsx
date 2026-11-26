import { useIntl } from 'react-intl';

import { Chips } from '@navikt/ds-react';

import { getVarighetString } from '../../../../utils/dateUtils';
import { useKalenderRedigeringContext } from '../../context/KalenderRedigeringContext';
import { finnAntallDager } from '../../utils/kalenderPeriodeUtils';

export const ValgteDagerChip = () => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder, setValgtePerioder } = useKalenderRedigeringContext();

    return (
        <Chips size="small">
            <Chips.Removable onDelete={() => setValgtePerioder([])}>
                {intl.formatMessage(
                    { id: 'RedigeringPanel.ValgteDager' },
                    {
                        varighet: getVarighetString(finnAntallDager(sammenslåtteValgtePerioder), intl),
                    },
                )}
            </Chips.Removable>
        </Chips>
    );
};
