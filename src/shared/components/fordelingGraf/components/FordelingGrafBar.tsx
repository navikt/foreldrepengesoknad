import * as React from 'react';
import { FordelingGrafData } from '../types';
import GrafDeltOmsorg from './GrafDeltOmsorg';
import GrafAleneomsorg from './GrafAleneomsorg';

interface Props {
    fordeling: FordelingGrafData;
}

const FordelingGrafBar: React.FunctionComponent<Props> = ({ fordeling }) => {
    switch (fordeling.type) {
        case 'deltOmsorg':
            return <GrafDeltOmsorg {...fordeling} />;
        case 'ikkeDeltOmsorg':
            return <GrafAleneomsorg {...fordeling} />;
        default:
            return null;
    }
};

export default FordelingGrafBar;
