import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import UttaksplanIkon, { UttaksplanIkonKeys } from './UttaksplanIkon';
import { Forelder } from 'common/types';
import { getStønadskontoFarge } from '../../util/uttaksplan/styleUtils';
import IconBox from '../icon-box/IconBox';

export interface Props {
    konto: StønadskontoType;
    forelder?: Forelder;
}

const getIkonForKonto = (konto: StønadskontoType): UttaksplanIkonKeys => {
    return UttaksplanIkonKeys.uttak;
};

const StønadskontoIkon: React.StatelessComponent<Props> = ({ konto, forelder }) => (
    <IconBox color={getStønadskontoFarge(konto, forelder)}>
        <UttaksplanIkon ikon={getIkonForKonto(konto)} />
    </IconBox>
);

export default StønadskontoIkon;
