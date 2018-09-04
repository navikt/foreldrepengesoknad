import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { UttaksplanIkonKeys } from '../uttaksplanIkon/UttaksplanIkon';
import { Forelder } from 'common/types';
import PeriodeIkon from './Periodeikon';
import { getStønadskontoFarge } from '../../util/uttaksplan/styleUtils';

import './periodeikon.less';

export interface Props {
    konto: StønadskontoType;
    forelder?: Forelder;
}

const getIkonForKonto = (konto: StønadskontoType): UttaksplanIkonKeys => {
    return UttaksplanIkonKeys.uttak;
};

const StønadskontoIkon: React.StatelessComponent<Props> = ({ konto, forelder }) => (
    <PeriodeIkon ikon={getIkonForKonto(konto)} farge={getStønadskontoFarge(konto, forelder)} />
);

export default StønadskontoIkon;
