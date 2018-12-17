import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/util/bem';
import Infoboks from 'common/components/infoboks/Infoboks';

import './block.less';

export type BlockPadding = 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'none';

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
    if (children === undefined || (animated !== true && visible === false)) {
        return null;
    }
    const contentClass = classNames(cls.className, !hasChildBlocks ? cls.modifier(margin) : cls.modifier('none'));
    const content =
        header !== undefined ? (
            <section className={contentClass}>
                <div className="heading">
                    <h1 className={`typo-element ${cls.element('title')}`}>{header.title}</h1>
                    {header.info && <Infoboks tekst={header.info} contentFullWidth={true} />}
                </div>
                {children}
            </section>
        ) : (
            <div className={contentClass}>{children}</div>
        );
    return visible === true || visible === undefined ? content : null;
};

export default Block;
