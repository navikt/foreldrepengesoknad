export type TimelineItemType = 'marker' | 'event' | 'gap';

export interface TimelineLabel {
    title: string;
    description?: string;
    onClick?: () => void;
}

export interface TimelineIcon {
    key: string;
}

interface TimelineBaseItem {
    type: TimelineItemType;
    title: string;
    icon?: TimelineIcon[];
    /** Default blue */
    color?: 'blue' | 'purple';
}

export interface TimelineEvent extends TimelineBaseItem {
    type: 'event';
    personName: string;
    from: Date;
    to: Date;
    days: number;
    labels?: TimelineLabel[];
}

export interface TimelineMarker extends TimelineBaseItem {
    type: 'marker';
    date: Date;
    comment?: string;
}

export interface TimelineGap extends TimelineBaseItem {
    type: 'gap';
    from: Date;
    to: Date;
    comment?: string;
}

export type TimelineItem = TimelineEvent | TimelineGap | TimelineMarker;
