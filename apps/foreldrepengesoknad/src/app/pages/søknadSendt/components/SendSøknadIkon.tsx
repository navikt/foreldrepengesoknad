import React, { FunctionComponent } from 'react';
import UtbetalingerIkon from 'app/assets/CashIkon';
import KalenderIkon from 'app/assets/KalenderIkon';
import KoffertIkon from 'app/assets/KoffertIkon';

interface Props {
    type: OppsummeringIkonType;
    className?: string;
}

export type OppsummeringIkonType = 'koffert' | 'kalender' | 'cash';

const SendSøknadIkon: FunctionComponent<Props> = ({ type, className }) => {
    switch (type) {
        case 'cash':
            return <UtbetalingerIkon className={className} width={48} height={48} />;
        case 'koffert':
            return <KoffertIkon className={className} width={48} height={48} />;
        case 'kalender':
            return <KalenderIkon className={className} width={48} height={48} />;
        default:
            return null;
    }
};
export default SendSøknadIkon;
