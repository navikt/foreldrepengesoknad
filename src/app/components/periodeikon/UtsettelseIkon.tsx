import * as React from 'react';
import { UtsettelseÅrsakType } from '../../types/uttaksplan/periodetyper';
import { UttaksplanIkonKeys } from '../uttaksplanIkon/UttaksplanIkon';
import { Forelder } from 'common/types';
import PeriodeIkon from './Periodeikon';
import { getUtsettelseFarge } from '../../util/uttaksplan/styleUtils';

import './periodeikon.less';

export interface Props {
    årsak: UtsettelseÅrsakType;
    forelder?: Forelder;
}

const getIkonForKonto = (årsak: UtsettelseÅrsakType): UttaksplanIkonKeys => {
    return UttaksplanIkonKeys.ferie;
};

const UtsettelseIkon: React.StatelessComponent<Props> = ({ årsak, forelder }) => (
    <PeriodeIkon ikon={getIkonForKonto(årsak)} farge={getUtsettelseFarge()} />
);

export default UtsettelseIkon;
