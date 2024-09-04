import classNames from 'classnames';
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';

import bemUtils from '../../utils/bemUtils';
import './linkButton.less';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    color?: 'default' | 'white';
}

const LinkButton: FunctionComponent<LinkButtonProps> = ({ color, className, ...rest }) => {
    const bem = bemUtils('linkButton');

    return (
        <button
            type="button"
            className={classNames(bem.block, className, color ? `linkButton--${color}` : undefined)}
            {...rest}
        />
    );
};
export default LinkButton;
