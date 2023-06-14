import classnames from 'classnames';

import './infoBlock.less';
import { BlockPadding } from 'common/components/block/Block';
import BEMHelper from 'common/util/bem';

export interface Props {
    children: React.ReactNode;
    padding?: BlockPadding;
}

const bem = BEMHelper('infoBlock');

const InfoBlock: React.FunctionComponent<Props> = ({ children, padding = 'xs' }) => (
    <div className={classnames(bem.block, bem.modifier(`pad-${padding}`))}>{children}</div>
);

export default InfoBlock;
