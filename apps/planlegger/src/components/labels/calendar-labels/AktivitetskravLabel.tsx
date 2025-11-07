import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { CalendarLabel } from '@navikt/fp-ui';

interface Props {
    utenAktivitetskrav?: boolean;
    isBluePanel?: boolean;
}

export const AktivitetskravLabel = ({ utenAktivitetskrav = false, isBluePanel = false }: Props) => {
    return (
        <CalendarLabel color={isBluePanel ? PeriodeColor.BLUE : PeriodeColor.GREEN}>
            <BodyShort>
                {utenAktivitetskrav && <FormattedMessage id="OversiktSteg.UtenAktivitetskrav" />}
                {!utenAktivitetskrav && <FormattedMessage id="OversiktSteg.MedAktivitetskrav" />}
            </BodyShort>
        </CalendarLabel>
    );
};
