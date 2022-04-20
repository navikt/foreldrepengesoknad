import * as React from 'react';
import classNames from 'classnames';

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: 'default' | 'white';
}

import './linkButton.less';
import BEMHelper from 'common/util/bem';

const bem = BEMHelper('linkButton');

const LinkButton: React.FunctionComponent<LinkButtonProps> = (props) => {
    const { className, color, ...rest } = props;
    return (
        <button
            type="button"
            className={classNames(bem.block, className, color ? `linkButton--${color}` : undefined)}
            {...rest}
        />
    );
};
export default LinkButton;
