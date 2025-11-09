import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { CalendarLabel } from '@navikt/fp-ui';

interface Props {
    utenAktivitetskrav?: boolean;
    isBluePanel?: boolean;
}

export const AktivitetskravLabel = ({ utenAktivitetskrav = false, isBluePanel = false }: Props) => {
    return (
        <CalendarLabel color={isBluePanel ? 'BLUE' : 'GREEN'}>
            <BodyShort>
                {utenAktivitetskrav && <FormattedMessage id="OversiktSteg.UtenAktivitetskrav" />}
                {!utenAktivitetskrav && <FormattedMessage id="OversiktSteg.MedAktivitetskrav" />}
            </BodyShort>
        </CalendarLabel>
    );
};
