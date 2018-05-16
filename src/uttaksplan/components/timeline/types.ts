export type TimelineItemType = 'marker' | 'event' | 'gap';

export type TimelineLabelType = 'suksess' | 'info' | 'advarsel' | 'fokus';

export interface TimelineLabel {
    type: TimelineLabelType;
    text: string;
}

export interface TimelineIcon {
    key: string;
}

interface TimelineBaseItem {
    type: TimelineItemType;
    title: string;
    icon?: TimelineIcon[];
    color?: 'blue' | 'purple' | 'green';
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
