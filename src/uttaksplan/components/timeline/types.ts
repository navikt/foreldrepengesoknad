export type TimelineItemType = 'marker' | 'event' | 'gap';

export interface TimelineLabel {
    title: string;
    description?: string;
    onClick?: () => void;
}

export interface TimelineIcon {
    key: string;
}

export interface TimelineBaseItem {
    type: TimelineItemType;
    title: string;
    from: Date;
    to: Date;
    icon?: TimelineIcon[];
    color: 'blue' | 'green';
}

export interface TimelineEvent extends TimelineBaseItem {
    type: 'event';
    labels?: TimelineLabel[];
}

export interface TimelineMarker extends TimelineBaseItem {
    type: 'marker';
    comment?: string;
}

export interface TimelineGap extends TimelineBaseItem {
    type: 'gap';
    comment?: string;
}

export type TimelineItem = TimelineEvent | TimelineGap | TimelineMarker;
