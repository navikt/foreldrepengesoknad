import * as React from 'react';
import Lukknapp, { LukknappProps } from 'nav-frontend-lukknapp';

import AlertStripe, { AlertStripeBaseProps } from 'nav-frontend-alertstriper';

import './alertstripeWithCloseButton.less';

interface AlertstripeContentProps {
    alertStripeProps: AlertStripeBaseProps;
    lukknappProps: LukknappProps;
    onClose?: () => void;
}

const AlertstripeWithCloseButton: React.StatelessComponent<AlertstripeContentProps> = ({
    alertStripeProps,
    lukknappProps,
    onClose
}) => {
    return (
        <AlertStripe {...alertStripeProps}>
            <div className="alertStripeContent">
                {alertStripeProps.children}
                {onClose && <Lukknapp {...lukknappProps} onClick={onClose} />}
            </div>
        </AlertStripe>
    );
};
export default AlertstripeWithCloseButton;
