import * as React from 'react';
import {
    TimelineMarker,
    TimelineIconRenderer
} from 'uttaksplan/components/timeline/types';
import BEMHelper from 'uttaksplan/utils/bem';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';
import Dato from 'uttaksplan/elements/dato/Dato';

export interface Props {
    item: TimelineMarker;
    iconRenderer: TimelineIconRenderer;
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
