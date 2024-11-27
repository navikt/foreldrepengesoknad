import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import './page.css';

interface PageProps {
    className?: string;
    id?: string;
    ariaLabel?: string;
    topContentRenderer?: () => React.ReactElement<any>;
    children: React.ReactNode;
}

export const Page = ({ ariaLabel, id = 'pageMainContent', className, topContentRenderer, children }: PageProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const intl = useIntl();

    const ariaLabelToUse = ariaLabel ? intl.formatMessage({ id: 'Page.DefaultMainRoleLabel' }) : undefined;

    return (
        <main aria-label={ariaLabelToUse} id={id}>
            {topContentRenderer?.()}
            <div className={`page ${className}`}>{children}</div>
        </main>
    );
};
