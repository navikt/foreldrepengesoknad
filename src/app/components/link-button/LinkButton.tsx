import * as React from 'react';
import classNames from 'classnames';

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: 'default' | 'white';
}

import './linkButton.less';

const LinkButton: React.StatelessComponent<LinkButtonProps> = (props) => {
    const { className, color, ...rest } = props;
    return (
        <button
            type="button"
            className={classNames('linkButton', className, color ? `linkButton--${color}` : undefined)}
            {...rest}
        />
    );
};
export default LinkButton;
