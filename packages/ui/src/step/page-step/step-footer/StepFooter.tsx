import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Button } from '@navikt/ds-react';

import { AvsluttModal } from './AvsluttModal';
import styles from './stepFooter.module.css';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

export const StepFooter = ({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }: Props) => {
    const [avsluttIsOpen, setAvsluttIsOpen] = useState(false);
    const intl = useIntl();

    return (
        <div className={styles.stepFooter}>
            <div className={styles.divider} />
            <AvsluttModal
                isOpen={avsluttIsOpen}
                setIsOpen={setAvsluttIsOpen}
                onAvbrytOgFortsettSenere={onAvbrytOgFortsettSenere}
                onAvbrytOgSlett={onAvbrytOgSlett}
            />
            <Button variant="tertiary" onClick={() => setAvsluttIsOpen(true)}>
                {intl.formatMessage({ id: 'StepFooter.Avslutt' })}
            </Button>
        </div>
    );
};
