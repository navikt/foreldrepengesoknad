import { CSSProperties } from 'react';

import { UttaksplanHexColor } from '@navikt/fp-common';

import planBemUtils from '../../utils/planBemUtils';
import './sirkelmaske.less';

interface Props {
    aktiv?: boolean;
    farge?: UttaksplanHexColor;
    diameter: string;
    children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const Sirkelmaske: React.FunctionComponent<Props> = ({ farge, diameter, aktiv = true, children }) => {
    const bem = planBemUtils('sirkelmaske');
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

// eslint-disable-next-line import/no-default-export
export default Sirkelmaske;
