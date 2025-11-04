import { useIntl } from 'react-intl';

import { Chips } from '@navikt/ds-react';

interface Props {
    utenAktivitetskrav?: boolean;
    isBluePanel?: boolean;
}

export const AktivitetskravLabel = ({ utenAktivitetskrav = false }: Props) => {
    const intl = useIntl();

    const getTekst = () => {
        if (utenAktivitetskrav) {
            return intl.formatMessage({ id: 'OversiktSteg.UtenAktivitetskrav' });
        }

        return intl.formatMessage({ id: 'OversiktSteg.MedAktivitetskrav' });
    };

    return <Chips.Toggle>{getTekst()}</Chips.Toggle>;
};
