import * as React from 'react';
import { TimelineEvent } from 'uttaksplan/components/timeline/types';
import TimelineItem from 'uttaksplan/components/timeline/items/TimelineItem';

export interface Props {
    item: TimelineEvent;
}

const EventItem: React.StatelessComponent<Props> = ({ item }) => (
    <TimelineItem {...item} />
);

export default EventItem;
