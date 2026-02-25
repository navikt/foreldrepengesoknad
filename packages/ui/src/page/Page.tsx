import { ReactNode } from 'react';

interface Props {
    header: ReactNode;
    children: React.ReactElement | React.ReactElement[];
}

// TODO (TOR) Ta i bruk Page-komponenten til Aksel (Evt SkjemaRotLayout)
export const Page = ({ header, children }: Props) => {
    return (
        <div className="bg-ax-neutral-200 pt-4 pb-4 max-[1024px]:flex max-[1024px]:flex-1 max-[1024px]:flex-col max-[1024px]:pt-0">
            <div className="bg-ax-bg-default mx-auto max-w-[1004px] rounded-t-[8px] max-[1024px]:m-0 max-[1024px]:w-full max-[1024px]:max-w-none">
                {header}
            </div>
            <div
                className={
                    'bg-ax-bg-default mx-auto max-w-[1004px] rounded-b-[8px] p-8 max-[1024px]:m-0 max-[1024px]:flex max-[1024px]:max-w-none ' +
                    'max-[1024px]:flex-1 max-[1024px]:flex-col max-[1024px]:rounded-none max-[1024px]:px-[1rem] max-[1024px]:py-[1.5rem]'
                }
            >
                {children}
            </div>
        </div>
    );
};
