import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import intlHelper from '../../utils/intlUtils';
import './page.less';

export interface PageProps {
    className?: string;
    title: string;
    id?: string;
    ariaLabel?: string;
    topContentRenderer?: () => React.ReactElement<any>;
    children: React.ReactNode;
}

const Page: React.FunctionComponent<PageProps> = ({
    ariaLabel,
    id = 'pageMainContent',
    className,
    topContentRenderer,
    children,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const intl = useIntl();

    const ariaLabelToUse = ariaLabel ? intlHelper(intl, 'page.defaultMainRoleLabel') : undefined;

    return (
        <main aria-label={ariaLabelToUse} id={id}>
            {topContentRenderer?.()}
            <div className={`page ${className}`}>{children}</div>
        </main>
    );
};

export default Page;
