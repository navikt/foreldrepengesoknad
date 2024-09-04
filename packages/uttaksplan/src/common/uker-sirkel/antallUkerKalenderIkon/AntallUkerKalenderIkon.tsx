import KalenderBakgrunnIkon from '../../../common/kalender-bakgrunn-ikon/KalenderBakgrunnIkon';
import planBemUtils from '../../../utils/planBemUtils';
import './antallUkerKalenderIkon.less';

interface Props {
    uker: number;
}

const AntallUkerKalenderIkon: React.FunctionComponent<Props> = ({ uker }) => {
    const bem = planBemUtils('antallUkerKalenderIkon');
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
