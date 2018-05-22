import * as React from 'react';
import * as classnames from 'classnames';
import Dato from 'uttaksplan/elements/dato/Dato';
import Varighet from 'uttaksplan/components/tidslinje/elementer/Varighet';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from 'uttaksplan/utils/bem';
import {
    TimelineEvent,
    TimelineIconRenderer,
    TimelineItem
} from 'uttaksplan/components/timeline/types';
import TimelineItemLabel from 'uttaksplan/components/timeline/TimelineItemLabel';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';
import { guid } from 'nav-frontend-js-utils';
import TimelineItemMoreLink from 'uttaksplan/components/timeline/items/TimelineItemMoreLink';

export interface Props {
    item: TimelineEvent;
    iconRenderer: TimelineIconRenderer;
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

    return (
        <article
            className={classnames(BEM.className, BEM.modifier(color), {
                [BEM.modifier('interactive')]: onClick !== undefined
            })}>
            <div id={itemId}>
                <div className={BEM.element('header')}>
                    <EtikettLiten
                        className={BEM.element('header__personName')}
                        tag="h1">
                        {personName}
                    </EtikettLiten>
                    <EtikettLiten
                        tag="div"
                        className={BEM.element('header__duration')}>
                        <Varighet dager={days} />
                    </EtikettLiten>
                </div>
                <TimelineIcons icons={icons} iconRenderer={iconRenderer} />
                <h2 className={BEM.element('title')}>{title}</h2>
                <div className={BEM.element('timespan')}>
                    <Dato dato={from} />
                    {' - '}
                    <Dato dato={to} />
                </div>
                {labels &&
                    labels.length > 0 && (
                        <div className={BEM.element('labels')}>
                            {labels.map((label, idx) => (
                                <TimelineItemLabel key={idx} label={label} />
                            ))}
                        </div>
                    )}
            </div>
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
