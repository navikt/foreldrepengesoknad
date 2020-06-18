import * as React from 'react';
import { periodelisteBem } from '../Periodeliste';
import PeriodeFargestrek from '../periode-fargestrek/PeriodeFargestrek';
import { UttaksplanColor } from '../../../../../types/uttaksplan/colors';

export interface Props {
    isExpanded?: boolean;
    farge: UttaksplanColor | undefined;
    periodeFargestrek?: UttaksplanColor;
    border?: boolean;
}

const PeriodelisteItemWrapper: React.StatelessComponent<Props> = ({
    isExpanded,
    farge,
    periodeFargestrek,
    border,
    children,
}) => {
    const bem = periodelisteBem.child('item');
    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('expanded', isExpanded),
                bem.modifierConditional(farge, farge !== undefined),
                bem.modifierConditional('border', border)
            )}
        >
            <PeriodeFargestrek farge={periodeFargestrek || farge} />
            {children}
        </div>
    );
};

export default PeriodelisteItemWrapper;
