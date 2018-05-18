import * as React from 'react';
import {
    TimelineIcon,
    TimelineIconRenderer
} from 'uttaksplan/components/timeline/types';
import BEMHelper from 'uttaksplan/utils/bem';

export interface Props {
    icons?: TimelineIcon[];
    iconRenderer?: TimelineIconRenderer;
}
const BEM = BEMHelper('timelineIcons');

const TimelineIcons: React.StatelessComponent<Props> = ({
    icons,
    iconRenderer
}) =>
    icons && iconRenderer ? (
        <div className={BEM.className}>
            {icons.map((icon, idx) => (
                <span key={icon.key} className={BEM.element('icon')}>
                    {iconRenderer(icon)}
                </span>
            ))}
        </div>
    ) : null;

export default TimelineIcons;
