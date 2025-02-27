import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

import { AvsluttModal } from './AvsluttModal';
import { FortsettSenereModal } from './FortsettSenereModal';
import styles from './stepFooter.module.css';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

export const StepFooter = ({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }: Props) => {
    const [avsluttIsOpen, setAvsluttIsOpen] = useState(false);
    const [fortsettSenereIsOpen, setFortsettSenereIsOpen] = useState(false);
    const intl = useIntl();

    return (
        <div className={styles.stepFooter}>
            <AvsluttModal
                isOpen={avsluttIsOpen}
                setIsOpen={setAvsluttIsOpen}
                onAvbrytOgFortsettSenere={onAvbrytOgFortsettSenere}
                onAvbrytOgSlett={onAvbrytOgSlett}
            />
            <FortsettSenereModal
                isOpen={fortsettSenereIsOpen}
                setIsOpen={setFortsettSenereIsOpen}
                onFortsettSenere={onAvbrytOgFortsettSenere}
            />
            <HStack justify="space-between" style={{ width: '100%' }}>
                <HStack style={{ width: '50%', justifyContent: 'flex-end' }}>
                    <Button variant="tertiary" onClick={() => setAvsluttIsOpen(true)}>
                        {intl.formatMessage({ id: 'StepFooter.Avslutt' })}
                    </Button>
                </HStack>
                <HStack style={{ width: '50%' }}>
                    <Button variant="tertiary" onClick={() => setFortsettSenereIsOpen(true)}>
                        {intl.formatMessage({ id: 'StepFooter.ContinueLater' })}
                    </Button>
                </HStack>
            </HStack>
        </div>
    );
};
