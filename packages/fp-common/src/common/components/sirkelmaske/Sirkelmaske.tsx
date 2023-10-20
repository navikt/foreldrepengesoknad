import { CSSProperties } from 'react';

import { UttaksplanHexColor } from '../../types';
import bemUtils from '../../utils/bemUtils';

import './sirkelmaske.less';

interface Props {
    aktiv?: boolean;
    farge?: UttaksplanHexColor;
    diameter: string;
    children?: React.ReactNode;
}

const Sirkelmaske: React.FunctionComponent<Props> = ({ farge, diameter, aktiv = true, children }) => {
    const bem = bemUtils('sirkelmaske');
    const style: Partial<CSSProperties> = {
        backgroundColor: farge,
    };

    if (diameter) {
        style.width = diameter;
        style.height = diameter;
    }

    return (
        <div className={bem.classNames(bem.block, bem.modifierConditional('inaktiv', aktiv === false))} style={style}>
            <div className={bem.element('content')}>{children}</div>
        </div>
    );
};

export default Sirkelmaske;
