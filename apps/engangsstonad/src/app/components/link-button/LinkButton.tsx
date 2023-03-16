import * as React from 'react';
import classNames from 'classnames';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

import './linkButton.less';

const LinkButton: React.FunctionComponent<Props> = (props) => {
    const { className, ...rest } = props;
    return <button type="button" className={classNames('linkButton', className)} {...rest} />;
};
export default LinkButton;
