import { FormattedMessage } from 'react-intl';
import { Alert, BodyShort, Button, Label } from '@navikt/ds-react';
import { guid } from '@navikt/fp-common';

import BEMHelper from 'common/util/bem';

import './alertstripeWithCloseButton.less';

interface AlertstripeContentProps {
    onClose?: () => void;
    errorMessages: React.ReactNode[];
}

const AlertstripeWithCloseButton = ({ onClose, errorMessages }: AlertstripeContentProps) => {
    const cls = BEMHelper('alertStripeContent');
    return (
        <Alert variant="warning">
            <div className={cls.block}>
                {errorMessages.length === 1 && (
                    <BodyShort className={cls.element('title')}>{errorMessages[0]}</BodyShort>
                )}
                {errorMessages.length > 1 && (
                    <div className={cls.element('error-list')}>
                        <Label className={cls.element('title')}>
                            <FormattedMessage id="vedlegg.feilmelding.tittel.flereFeil" />
                        </Label>
                        <ul>
                            {errorMessages.map((message: React.ReactNode) => (
                                <li className={cls.element('error-list-element')} key={guid()}>
                                    <BodyShort>{message}</BodyShort>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {onClose && <Button variant="secondary" className={cls.element('lukk-knapp')} onClick={onClose} />}
            </div>
        </Alert>
    );
};
export default AlertstripeWithCloseButton;
