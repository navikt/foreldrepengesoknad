import React, { FunctionComponent } from 'react';

import planBemUtils from '../../utils/planBemUtils';
import './infoBlock.less';

interface InfoBlockProps {
    children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const InfoBlock: FunctionComponent<InfoBlockProps> = ({ children }) => {
    const bem = planBemUtils('infoBlock');

    return <div className={bem.block}>{children}</div>;
};

// eslint-disable-next-line import/no-default-export
export default InfoBlock;
