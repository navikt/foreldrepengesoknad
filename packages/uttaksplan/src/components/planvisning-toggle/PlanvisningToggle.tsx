import { BulletListIcon, CalendarIcon } from '@navikt/aksel-icons';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useIntl } from 'react-intl';

import { ToggleGroup } from '@navikt/ds-react';

import { bemUtils, intlUtils } from '@navikt/fp-common';

import './planvisning-toggle.css';

interface Props {
    setVisningsmodus: Dispatch<SetStateAction<string>>;
}

const PlanvisningToggle: FunctionComponent<Props> = ({ setVisningsmodus }) => {
    const intl = useIntl();
    const bem = bemUtils('planvisning-toggle');
    return (
        <ToggleGroup
            className={bem.block}
            defaultValue="liste"
            variant="neutral"
            onChange={(value) => setVisningsmodus(value)}
        >
            <ToggleGroup.Item value="liste">
                <BulletListIcon aria-hidden />
                {intlUtils(intl, 'liste')}
            </ToggleGroup.Item>
            <ToggleGroup.Item value="kalender">
                <CalendarIcon aria-hidden />
                {intlUtils(intl, 'kalender')}
            </ToggleGroup.Item>
        </ToggleGroup>
    );
};
export default PlanvisningToggle;
