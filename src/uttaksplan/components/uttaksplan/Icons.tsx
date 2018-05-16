import * as React from 'react';
import { TimelineIcon } from 'uttaksplan/components/timeline/types';
import PlasterIkon from 'uttaksplan/elements/ikoner/Plaster';

export interface Props {
    icon: TimelineIcon;
}

const Icons: React.StatelessComponent<Props> = (props) => <PlasterIkon />;

export default Icons;
