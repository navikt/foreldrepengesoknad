import React, { CSSProperties } from 'react';
import { bemUtils } from '@navikt/fp-common';
import { UttaksplanHexColor } from 'uttaksplan/types/UttaksplanHexColor';

import './sirkelmaske.less';

interface Props {
    aktiv?: boolean;
    farge?: UttaksplanHexColor;
    diameter: string;
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
