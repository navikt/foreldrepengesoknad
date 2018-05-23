import * as React from 'react';
import { TimelineMarker } from 'uttaksplan/components/timeline/types';
import BEMHelper from 'uttaksplan/utils/bem';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';
import Dato from 'uttaksplan/elements/dato/Dato';
import { TimelineItemProps } from 'uttaksplan/components/timeline/Timeline';

export interface Props extends TimelineItemProps {
    item: TimelineMarker;
}

const BEM = BEMHelper('timelineMarkerItem');

const MarkerItem: React.StatelessComponent<Props> = ({
    item,
    iconRenderer
}) => (
    <article className={BEM.className}>
        <TimelineIcons icons={item.icons} iconRenderer={iconRenderer} />
        <h1 className={BEM.element('title')}>{item.title}</h1>
        <div className={BEM.element('date')}>
            <Dato dato={item.date} />
        </div>
        <div className={BEM.element('comment')}> {item.comment}</div>
    </article>
);

export default MarkerItem;
