import * as React from 'react';
import * as classnames from 'classnames';
import Dato from 'uttaksplan/elements/dato/Dato';
import Varighet from 'uttaksplan/components/tidslinje/elementer/Varighet';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from 'uttaksplan/utils/bem';
import {
    TimelineEvent,
    TimelineIconRenderer
} from 'uttaksplan/components/timeline/types';
import TimelineItemLabel from 'uttaksplan/components/timeline/TimelineItemLabel';
import TimelineIcons from 'uttaksplan/components/timeline/TimelineIcons';

export interface Props {
    item: TimelineEvent;
    iconRenderer: TimelineIconRenderer;
}

const BEM = BEMHelper('timelineEventItem');

const EventItem: React.StatelessComponent<Props> = (props) => {
    const { iconRenderer, item } = props;
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

    const renderIcons = icons && icons.length > 0 && iconRenderer;
    return (
        <article className={classnames(BEM.className, BEM.modifier(color))}>
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
            {renderIcons && (
                <div className={BEM.element('icons')}>
                    <TimelineIcons icons={icons} iconRenderer={iconRenderer} />
                </div>
            )}
            <h2 className={BEM.element('title')}>{title}</h2>
            <div className={BEM.element('timespan')}>
                <Dato dato={from} />
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
        </article>
    );
};

export default EventItem;
