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
    /** Animation is set to default true if visible is !undefined, unless animated is set to false */
    animated?: boolean;
    /** Size - default m */
    margin?: BlockPadding;
    /** Render function called when content is visible */
    render: () => JSX.Element | undefined;
}

const cls = BEMHelper('block');

const Block: React.StatelessComponent<Props> = ({
    visible,
    margin = 'm',
    animated,
    render = () => null
}) => {
    if (visible === false || !render) {
        return null;
    }
    const content = (
        <div className={classNames(cls.className, cls.modifier(margin))}>
            {render()}
        </div>
    );

    if (visible !== undefined || animated === true) {
        return (
            <Collapse
                springConfig={collapseSpringConfig}
                isOpened={visible === true}
                className={classNames(cls.element('collapse'), {
                    [cls.element('collapse', 'hidden')]: !visible
                })}>
                {content}
            </Collapse>
        );
    }
    return content;
};

export default Block;
