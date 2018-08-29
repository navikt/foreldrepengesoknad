import * as React from 'react';
import { TimelineMarker } from 'uttaksplan/components/timeline/types';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';
import { TimelineItemProps } from 'uttaksplan/components/timeline/Timeline';
import FormatertDato from 'common/components/formatert-dato/FormatertDato';
import BEMHelper from 'common/util/bem';

export interface Props extends TimelineItemProps {
    item: TimelineMarker;
}

const BEM = BEMHelper('timelineMarkerItem');

const MarkerItem: React.StatelessComponent<Props> = ({ item, iconRenderer }) => (
    <article className={BEM.className}>
        <TimelineIcons icons={item.icons} iconRenderer={iconRenderer} />
        <h1 className={BEM.element('title')}>{item.title}</h1>
        <div className={BEM.element('date')}>
            <FormatertDato dato={item.startDate} />
        </div>
        <div className={BEM.element('comment')}> {item.comment}</div>
    </article>
);

export default MarkerItem;
