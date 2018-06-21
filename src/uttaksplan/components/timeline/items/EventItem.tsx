import * as React from 'react';
import * as classnames from 'classnames';
import { EtikettLiten } from 'nav-frontend-typografi';
import {
    TimelineEvent,
    TimelineItem
} from 'uttaksplan/components/timeline/types';
import TimelineItemLabel from 'uttaksplan/components/timeline/TimelineItemLabel';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';
import { guid } from 'nav-frontend-js-utils';
import TimelineItemMoreLink from 'uttaksplan/components/timeline/items/TimelineItemMoreLink';
import {
    TimelineItemProps,
    RangeRenderer,
    DurationRenderer
} from 'uttaksplan/components/timeline/Timeline';
import BEMHelper from 'common/util/bem';
import AdvarselIkon from 'uttaksplan/components/uttaksplanIkon/ikoner/AdvarselIkon';

export interface Props extends TimelineItemProps {
    item: TimelineEvent;
    rangeRenderer: RangeRenderer;
    durationRenderer: DurationRenderer;
    onClick?: (item: TimelineItem) => void;
}

const BEM = BEMHelper('timelineEventItem');

const EventItem: React.StatelessComponent<Props> = (props) => {
    const {
        iconRenderer,
        rangeRenderer,
        durationRenderer,
        item,
        onClick,
        mode
    } = props;
    const {
        startDate,
        endDate,
        personName,
        labels,
        days,
        color = 'blue',
        icons,
        error
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
                <strong className={BEM.element('title')}>{personName}</strong>
                <div className={BEM.element('header')}>
                    <EtikettLiten
                        tag="div"
                        className={BEM.element('header__duration')}>
                        {durationRenderer(days)}
                    </EtikettLiten>
                </div>
            </h1>
            <div className={BEM.element('timespan')}>
                {rangeRenderer(startDate, endDate)}
                {error ? (
                    <span
                        className={BEM.element('timespan__error')}
                        aria-label={error.title}
                        title={error.title}>
                        <AdvarselIkon type="feil" title={error.title} />
                    </span>
                ) : null}
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
            {mode === 'edit' && <div>Whoooo</div>}
        </article>
    );
};

export default EventItem;
