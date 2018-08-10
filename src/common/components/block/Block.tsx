import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';
import BEMHelper from 'common/util/bem';
import { collapseSpringConfig } from 'common/util/animationUtils';

import './block.less';

export type BlockPadding = 'm' | 's' | 'xs' | 'xxs' | 'none';

export interface Props {
    /** Default true */
    visible?: boolean;
    /** Default true */
    animated?: boolean;
    /** Size - default m */
    margin?: BlockPadding;
    /** Render function called when content is visible */
    render: () => JSX.Element | undefined;
}

const cls = BEMHelper('block');

const Block: React.StatelessComponent<Props> = ({
    visible = true,
    animated = true,
    margin = 'm',
    render = () => null
}) => {
    if (!visible || !render) {
        return null;
    }
    const getContent = () => (
        <div className={classNames(cls.className, cls.modifier(margin))}>
            {render()}
        </div>
    );

    if (animated === true) {
        return (
            <Collapse
                springConfig={collapseSpringConfig}
                isOpened={visible === true}
                className={classNames(cls.element('collapse'), {
                    [cls.element('collapse', 'hidden')]: !visible
                })}>
                {visible ? getContent() : <div />}
            </Collapse>
        );
    }
    return getContent();
};

export default Block;
