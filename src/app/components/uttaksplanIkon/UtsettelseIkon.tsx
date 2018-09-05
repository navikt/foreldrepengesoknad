import * as React from 'react';
import { UtsettelseÅrsakType } from '../../types/uttaksplan/periodetyper';
import UttaksplanIkon, { UttaksplanIkonKeys } from './UttaksplanIkon';
import { getUtsettelseFarge } from '../../util/uttaksplan/styleUtils';
import IconBox from '../icon-box/IconBox';

export interface Props {
    årsak: UtsettelseÅrsakType;
}

const getIkonForKonto = (årsak: UtsettelseÅrsakType): UttaksplanIkonKeys => {
    switch (årsak) {
        case UtsettelseÅrsakType.Ferie:
            return UttaksplanIkonKeys.ferie;
        case UtsettelseÅrsakType.Arbeid:
            return UttaksplanIkonKeys.arbeid;
        case UtsettelseÅrsakType.InstitusjonBarnet:
        case UtsettelseÅrsakType.InstitusjonSøker:
            return UttaksplanIkonKeys.sykehus;
        case UtsettelseÅrsakType.Sykdom:
            return UttaksplanIkonKeys.sykdom;
    }
};

const UtsettelseIkon: React.StatelessComponent<Props> = ({ årsak }) => (
    <IconBox color={getUtsettelseFarge()}>
        <UttaksplanIkon ikon={getIkonForKonto(årsak)} />
    </IconBox>
);

export default UtsettelseIkon;
