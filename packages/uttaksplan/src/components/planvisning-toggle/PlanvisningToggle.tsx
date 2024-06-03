import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';

import { ToggleGroup } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-common';

import './planvisning-toggle.css';

export type Visningsmodus = 'liste' | 'kalender';

interface Props {
    setVisningsmodus: Dispatch<SetStateAction<string>>;
}

const PlanvisningToggle: FunctionComponent<Props> = ({ setVisningsmodus }) => {
    const bem = bemUtils('planvisning-toggle');
    return (
        <ToggleGroup
            className={bem.block}
            defaultValue="liste"
            variant="neutral"
            onChange={(value) => setVisningsmodus(value as Visningsmodus)}
        >
            <ToggleGroup.Item value="liste">
                <BulletListIcon aria-hidden />
                <FormattedMessage id="liste" />
            </ToggleGroup.Item>
            <ToggleGroup.Item value="kalender">
                <CalendarIcon aria-hidden />
                <FormattedMessage id="kalender" />
            </ToggleGroup.Item>
        </ToggleGroup>
    );
};
export default PlanvisningToggle;
