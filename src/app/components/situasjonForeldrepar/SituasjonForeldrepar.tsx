import * as React from 'react';
import { Situasjon } from '../foreldrepar/foreldreparTypes';
import { Forelder } from 'common/types';
import { getSituasjonForelderSvg, getAntallForeldreISituasjon } from '../foreldrepar/foreldreparUtils';
import Foreldrepar from '../foreldrepar/Foreldrepar';

interface Props {
    situasjon: Situasjon;
    kompakt?: boolean;
    valgtForelder?: Forelder;
}

const SituasjonForeldrepar: React.StatelessComponent<Props> = ({ situasjon, valgtForelder, kompakt }) => {
    const info = getSituasjonForelderSvg(situasjon);
    if (getAntallForeldreISituasjon(situasjon) === 1 && valgtForelder) {
        return <Foreldrepar forelder1={valgtForelder === Forelder.MOR ? info.mor : info.farMedmor} />;
    }
    return <Foreldrepar forelder1={info.mor} forelder2={info.farMedmor} variant={info.variant} kompakt={kompakt} />;
};

export default SituasjonForeldrepar;
