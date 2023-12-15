import { useState } from 'react';
import { Button } from '@navikt/ds-react';
import bemUtils from '../../utils/bemUtils';
import AvsluttModal from '../avslutt-modal/AvsluttModal';

import './stepFooter.less';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
    supportsTempSaving?: boolean;
}

function StepFooter({ onAvbrytOgFortsettSenere, onAvbrytOgSlett, supportsTempSaving }: Props) {
    const [avsluttIsOpen, setAvsluttIsOpen] = useState(false);

    const bem = bemUtils('stepFooter');
    return (
        <>
            <div className={bem.block}>
                <div className={bem.element('divider')} />
                <AvsluttModal
                    isOpen={avsluttIsOpen}
                    setIsOpen={setAvsluttIsOpen}
                    onAvbrytOgFortsettSenere={onAvbrytOgFortsettSenere}
                    onAvbrytOgSlett={onAvbrytOgSlett}
                    supportsTempSaving={supportsTempSaving}
                />
                <Button variant="tertiary" onClick={() => setAvsluttIsOpen(true)}>
                    Avslutt
                </Button>
            </div>
        </>
    );
}

export default StepFooter;
