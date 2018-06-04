import * as React from 'react';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';
import {
    TimelineItemProps,
    RangeRenderer,
    DurationRenderer
} from 'uttaksplan/components/timeline/Timeline';
import {
    TimelineGap,
    TimelineItem
} from 'uttaksplan/components/timeline/types';
import TimelineItemMoreLink from 'uttaksplan/components/timeline/items/TimelineItemMoreLink';
import { guid } from 'nav-frontend-js-utils';
import BEMHelper from 'common/util/bem';

export interface Props extends TimelineItemProps {
    item: TimelineGap;
    rangeRenderer: RangeRenderer;
    durationRenderer: DurationRenderer;
    onClick?: (item: TimelineItem) => void;
}

const BEM = BEMHelper('timelineGapItem');

const GapItem: React.StatelessComponent<Props> = ({
    item,
    durationRenderer,
    iconRenderer,
    onClick
}) => {
    const itemId = guid();
    return (
        <article className={BEM.className}>
            <TimelineIcons icons={item.icons} iconRenderer={iconRenderer} />
            <h1 className={BEM.element('title')}>{item.title}</h1>
            <div className={BEM.element('duration')}>
                {durationRenderer(item.days)}
            </div>
            <div className={BEM.element('comment')}> {item.comment}</div>
            {onClick && (
                <TimelineItemMoreLink
                    itemId={itemId}
                    onClick={() => onClick(item)}
                />
            )}
        </article>
    );
};

export default GapItem;
