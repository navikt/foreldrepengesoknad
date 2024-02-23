import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-common';

import AvsluttModal from './AvsluttModal';
import './stepFooter.css';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

function StepFooter({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }: Props) {
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
                />
                <Button variant="tertiary" onClick={() => setAvsluttIsOpen(true)}>
                    <FormattedMessage id="StepFooter.Avslutt" />
                </Button>
            </div>
        </>
    );
}

export default StepFooter;
