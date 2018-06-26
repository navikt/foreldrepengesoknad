export type TimelineLabelType = 'suksess' | 'info' | 'advarsel' | 'fokus';

export interface TimelineLabel {
    type: TimelineLabelType;
    text: string;
}

export type TimelineIcon = string;

export type TimelineIconRenderer = (icon: TimelineIcon) => React.ReactNode;

interface TimelineItemInfo {
    title: string;
    description?: string;
}

export enum TimelineItemType {
    'event' = 'event',
    'marker' = 'marker',
    'gap' = 'gap'
}

interface TimelineBaseItem {
    id: string;
    type: TimelineItemType;
    title: string;
    color?: 'blue' | 'purple' | 'green';
    icons?: TimelineIcon[];
    data?: any;
    startDate: Date;
    error?: TimelineItemInfo;
    selected?: boolean;
}

export interface TimelineEvent extends TimelineBaseItem {
    type: TimelineItemType.event;
    personName: string;
    endDate: Date;
    days: number;
    labels?: TimelineLabel[];
    data: any;
}

export interface TimelineGap extends TimelineBaseItem {
    type: TimelineItemType.gap;
    endDate: Date;
    days: number;
    data: any;
    comment?: string;
}

export interface TimelineMarker extends TimelineBaseItem {
    type: TimelineItemType.marker;
    comment?: React.ReactNode;
}

export type TimelineItem = TimelineEvent | TimelineGap | TimelineMarker;

export type TimelineItemColor = 'blue' | 'purple' | 'green';
