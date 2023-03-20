import React from 'react';
interface BackLinkProps {
    className?: string;
    href: string;
    ariaLabel?: string;
    onClick?: (href: string, event: React.SyntheticEvent) => void;
}
declare const BackLink: React.FunctionComponent<BackLinkProps>;
export default BackLink;
