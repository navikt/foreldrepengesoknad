import * as React from 'react';

import './dev.less';

interface Props {}

const DevBlock: React.StatelessComponent<Props> = (props) => <div className="dev">{props.children}</div>;

export default DevBlock;
