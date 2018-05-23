import * as React from 'react';

export interface Props {
    itemId: string;
    onClick: () => void;
}

const TimelineItemMoreLink: React.StatelessComponent<Props> = ({
    itemId,
    onClick
}) => (
    <a
        className={'timelineItemMoreLink'}
        aria-labelledby={itemId}
        href={`#${itemId}`}
        onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
            evt.stopPropagation();
            evt.preventDefault();
            onClick();
        }}
    />
);

export default TimelineItemMoreLink;
