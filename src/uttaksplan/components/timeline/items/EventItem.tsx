import * as React from 'react';
import * as classnames from 'classnames';
import Varighet from 'uttaksplan/components/tidslinje/elementer/Varighet';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from 'uttaksplan/utils/bem';
import {
    TimelineEvent,
    TimelineItem
} from 'uttaksplan/components/timeline/types';
import TimelineItemLabel from 'uttaksplan/components/timeline/TimelineItemLabel';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';
import { guid } from 'nav-frontend-js-utils';
import TimelineItemMoreLink from 'uttaksplan/components/timeline/items/TimelineItemMoreLink';
import TimelineRange from 'uttaksplan/components/timeline/TimelineRange';
import { TimelineItemProps } from 'uttaksplan/components/timeline/Timeline';

export interface Props extends TimelineItemProps {
    item: TimelineEvent;
    onClick?: (item: TimelineItem) => void;
}

const BEM = BEMHelper('timelineEventItem');

const EventItem: React.StatelessComponent<Props> = (props) => {
    const { iconRenderer, item, onClick } = props;
    const {
        title,
        from,
        to,
        personName,
        labels,
        days,
        color = 'blue',
        icons
    } = item;

    const itemId = guid();
    const isInteractive = onClick !== undefined;

    return (
        <article
            id={itemId}
            className={classnames(BEM.className, BEM.modifier(color), {
                [BEM.modifier('interactive')]: isInteractive
            })}>
            <TimelineIcons icons={icons} iconRenderer={iconRenderer} />
            <h1 className={BEM.element('headerAndTitle')}>
                <strong className={BEM.element('title')}>{title}</strong>
                <div className={BEM.element('header')}>
                    <EtikettLiten
                        className={BEM.element('header__personName')}
                        tag="div">
                        {personName}
                    </EtikettLiten>
                    <EtikettLiten
                        tag="div"
                        className={BEM.element('header__duration')}>
                        <Varighet dager={days} />
                    </EtikettLiten>
                </div>
            </h1>
            <div className={BEM.element('timespan')}>
                <TimelineRange from={from} to={to} />
            </div>
            {labels &&
                labels.length > 0 && (
                    <div className={BEM.element('labels')}>
                        {labels.map((label, idx) => (
                            <TimelineItemLabel key={idx} label={label} />
                        ))}
                    </div>
                )}

            {onClick && (
                <TimelineItemMoreLink
                    itemId={itemId}
                    onClick={() => onClick(item)}
                />
            )}
        </article>
    );
};

export default EventItem;
