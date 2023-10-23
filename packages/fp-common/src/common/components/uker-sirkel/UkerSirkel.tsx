import AntallUkerKalenderIkon from './antallUkerKalenderIkon/AntallUkerKalenderIkon';
import Sirkelmaske from '../sirkelmaske/Sirkelmaske';
import bemUtils from '../../utils/bemUtils';

import './ukerSirkel.less';

interface Props {
    uker: number;
}

const UkerSirkel: React.FunctionComponent<Props> = ({ uker }) => {
    const bem = bemUtils('ukerSirkel');

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
