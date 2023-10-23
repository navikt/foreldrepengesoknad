import classnames from 'classnames';
import { bemUtils } from '@navikt/fp-common';
import { UttaksplanColor } from '../../types/UttaksplanColor';

import './iconBox.less';

export interface Props {
    color: UttaksplanColor;
    stripes?: boolean;
    children?: React.ReactNode;
}

const IconBox: React.FunctionComponent<Props> = ({ children, color, stripes }) => {
    const bem = bemUtils('iconBox');

    return (
        <div className={classnames(bem.block, bem.modifier(`${color}${stripes ? '--striped' : ''}`))}>{children}</div>
    );
};

export default IconBox;
