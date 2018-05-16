import * as React from 'react';
import { TimelineGap } from 'uttaksplan/components/timeline/timelineTypes';

export interface Props {
    item: TimelineGap;
}

const GapItem: React.StatelessComponent<Props> = (props) => <div>Gap</div>;

export default GapItem;
