import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { CalendarIconLabel } from './CalendarIconLabel';

interface Props {
    søkerTekst: string;
    isBluePanel?: boolean;
}

export const AntallUkerFpLabel = ({ søkerTekst, isBluePanel = false }: Props) => {
    return (
        <CalendarIconLabel iconType={isBluePanel ? 'blue' : 'green'}>
            <BodyShort>
                <FormattedMessage
                    id="OversiktSteg.UkerForeldrepenger"
                    values={{
                        hvem: capitalizeFirstLetter(søkerTekst),
                    }}
                />
            </BodyShort>
        </CalendarIconLabel>
    );
};
