import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';

import { UtvidIkonKnapp } from './UtvidIkonKnapp';

type Props = {
    erMinimert: boolean;
    setErMinimert: (erMinimert: boolean) => void;
};

export const MinimerRedigeringspanelKnapp = ({ erMinimert, setErMinimert }: Props) => {
    const intl = useIntl();
    const Ikon = erMinimert ? ChevronUpIcon : ChevronDownIcon;

    return (
        <UtvidIkonKnapp
            ikon={<Ikon aria-hidden height={24} width={24} />}
            label={intl.formatMessage({ id: 'RedigeringPanel.Redigeringspanel' })}
            erUtvidet={!erMinimert}
            onClick={() => setErMinimert(!erMinimert)}
        />
    );
};
