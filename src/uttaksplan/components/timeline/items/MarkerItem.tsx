import * as React from 'react';
import { TimelineMarker } from 'uttaksplan/components/timeline/timelineTypes';

export interface Props {
    item: TimelineMarker;
}

const MarkerItem: React.StatelessComponent<Props> = (props) => (
    <div>MarkerItem</div>
);

export default MarkerItem;
