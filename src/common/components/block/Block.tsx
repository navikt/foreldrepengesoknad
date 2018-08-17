import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

import BEMHelper from 'common/util/bem';
import { collapseSpringConfig } from 'common/util/animationUtils';

import Infoboks from 'common/components/infoboks/Infoboks';

import './block.less';

export type BlockPadding = 'm' | 's' | 'xs' | 'xxs' | 'none';

export interface BlockProps {
    /** Default true */
    header?: {
        title: string;
        info?: string;
    };
    visible?: boolean;
    /** Animation is set to default true if visible is !undefined, unless animated is set to false */
    animated?: boolean;
    /** Size - default m */
    margin?: BlockPadding;
    /** If Block contains child Block. If so, it disables animation */
    hasChildBlocks?: boolean;
    /** content */
    children: React.ReactNode;
}

const cls = BEMHelper('block');

const Block: React.StatelessComponent<BlockProps> = ({
    visible,
    margin = 'm',
    header,
    animated = true,
    children,
    hasChildBlocks
}) => {
    if (children === undefined) {
        return null;
    }
    const contentClass = classNames(cls.className, cls.modifier(margin));
    const content =
        header !== undefined ? (
            <section className={contentClass}>
                <div className="heading">
                    <h1 className={`typo-element ${cls.element('title')}`}>
                        {header.title}
                    </h1>
                    {header.info && <Infoboks tekst={header.info} />}
                </div>
                {children}
            </section>
        ) : (
            <div className={contentClass}>{children}</div>
        );
    const isOpened = visible !== false;
    if (animated === true) {
        return (
            <Collapse
                springConfig={collapseSpringConfig}
                isOpened={isOpened}
                hasNestedCollapse={hasChildBlocks}
                className={cls.element('collapse')}>
                {visible !== false ? content : <div />}
            </Collapse>
        );
    }
    return content;
};

export default Block;
