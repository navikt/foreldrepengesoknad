import classNames from 'classnames';

import { PeriodeColor } from '@navikt/fp-constants';
import { bemUtils } from '@navikt/fp-utils';

import './iconBox.css';

export interface Props {
    children?: React.ReactNode;
    color: PeriodeColor;
    stripes?: boolean;
}

const IconBox: React.FunctionComponent<Props> = ({ children, color }) => {
    const bem = bemUtils('iconBox');
    return <div className={classNames(bem.element('icon'), bem.modifier(`${color}`))}>{children}</div>;
};

export default IconBox;
