import { useState } from 'react';
import bemUtils from '../../utils/bemUtils';
import AvsluttModal from '../avslutt-modal/AvsluttModal';

import './stepFooter.less';
import { Button } from '@navikt/ds-react';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
    useNoTempSavingText?: boolean;
}

function StepFooter({ onAvbrytOgFortsettSenere, onAvbrytOgSlett, useNoTempSavingText }: Props) {
    const [avsluttIsOpen, setAvsluttIsOpen] = useState(false);

    const bem = bemUtils('stepFooter');
    return (
        <>
            <div className={bem.block}>
                <div className={bem.element('divider')} />
                <div className={bem.element('links')}>
                    <AvsluttModal
                        isOpen={avsluttIsOpen}
                        setIsOpen={setAvsluttIsOpen}
                        onAvbrytOgFortsettSenere={onAvbrytOgFortsettSenere}
                        onAvbrytOgSlett={onAvbrytOgSlett}
                        useNoTempSavingText={useNoTempSavingText}
                    />
                    <Button variant="tertiary" onClick={() => setAvsluttIsOpen(true)}>
                        Avslutt
                    </Button>
                </div>
            </div>
        </>
    );
}

export default StepFooter;
