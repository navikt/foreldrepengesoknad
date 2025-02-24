import planBemUtils from '../../utils/planBemUtils';
import Sirkelmaske from '../sirkelmaske/Sirkelmaske';
import AntallUkerKalenderIkon from './antallUkerKalenderIkon/AntallUkerKalenderIkon';
import './ukerSirkel.less';

interface Props {
    uker: number;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
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

// eslint-disable-next-line import/no-default-export
export default UkerSirkel;
