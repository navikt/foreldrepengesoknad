import * as React from 'react';
import KoffertIkon from 'common/components/ikoner/KoffertIkon';
import KalenderIkon from 'common/components/ikoner/KalenderIkon';
import UtbetalingerIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/CashIkon';

interface Props {
    type: OppsummeringIkonType;
    className?: string;
}

export type OppsummeringIkonType = 'koffert' | 'kalender' | 'cash';

const SendSøknadIkon: React.FunctionComponent<Props> = ({ type, className }) => {
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
