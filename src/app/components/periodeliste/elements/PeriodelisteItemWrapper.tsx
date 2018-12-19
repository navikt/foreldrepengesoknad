import * as React from 'react';
import classnames from 'classnames';
import { periodelisteBem } from '../Periodeliste';
import PeriodeFargestrek from '../../periode-fargestrek/PeriodeFargestrek';
import { UttaksplanColor } from '../../../types/uttaksplan/colors';

export interface Props {
    isExpanded?: boolean;
    farge: UttaksplanColor | undefined;
}

const PeriodelisteItemWrapper: React.StatelessComponent<Props> = ({ isExpanded, farge, children }) => {
    return (
        <div className={classnames(periodelisteBem.element('item', isExpanded ? 'expanded' : undefined))}>
            <PeriodeFargestrek farge={farge} />
            {children}
        </div>
    );
};

export default PeriodelisteItemWrapper;
