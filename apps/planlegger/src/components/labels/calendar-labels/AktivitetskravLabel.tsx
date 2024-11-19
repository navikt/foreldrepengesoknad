import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import CalendarIconLabel from './CalendarIconLabel';

interface Props {
    utenAktivitetskrav?: boolean;
    isBluePanel?: boolean;
}

const AktivitetskravLabel: FunctionComponent<Props> = ({ utenAktivitetskrav = false, isBluePanel = false }) => {
    return (
        <CalendarIconLabel iconType={isBluePanel ? 'blue' : 'green'}>
            <BodyShort>
                {utenAktivitetskrav && <FormattedMessage id="OversiktSteg.UtenAktivitetskrav" />}
                {!utenAktivitetskrav && <FormattedMessage id="OversiktSteg.MedAktivitetskrav" />}
            </BodyShort>
        </CalendarIconLabel>
    );
};

export default AktivitetskravLabel;
