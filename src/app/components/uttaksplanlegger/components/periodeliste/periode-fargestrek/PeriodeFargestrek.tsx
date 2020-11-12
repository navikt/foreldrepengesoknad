import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { UttaksplanColor } from '../../../../../types/uttaksplan/colors';

import './periodeFargestrek.less';

export interface Props {
    farge: UttaksplanColor | undefined;
    gradert?: boolean;
}

const bem = BEMHelper('periodeFargestrek');

const PeriodeFargestrek: React.FunctionComponent<Props> = ({ farge, gradert }) => {
    return (
        <div
            className={classnames(
                bem.block,
                bem.modifier(farge),
                gradert ? `${bem.modifier(farge)}--gradert` : undefined
            )}
        />
    );
};
export default PeriodeFargestrek;
