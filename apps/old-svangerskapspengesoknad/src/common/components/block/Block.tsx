import classNames from 'classnames';
import BEMHelper from 'common/util/bem';
import LabelMedInfobox from '../label-med-infobox/LabelMedInfobox';

import './block.less';

export type BlockPadding = 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'none';

export interface BlockProps {
    header?: {
        title: string;
        info?: string;
        stil?: 'normal' | 'seksjon';
    };
    visible?: boolean;
    animated?: boolean;
    margin?: BlockPadding;
    marginTop?: BlockPadding;
    hasChildBlocks?: boolean;
    align?: 'left' | 'center' | 'right';
    style?: 'info';
    children: React.ReactNode;
}

const cls = BEMHelper('block');

const Block: React.FunctionComponent<BlockProps> = ({
    visible,
    margin = 'm',
    header,
    animated = true,
    children,
    align,
    marginTop,
    hasChildBlocks,
    style,
}) => {
    if (children === undefined || (animated !== true && visible === false)) {
        return null;
    }

    let bottomMargin: BlockPadding;
    if (margin === undefined && marginTop === undefined) {
        bottomMargin = 'l';
    } else if (margin === undefined && marginTop !== undefined) {
        bottomMargin = 'none';
    } else if (margin !== undefined) {
        bottomMargin = margin;
    } else {
        bottomMargin = 'l';
    }

    const contentClass = classNames(cls.block, !hasChildBlocks ? cls.modifier(bottomMargin) : cls.modifier('none'), {
        [cls.modifier(`top-${marginTop}`)]: marginTop,
        [cls.modifier(`align-${align}`)]: align,
        [cls.modifier(`style-${style}`)]: style,
    });

    const content =
        header !== undefined ? (
            <section className={contentClass}>
                <LabelMedInfobox {...header} />
                {children}
            </section>
        ) : (
            <div className={contentClass}>{children}</div>
        );
    return visible === true || visible === undefined ? content : null;
};

export default Block;
