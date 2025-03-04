import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Button, HGrid } from '@navikt/ds-react';

import { AvsluttModal } from './AvsluttModal';
import { FortsettSenereModal } from './FortsettSenereModal';
import styles from './stepFooter.module.css';

interface Props {
    onAvsluttOgSlett?: () => void;
    onFortsettSenere?: () => void;
}

export const StepFooter = ({ onAvsluttOgSlett, onFortsettSenere }: Props) => {
    const [avsluttIsOpen, setAvsluttIsOpen] = useState(false);
    const [fortsettSenereIsOpen, setFortsettSenereIsOpen] = useState(false);
    const intl = useIntl();

    return (
        <div className={styles.stepFooter}>
            <AvsluttModal isOpen={avsluttIsOpen} setIsOpen={setAvsluttIsOpen} onAvsluttOgSlett={onAvsluttOgSlett} />
            <FortsettSenereModal
                isOpen={fortsettSenereIsOpen}
                setIsOpen={setFortsettSenereIsOpen}
                onFortsettSenere={onFortsettSenere}
            />
            <HGrid columns={2} gap="2">
                <Button variant="tertiary" onClick={() => setAvsluttIsOpen(true)}>
                    {intl.formatMessage({ id: 'StepFooter.Avslutt' })}
                </Button>
                <Button variant="tertiary" onClick={() => setFortsettSenereIsOpen(true)}>
                    {intl.formatMessage({ id: 'StepFooter.ContinueLater' })}
                </Button>
            </HGrid>
        </div>
    );
};
