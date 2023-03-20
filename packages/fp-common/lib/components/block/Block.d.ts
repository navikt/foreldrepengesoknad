import React from 'react';
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
declare const Block: React.FunctionComponent<BlockProps>;
export default Block;
