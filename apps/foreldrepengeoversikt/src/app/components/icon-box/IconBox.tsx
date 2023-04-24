import './iconBox.css';
import { bemUtils } from '@navikt/fp-common';
import { UttaksplanColor } from 'app/types/UttaksplanColor';
import classNames from 'classnames';

export interface Props {
    children?: React.ReactNode;
    color: UttaksplanColor;
    stripes?: boolean;
}

const IconBox: React.FunctionComponent<Props> = ({ children, color }) => {
    const bem = bemUtils('iconBox');
    return <div className={classNames(bem.element('icon'), bem.modifier(`${color}`))}>{children}</div>;
};

export default IconBox;
