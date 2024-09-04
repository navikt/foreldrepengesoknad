import React, { FunctionComponent } from 'react';

import planBemUtils from '../../utils/planBemUtils';
import './infoBlock.less';

export interface InfoBlockProps {
    children: React.ReactNode;
}

const InfoBlock: FunctionComponent<InfoBlockProps> = ({ children }) => {
    const bem = planBemUtils('infoBlock');

    return <div className={bem.block}>{children}</div>;
};

export default InfoBlock;
