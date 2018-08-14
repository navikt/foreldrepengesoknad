import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';
// import { Element } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import { collapseSpringConfig } from 'common/util/animationUtils';

import './block.less';

export type BlockPadding = 'm' | 's' | 'xs' | 'xxs' | 'none';

export interface BlockProps {
    title?: string;
    /** Default true */
    visible?: boolean;
    /** Animation is set to default true if visible is !undefined, unless animated is set to false */
    animated?: boolean;
    /** Size - default m */
    margin?: BlockPadding;
    /** If Block contains child Block. If so, it disables animation */
    hasChildBlocks?: boolean;
    /** Render function called when content is visible */
    render: () => JSX.Element | undefined;
}

const cls = BEMHelper('block');

const Block: React.StatelessComponent<BlockProps> = ({
    visible,
    margin = 'm',
    animated,
    title,
    hasChildBlocks,
    render = () => null
}) => {
    if (visible === false || !render) {
        return null;
    }
    const contentClass = classNames(cls.className, cls.modifier(margin));
    const content =
        title !== undefined ? (
            <section className={contentClass}>
                <h1 className={`typo-element ${cls.element('title')}`}>
                    {title}
                </h1>
                {render()}
            </section>
        ) : (
            <div className={contentClass}>{render()}</div>
        );

    if (
        (visible !== undefined || animated === true) &&
        hasChildBlocks !== true
    ) {
        return (
            <Collapse
                springConfig={collapseSpringConfig}
                isOpened={visible === true}
                hasNestedCollapse={hasChildBlocks}
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
