import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';

import { Button } from '@navikt/ds-react';

interface Props {
    erMinimert: boolean;
    setErMinimert: (erMinimert: boolean) => void;
    kontrollerer: string;
}

export const MinimerPanelKnapp = ({ erMinimert, setErMinimert, kontrollerer }: Props) => {
    const intl = useIntl();

    return (
        <Button
            type="button"
            variant="tertiary-neutral"
            size="small"
            className="w-full"
            aria-label={
                erMinimert
                    ? intl.formatMessage({ id: 'RedigeringPanel.Maksimer' })
                    : intl.formatMessage({ id: 'RedigeringPanel.Minimer' })
            }
            aria-expanded={!erMinimert}
            aria-controls={kontrollerer}
            icon={erMinimert ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
            onClick={() => setErMinimert(!erMinimert)}
        />
    );
};
