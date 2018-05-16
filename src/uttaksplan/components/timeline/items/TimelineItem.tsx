import * as React from 'react';
import * as classnames from 'classnames';
import Dato from 'uttaksplan/elements/dato/Dato';
import Varighet from 'uttaksplan/components/tidslinje/elementer/Varighet';
import { EtikettLiten } from 'nav-frontend-typografi';

export type TimelineItemColor = 'blue' | 'purple';

export interface Props {
    personName: string;
    title: string;
    from: Date;
    to: Date;
    days: number;
    color?: TimelineItemColor;
    icons?: string[];
}

const componentBaseClassName = 'timelineItem';
const BEM = {
    className: componentBaseClassName,
    element: (p?: string) => `${componentBaseClassName}__${p}`,
    modifier: (p?: string) => `${componentBaseClassName}--${p}`
};

const TimelineItem: React.StatelessComponent<Props> = (props) => {
    const { title, from, to, personName, days, color = 'blue' } = props;
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
            <h2 className={BEM.element('title')}>{title}</h2>
            <div className={BEM.element('timespan')}>
                <Dato dato={from} />
                <Dato dato={to} />
            </div>
        </article>
    );
};

export default TimelineItem;
