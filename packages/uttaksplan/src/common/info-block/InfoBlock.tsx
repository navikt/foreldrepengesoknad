import React, { FunctionComponent } from 'react';

import bemUtils from '../../utils/bemUtils';
import './infoBlock.less';

export interface InfoBlockProps {
    children: React.ReactNode;
}

const InfoBlock: FunctionComponent<InfoBlockProps> = ({ children }) => {
    const bem = bemUtils('infoBlock');

    return <div className={bem.block}>{children}</div>;
};

export default InfoBlock;
