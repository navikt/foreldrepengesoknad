import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import AlertStripe from 'nav-frontend-alertstriper';
import Lukknapp, { LukknappProps } from 'nav-frontend-lukknapp';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import BEMHelper from 'common/util/bem';

import './alertstripeWithCloseButton.less';

interface AlertstripeContentProps {
    lukknappProps: Omit<LukknappProps, 'children'>;
    onClose?: () => void;
    errorMessages: React.ReactNode[];
}

const AlertstripeWithCloseButton = ({ lukknappProps, onClose, errorMessages }: AlertstripeContentProps) => {
    const cls = BEMHelper('alertStripeContent');
    return (
        <AlertStripe type="feil">
            <div className={cls.className}>
                {errorMessages.length === 1 && (
                    <Normaltekst className={cls.element('title')}>{errorMessages[0]}</Normaltekst>
                )}
                {errorMessages.length > 1 && (
                    <div className={cls.element('error-list')}>
                        <Element className={cls.element('title')}>
                            <FormattedMessage id="vedlegg.feilmelding.tittel.flereFeil" />
                        </Element>
                        <ul>
                            {errorMessages.map((message: React.ReactNode) => (
                                <li className={cls.element('error-list-element')} key={guid()}>
                                    <Normaltekst>{message}</Normaltekst>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {onClose && <Lukknapp className={cls.element('lukk-knapp')} {...lukknappProps} onClick={onClose} />}
            </div>
        </AlertStripe>
    );
};
export default AlertstripeWithCloseButton;
