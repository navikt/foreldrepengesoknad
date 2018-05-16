import * as React from 'react';
import {
    TimelineEvent,
    TimelineIconRenderer
} from 'uttaksplan/components/timeline/types';
import TimelineItem from 'uttaksplan/components/timeline/items/TimelineItem';

export interface Props {
    item: TimelineEvent;
    iconRenderer: TimelineIconRenderer;
}

const EventItem: React.StatelessComponent<Props> = ({ item, iconRenderer }) => (
    <TimelineItem {...item} iconRenderer={iconRenderer} />
);

export default EventItem;
