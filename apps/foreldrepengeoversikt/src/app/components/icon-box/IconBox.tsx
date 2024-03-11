import classNames from 'classnames';

import { bemUtils } from '@navikt/fp-utils';

import { UttaksplanColor } from 'app/types/UttaksplanColor';

import './iconBox.css';

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
