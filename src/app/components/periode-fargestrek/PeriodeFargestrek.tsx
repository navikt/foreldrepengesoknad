import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';

import './periodeFargestrek.less';
import { Forelder } from 'common/types';

export interface Props {
    periode: Periode;
    forelder?: Forelder;
}

const bem = BEMHelper('periodeFargestrek');

const PeriodeFargestrek: React.StatelessComponent<Props> = ({ periode, forelder }) => {
    const gradert = periode.type === Periodetype.Uttak && periode.gradert;
    return (
        <div
            className={classnames(
                bem.className,
                bem.modifier(getPeriodeFarge(periode, forelder)),
                gradert ? `${bem.modifier(getPeriodeFarge(periode))}--gradert` : undefined
            )}
        />
    );
};
export default PeriodeFargestrek;
