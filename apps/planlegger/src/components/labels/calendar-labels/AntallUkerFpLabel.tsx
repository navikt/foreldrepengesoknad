import { useIntl } from 'react-intl';

import { Chips } from '@navikt/ds-react';

import { CalendarLabel } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface Props {
    søkerTekst: string;
    isBluePanel?: boolean;
}

export const AntallUkerFpLabel = ({ søkerTekst }: Props) => {
    const intl = useIntl();

    return (
        <Chips.Toggle className="bg-black">
            {intl.formatMessage({ id: 'OversiktSteg.UkerForeldrepenger' }, { hvem: capitalizeFirstLetter(søkerTekst) })}
        </Chips.Toggle>
    );
};
