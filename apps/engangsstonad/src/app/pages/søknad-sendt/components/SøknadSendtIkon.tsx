import * as React from 'react';
import KalenderIkon from '../assets/KalenderIkon';
import UtbetalingerIkon from '../assets/UtbetalingerIkon';

interface Props {
    type: OppsummeringIkonType;
    className?: string;
}

export type OppsummeringIkonType = 'kalender' | 'cash';

const SøknadSendtIkon: React.FunctionComponent<Props> = ({ type, className }) => {
    switch (type) {
        case 'cash':
            return <UtbetalingerIkon className={className} width={48} height={48} />;
        case 'kalender':
            return <KalenderIkon className={className} width={48} height={48} />;
        default:
            return null;
    }
};
export default SøknadSendtIkon;
