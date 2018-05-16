import * as React from 'react';
import { TimelineEvent } from 'uttaksplan/components/timeline/timelineTypes';

export interface Props {
    item: TimelineEvent;
}

const EventItem: React.StatelessComponent<Props> = (props) => (
    <div>EventItem</div>
);

export default EventItem;
