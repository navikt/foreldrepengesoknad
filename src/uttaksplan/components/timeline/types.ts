export type TimelineLabelType = 'suksess' | 'info' | 'advarsel' | 'fokus';

export interface TimelineLabel {
    type: TimelineLabelType;
    text: string;
}

export type TimelineIcon = string;

export type TimelineIconRenderer = (icon: TimelineIcon) => React.ReactNode;

interface TimelineBaseItem {
    type: TimelineItemType;
    title: string;
    color?: 'blue' | 'purple' | 'green';
    icons?: TimelineIcon[];
    data?: any;
}

export enum TimelineItemType {
    'event' = 'event',
    'marker' = 'marker',
    'gap' = 'gap'
}
export interface TimelineEvent extends TimelineBaseItem {
    type: TimelineItemType.event;
    personName: string;
    from: Date;
    to: Date;
    days: number;
    labels?: TimelineLabel[];
    data: any;
}

export interface TimelineMarker extends TimelineBaseItem {
    type: TimelineItemType.marker;
    date: Date;
    comment?: React.ReactNode;
}

export interface TimelineGap extends TimelineBaseItem {
    type: TimelineItemType.gap;
    from: Date;
    to: Date;
    comment?: string;
}

export type TimelineItem = TimelineEvent | TimelineGap | TimelineMarker;

export type TimelineItemColor = 'blue' | 'purple' | 'green';
