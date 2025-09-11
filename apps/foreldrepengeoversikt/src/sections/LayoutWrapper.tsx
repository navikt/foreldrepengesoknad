import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
};
export const LayoutWrapper = ({ children, className }: Props) => {
    return <div className={classNames('ax-md:w-[704px] m-auto w-full', className)}>{children}</div>;
};
