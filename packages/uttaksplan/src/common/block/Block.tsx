import React from 'react';

import planBemUtils from '../../utils/planBemUtils';
import './block.less';

type BlockMargin = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'none';

export interface BlockProps {
    margin?: BlockMargin;
    padBottom?: BlockMargin;
    textAlignCenter?: boolean;
    className?: string;
    visible?: boolean;
    children: React.ReactNode;
}

const bem = planBemUtils('block');

const Block: React.FunctionComponent<BlockProps> = ({
    margin,
    padBottom,
    className,
    textAlignCenter,
    visible = true,
    children,
}) => {
    const classNames = bem.classNames(
        bem.block,
        bem.modifierConditional(margin, margin !== undefined),
        bem.modifierConditional(`bottom-${padBottom}`, padBottom !== undefined),
        {
            [bem.modifier('textAlignCenter')]: textAlignCenter,
            [`${className}`]: className !== undefined,
        },
    );

    if (!visible) {
        return null;
    }

    return <div className={classNames}>{children}</div>;
};

export default Block;
