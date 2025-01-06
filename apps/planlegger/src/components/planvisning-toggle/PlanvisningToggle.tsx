import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';

import { ToggleGroup } from '@navikt/ds-react';

import './planvisning-toggle.css';

export type Visningsmodus = 'liste' | 'kalender';

interface Props {
    setVisningsmodus: Dispatch<SetStateAction<Visningsmodus>>;
}

export const PlanvisningToggle = ({ setVisningsmodus }: Props) => {
    const onChangeHandler = (value: Visningsmodus) => {
        setVisningsmodus(value);
    };

    return (
        <ToggleGroup
            defaultValue="kalender"
            variant="neutral"
            onChange={(value) => onChangeHandler(value as Visningsmodus)}
        >
            <ToggleGroup.Item value="kalender">
                <CalendarIcon aria-hidden />
                <FormattedMessage id="Kalender" />
            </ToggleGroup.Item>
            <ToggleGroup.Item value="liste">
                <BulletListIcon aria-hidden />
                <FormattedMessage id="Liste" />
            </ToggleGroup.Item>
        </ToggleGroup>
    );
};
