import * as React from 'react';

import {
    TimelineEvent,
    TimelineMarker,
    TimelineGap,
    TimelineItem,
    TimelineIconRenderer
} from 'uttaksplan/components/timeline/types';
import EventItem from 'uttaksplan/components/timeline/items/EventItem';
import MarkerItem from 'uttaksplan/components/timeline/items/MarkerItem';
import GapItem from 'uttaksplan/components/timeline/items/GapItem';

import './timeline.less';

export interface TimelineItemProps {
    iconRenderer: TimelineIconRenderer;
    onItemClick?: (item: TimelineItem) => void;
}

export interface Props extends TimelineItemProps {
    items: TimelineItem[];
    navnForelder1: string;
    navnForelder2: string;
}

class Timeline extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }
    renderItem(item: TimelineItem) {
        switch (item.type) {
            case 'event':
                return (
                    <EventItem
                        item={item as TimelineEvent}
                        iconRenderer={this.props.iconRenderer}
                        onClick={this.props.onItemClick}
                    />
                );
            case 'marker':
                return (
                    <MarkerItem
                        item={item as TimelineMarker}
                        iconRenderer={this.props.iconRenderer}
                    />
                );
            default:
                return <GapItem item={item as TimelineGap} />;
        }
    }
    render() {
        const { items } = this.props;
        return (
            <ol className="timeline">
                {items.map((item, idx) => (
                    <li className="timeline__itemWrapper" key={idx}>
                        {this.renderItem(item)}
                    </li>
                ))}
            </ol>
        );
    }
}
export default Timeline;
