import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { CalendarIconLabel } from './CalendarIconLabel';

interface Props {
    utenAktivitetskrav?: boolean;
    isBluePanel?: boolean;
}

export const AktivitetskravLabel = ({ utenAktivitetskrav = false, isBluePanel = false }: Props) => {
    return (
        <CalendarIconLabel iconType={isBluePanel ? 'blue' : 'green'}>
            <BodyShort>
                {utenAktivitetskrav && <FormattedMessage id="OversiktSteg.UtenAktivitetskrav" />}
                {!utenAktivitetskrav && <FormattedMessage id="OversiktSteg.MedAktivitetskrav" />}
            </BodyShort>
        </CalendarIconLabel>
    );
};
