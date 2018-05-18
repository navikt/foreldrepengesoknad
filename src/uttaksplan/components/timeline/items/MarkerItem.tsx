import * as React from 'react';
import {
    TimelineMarker,
    TimelineIconRenderer
} from 'uttaksplan/components/timeline/types';
import BEMHelper from 'uttaksplan/utils/bem';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';

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
        <h1 className={BEM.element('title')}>{item.title}</h1>
        <TimelineIcons icons={item.icons} iconRenderer={iconRenderer} />
        <div className={BEM.element('comment')}>{item.comment}</div>
    </article>
);

export default MarkerItem;
