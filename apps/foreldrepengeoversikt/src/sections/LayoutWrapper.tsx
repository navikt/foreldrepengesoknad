import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
};
export const LayoutWrapper = ({ children, className }: Props) => {
    return <div className={['ax-md:w-[704px] m-auto w-full', className].filter(Boolean).join(' ')}>{children}</div>;
};
