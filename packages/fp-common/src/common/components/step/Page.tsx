import useDocumentTitle from '../../utils/useDocumentTitle';
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
    title,
    className,
    topContentRenderer,
    children,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useDocumentTitle(title);

    const intl = useIntl();

    const ariaLabelToUse = ariaLabel ? intlHelper(intl, 'page.defaultMainRoleLabel') : undefined;

    return (
        <div role="main" aria-label={ariaLabelToUse} id={id}>
            {topContentRenderer && topContentRenderer()}
            <div className={`page ${className}`}>{children}</div>
        </div>
    );
};

export default Page;
