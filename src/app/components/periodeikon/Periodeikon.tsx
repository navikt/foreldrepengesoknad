import * as React from 'react';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplanIkon/UttaksplanIkon';
import BEMHelper from 'common/util/bem';
import { getPeriodeBkgModifierClass } from '../../util/uttaksplan/styleUtils';
import './periodeikon.less';

export interface Props {
    periode: Periode;
}
const BEM = BEMHelper('periodeikon');

const getIkonForPeriode = (periode: Periode): UttaksplanIkonKeys => {
    return UttaksplanIkonKeys.uttak;
};

const PeriodeIkon: React.StatelessComponent<Props> = ({ periode }) => (
    <div className={classnames(BEM.className, getPeriodeBkgModifierClass(periode))}>
        <UttaksplanIkon ikon={getIkonForPeriode(periode)} />
    </div>
);

export default PeriodeIkon;
