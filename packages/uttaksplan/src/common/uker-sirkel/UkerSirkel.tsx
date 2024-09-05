import planBemUtils from '../../utils/planBemUtils';
import Sirkelmaske from '../sirkelmaske/Sirkelmaske';
import AntallUkerKalenderIkon from './antallUkerKalenderIkon/AntallUkerKalenderIkon';
import './ukerSirkel.less';

interface Props {
    uker: number;
}

const UkerSirkel: React.FunctionComponent<Props> = ({ uker }) => {
    const bem = planBemUtils('ukerSirkel');

    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <AntallUkerKalenderIkon uker={uker} />
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default UkerSirkel;
