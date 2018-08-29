import * as React from 'react';
import classNames from 'classnames';

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

import './linkButton.less';

const LinkButton: React.StatelessComponent<LinkButtonProps> = (props) => {
    const { className, ...rest } = props;
    return <button type="button" className={classNames('linkButton', className)} {...rest} />;
};
export default LinkButton;
