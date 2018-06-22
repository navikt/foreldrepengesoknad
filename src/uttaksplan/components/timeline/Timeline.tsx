import * as React from 'react';
import FlipMove from 'react-flip-move';
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

export type RangeRenderer = (from: Date, to: Date) => React.ReactNode;
export type DurationRenderer = (days: number) => React.ReactNode;
export type FormRenderer = (item: TimelineItem) => React.ReactNode;

export interface TimelineItemProps {
    iconRenderer: TimelineIconRenderer;
    onItemClick?: (item: TimelineItem) => void;
    formRenderer?: FormRenderer;
    mode?: 'view' | 'edit' | 'disabled';
}

export interface Props extends TimelineItemProps {
    items: TimelineItem[];
    rangeRenderer: RangeRenderer;
    durationRenderer: DurationRenderer;
    editItem?: any;
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
                        durationRenderer={this.props.durationRenderer}
                        rangeRenderer={this.props.rangeRenderer}
                        formRenderer={this.props.formRenderer}
                        mode={
                            !this.props.editItem
                                ? 'view'
                                : this.props.editItem === item.data
                                    ? 'edit'
                                    : 'disabled'
                        }
                    />
                );
            case 'marker':
                return (
                    <MarkerItem
                        item={item as TimelineMarker}
                        iconRenderer={this.props.iconRenderer}
                    />
                );
            case 'gap':
                return (
                    <GapItem
                        item={item as TimelineGap}
                        iconRenderer={this.props.iconRenderer}
                        durationRenderer={this.props.durationRenderer}
                        rangeRenderer={this.props.rangeRenderer}
                        onClick={this.props.onItemClick}
                    />
                );
            default:
                return <div>Unknown item</div>;
        }
    }
    render() {
        const { items } = this.props;
        return (
            <ol className="timeline">
                <FlipMove
                    typeName={null}
                    // staggerDurationBy={30}
                    duration={350}
                    enterAnimation="accordionVertical"
                    leaveAnimation="accordionVertical"
                    maintainContainerHeight={false}>
                    {items.map((item, idx) => (
                        <li
                            className="timeline__itemWrapper"
                            key={`${item.id || idx}`}>
                            {this.renderItem(item)}
                        </li>
                    ))}
                </FlipMove>
            </ol>
        );
    }
}
export default Timeline;
