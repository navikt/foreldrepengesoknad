import KalenderIkon from './KalenderIkon';
import UtbetalingerIkon from './UtbetalingerIkon';

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
