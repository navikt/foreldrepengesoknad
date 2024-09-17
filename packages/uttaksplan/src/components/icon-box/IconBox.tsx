import classnames from 'classnames';

import { PeriodeColor } from '@navikt/fp-constants';

import planBemUtils from '../../utils/planBemUtils';
import './iconBox.less';

export interface Props {
    color: PeriodeColor;
    stripes?: boolean;
    children?: React.ReactNode;
}

const IconBox: React.FunctionComponent<Props> = ({ children, color, stripes }) => {
    const bem = planBemUtils('iconBox');

    return (
        <div className={classnames(bem.block, bem.modifier(`${color}${stripes ? '--striped' : ''}`))}>{children}</div>
    );
};

export default IconBox;
