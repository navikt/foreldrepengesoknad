import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import AvsluttModal from './AvsluttModal';
import './stepFooter.css';

interface Props {
    onAvbrytOgFortsettSenere?: () => void;
    onAvbrytOgSlett?: () => void;
}

const StepFooter: FunctionComponent<Props> = ({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }: Props) => {
    const [avsluttIsOpen, setAvsluttIsOpen] = useState(false);
    const intl = useIntl();

    const bem = bemUtils('stepFooter');
    return (
        <div className={bem.block}>
            <div className={bem.element('divider')} />
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

export default StepFooter;
