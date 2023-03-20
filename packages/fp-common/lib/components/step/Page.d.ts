import React from 'react';
import './page.less';
export interface PageProps {
    className?: string;
    title: string;
    id?: string;
    ariaLabel?: string;
    topContentRenderer?: () => React.ReactElement<any>;
    children: React.ReactNode;
}
declare const Page: React.FunctionComponent<PageProps>;
export default Page;
