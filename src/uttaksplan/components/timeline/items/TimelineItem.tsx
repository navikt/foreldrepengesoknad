import * as React from 'react';
import * as classnames from 'classnames';
import Dato from 'uttaksplan/elements/dato/Dato';

export interface Props {
    personName: string;
    title: string;
    from: Date;
    to: Date;
    duration: string;
    color: 'blue' | 'green';
    icons?: string[];
}

const className = 'timelineEvent';
const cls = {
    className,
    part: (p?: string) => `timelineEvent${p}`
};

const TimelineItem: React.StatelessComponent<Props> = (props) => {
    const { personName, duration, title, from, to, color } = props;
    return (
        <article className={classnames(cls.className, cls.part(color))}>
            <div className={cls.part('__header')}>
                <h1 className={cls.part('__personName')}>{personName}</h1>
                <h1 className={cls.part('__duration')}>{duration}</h1>
            </div>
            <h2>{title}</h2>
            <div className={cls.part('__timespan')}>
                <Dato dato={from} />
                <Dato dato={to} />
            </div>
        </article>
    );
};

export default TimelineItem;
