import classNames from 'classnames';
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';

import planBemUtils from '../../utils/planBemUtils';
import './linkButton.less';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    color?: 'default' | 'white';
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const LinkButton: FunctionComponent<LinkButtonProps> = ({ color, className, ...rest }) => {
    const bem = planBemUtils('linkButton');

    return (
        <button
            type="button"
            className={classNames(bem.block, className, color ? `linkButton--${color}` : undefined)}
            {...rest}
        />
    );
};
// eslint-disable-next-line import/no-default-export
export default LinkButton;
