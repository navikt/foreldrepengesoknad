import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import CalendarIconLabel from './CalendarIconLabel';

interface Props {
    søkerTekst: string;
    isBluePanel?: boolean;
}

const AntallUkerFpLabel: FunctionComponent<Props> = ({ søkerTekst, isBluePanel = false }) => {
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

export default AntallUkerFpLabel;
