import classnames from 'classnames';

import { PeriodColor } from '../../components/stønadskonto-ikon/StønadskontoIkon';
import planBemUtils from '../../utils/planBemUtils';
import './iconBox.less';

interface Props {
    color: PeriodColor;
    stripes?: boolean;
    children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const IconBox: React.FunctionComponent<Props> = ({ children, color, stripes }) => {
    const bem = planBemUtils('iconBox');

    return (
        <div className={classnames(bem.block, bem.modifier(`${color}${stripes ? '--striped' : ''}`))}>{children}</div>
    );
};
// eslint-disable-next-line import/no-default-export
export default IconBox;
