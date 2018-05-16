import * as React from 'react';
import * as classnames from 'classnames';
import Dato from 'uttaksplan/elements/dato/Dato';
import Varighet from 'uttaksplan/components/tidslinje/elementer/Varighet';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from 'uttaksplan/utils/bem';
import {
    TimelineLabel,
    TimelineIcon,
    TimelineIconRenderer
} from 'uttaksplan/components/timeline/types';
import TimelineItemLabel from 'uttaksplan/components/timeline/TimelineItemLabel';

export type TimelineItemColor = 'blue' | 'purple' | 'green';

export interface Props {
    personName: string;
    title: string;
    from: Date;
    to: Date;
    days: number;
    color?: TimelineItemColor;
    labels?: TimelineLabel[];
    icons?: TimelineIcon[];
    iconRenderer?: TimelineIconRenderer;
}

const BEM = BEMHelper('timelineItem');

const TimelineItem: React.StatelessComponent<Props> = (props) => {
    const {
        title,
        from,
        to,
        personName,
        labels,
        days,
        color = 'blue',
        icons,
        iconRenderer
    } = props;
    return (
        <article className={classnames(BEM.className, BEM.modifier(color))}>
            {icons &&
                iconRenderer && (
                    <div className={BEM.element('icons')}>
                        {icons.map((icon, idx) => (
                            <span
                                key={icon.key}
                                className={BEM.element('icon')}>
                                {iconRenderer(icon)}
                            </span>
                        ))}
                    </div>
                )}
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

export default TimelineItem;
