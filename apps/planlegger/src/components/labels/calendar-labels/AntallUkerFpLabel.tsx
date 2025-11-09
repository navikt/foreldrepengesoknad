import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { CalendarLabel } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface Props {
    søkerTekst: string;
    isBluePanel?: boolean;
}

export const AntallUkerFpLabel = ({ søkerTekst, isBluePanel }: Props) => {
    return (
        <CalendarLabel color={isBluePanel ? 'BLUE' : 'GREEN'}>
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
