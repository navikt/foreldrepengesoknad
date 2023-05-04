import BEMHelper from 'common/util/bem';

import './datoerInputLayout.less';

interface Props {
    fra: React.ReactNode;
    til?: React.ReactNode;
    fullbredde?: boolean;
}

const bem = BEMHelper('datoerInputLayout');

const DatoerInputLayout: React.FunctionComponent<Props> = ({ fra, til, fullbredde }) => (
    <div className={bem.classNames(bem.block, bem.modifierConditional('fullbredde', fullbredde))}>
        <div className={bem.element('fraDato')}>{fra}</div>
        {til && <div className={bem.element('tilDato')}>{til}</div>}
    </div>
);

export default DatoerInputLayout;
