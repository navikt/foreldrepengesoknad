import * as React from 'react';

import './timeline.less';
import {
    TimelineBaseItem,
    TimelineEvent,
    TimelineMarker,
    TimelineGap
} from 'uttaksplan/components/timeline/types';
import EventItem from 'uttaksplan/components/timeline/items/EventItem';
import MarkerItem from 'uttaksplan/components/timeline/items/MarkerItem';
import GapItem from 'uttaksplan/components/timeline/items/GapItem';

export interface Props {
    items: TimelineBaseItem[];
    navnForelder1: string;
    navnForelder2: string;
}

class Timeline extends React.Component<Props, {}> {
    renderItem(item: TimelineBaseItem) {
        switch (item.type) {
            case 'event':
                return <EventItem item={item as TimelineEvent} />;
            case 'marker':
                return <MarkerItem item={item as TimelineMarker} />;
            default:
                return <GapItem item={item as TimelineGap} />;
        }
    }
    render() {
        const { items } = this.props;
        return (
            <section className="timeline">
                {items.map((item, idx) => (
                    <div className="timeline__itemWrapper" key={idx}>
                        {this.renderItem(item)}
                    </div>
                ))}
            </section>
        );
    }
}
export default Timeline;
