import { ReactNode } from 'react';

interface Props {
    header: ReactNode;
    children: React.ReactElement | React.ReactElement[];
}

export const Page = ({ header, children }: Props) => {
    return (
        <div className="bg-ax-neutral-200 pt-4 pb-4 max-[768px]:flex max-[768px]:flex-1 max-[768px]:flex-col max-[768px]:pt-0">
            <div className="bg-ax-bg-default mx-auto max-w-[704px] rounded-t-[8px] max-[768px]:m-0 max-[768px]:w-full max-[768px]:max-w-none">
                {header}
            </div>
            <div
                className={
                    'bg-ax-bg-default mx-auto max-w-[704px] rounded-b-[8px] p-8 max-[768px]:m-0 max-[768px]:flex max-[768px]:max-w-none ' +
                    'max-[768px]:flex-1 max-[768px]:flex-col max-[768px]:rounded-none max-[768px]:px-[1rem] max-[768px]:py-[1.5rem]'
                }
            >
                {children}
            </div>
        </div>
    );
};
