import * as React from 'react';
import { LabelWithInfo } from '@navikt/sif-common-formik/lib';
import classNames from 'classnames';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
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
    screenOnly?: boolean;
}

const cls = BEMHelper('block');

const Block: React.FunctionComponent<BlockProps> = ({
    visible,
    margin = 'm',
    header,
    animated = true,
    children,
    hasChildBlocks,
    screenOnly,
}) => {
    if (children === undefined || (animated !== true && visible === false)) {
        return null;
    }
    const contentClass = classNames(
        cls.block,
        !hasChildBlocks ? cls.modifier(margin) : cls.modifier('none'),
        screenOnly ? 'no-print' : undefined
    );
    const content =
        header !== undefined ? (
            <section className={contentClass}>
                <Element tag="h3" className="heading">
                    <LabelWithInfo info={header.info}>{header.title}</LabelWithInfo>
                </Element>
                {children}
            </section>
        ) : (
            <div className={contentClass}>{children}</div>
        );
    return visible === true || visible === undefined ? content : null;
};

export default Block;
