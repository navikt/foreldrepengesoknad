import * as React from 'react';
import { Forelder } from 'common/types';
import { FordelingGrafData } from '../types';
import GrafDeltOmsorg from './GrafDeltOmsorg';
import GrafAleneomsorg from './GrafAleneomsorg';

interface Props {
    fordeling: FordelingGrafData;
    forelder: Forelder;
}

const FordelingGrafBar: React.StatelessComponent<Props> = ({ fordeling, forelder }) => {
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
