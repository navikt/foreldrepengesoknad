import * as React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';

import './alertstripeContent.less';

interface AlertstripeContentProps {
    message: string;
    onClose?: () => void;
}

type Props = AlertstripeContentProps;
const AlertstripeContent: React.StatelessComponent<Props> = ({
    message,
    onClose
}) => (
    <div className="alertStripeContent">
        <p>{message}</p>
        {onClose && <Lukknapp type="button" onClick={onClose} hvit={true} />}
    </div>
);
export default AlertstripeContent;
