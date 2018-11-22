import * as React from 'react';

import './infoBlock.less';

export interface Props {
    children: React.ReactNode;
}

const InfoBlock: React.StatelessComponent<Props> = ({ children }) => <div className="infoBlock">{children}</div>;

export default InfoBlock;
