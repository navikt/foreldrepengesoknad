export type TimelineItemType = 'marker' | 'event' | 'gap';

export type TimelineLabelType = 'suksess' | 'info' | 'advarsel' | 'fokus';

export interface TimelineLabel {
    type: TimelineLabelType;
    text: string;
}

export interface TimelineIcon {
    key: string;
}

export type TimelineIconRenderer = (icon: TimelineIcon) => React.ReactNode;

interface TimelineBaseItem {
    type: TimelineItemType;
    title: string;
    color?: 'blue' | 'purple' | 'green';
    icons?: TimelineIcon[];
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
    comment?: React.ReactNode;
}

export interface TimelineGap extends TimelineBaseItem {
    type: 'gap';
    from: Date;
    to: Date;
    comment?: string;
}

export type TimelineItem = TimelineEvent | TimelineGap | TimelineMarker;

export type TimelineItemColor = 'blue' | 'purple' | 'green';
