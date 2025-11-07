import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { PeriodeColor } from '@navikt/fp-constants';
import { CalendarLabel } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface Props {
    søkerTekst: string;
    isBluePanel?: boolean;
}

export const AntallUkerFpLabel = ({ søkerTekst, isBluePanel }: Props) => {
    return (
        <CalendarLabel color={isBluePanel ? PeriodeColor.BLUE : PeriodeColor.GREEN}>
            <BodyShort>
                <FormattedMessage
                    id="OversiktSteg.UkerForeldrepenger"
                    values={{
                        hvem: capitalizeFirstLetter(søkerTekst),
                    }}
                />
            </BodyShort>
        </CalendarLabel>
    );
};
