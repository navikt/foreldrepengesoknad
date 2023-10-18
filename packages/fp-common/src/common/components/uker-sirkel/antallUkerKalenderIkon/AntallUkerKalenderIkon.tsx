import bemUtils from 'common/utils/bemUtils';
import KalenderBakgrunnIkon from 'common/assets/kalender-bakgrunn-ikon/KalenderBakgrunnIkon';

import './antallUkerKalenderIkon.less';

interface Props {
    uker: number;
}

const AntallUkerKalenderIkon: React.FunctionComponent<Props> = ({ uker }) => {
    const bem = bemUtils('antallUkerKalenderIkon');
    return (
        <div className={bem.classNames(bem.block, bem.modifierConditional('over99', uker > 99))}>
            <div className={bem.element('ikon')}>
                <KalenderBakgrunnIkon />
            </div>
            <div className={bem.element('uker')}>{uker}</div>
        </div>
    );
};

export default AntallUkerKalenderIkon;
