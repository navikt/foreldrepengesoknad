import React, { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { bemUtils } from '@navikt/fp-common';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    color?: 'default' | 'white';
}

import './linkButton.less';

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
