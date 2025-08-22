import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
};
export const LayoutWrapper = ({ children, className }: Props) => {
    return <div className={classNames('w-full ax-md:w-[704px] m-auto', className)}>{children}</div>;
};
