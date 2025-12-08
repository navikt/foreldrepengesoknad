import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';

import { ToggleGroup } from '@navikt/ds-react';

export type Visningsmodus = 'liste' | 'kalender';

interface Props {
    setVisningsmodus: Dispatch<SetStateAction<Visningsmodus>>;
}

export const PlanvisningToggle = ({ setVisningsmodus }: Props) => (
    <ToggleGroup
        defaultValue="kalender"
        variant="neutral"
        onChange={(value) => setVisningsmodus(value as Visningsmodus)}
        label={<FormattedMessage id="PlanvisningToggle.velgVisningsmodus" />}
    >
        <ToggleGroup.Item value="kalender">
            <CalendarIcon aria-hidden />
            <FormattedMessage id="PlanvisningToggle.kalender" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="liste">
            <BulletListIcon aria-hidden />
            <FormattedMessage id="PlanvisningToggle.liste" />
        </ToggleGroup.Item>
    </ToggleGroup>
);
