import * as React from 'react';
import { Forelder } from 'common/types';
import BEMHelper from 'common/util/bem';
import Sirkelmaske from 'common/components/sirkelmaske/Sirkelmaske';
import { Situasjon } from './foreldrepar/foreldreparTypes';
import { getSituasjonForelderSvg, getAntallForeldreISituasjon } from './foreldrepar/foreldreparUtils';
import Foreldrepar from './foreldrepar/Foreldrepar';

import './situasjonSirkel.less';

interface Props {
    situasjon: Situasjon;
    valgtForelder?: Forelder;
}

const bem = BEMHelper('situasjonSirkel');

const SituasjonSirkel: React.StatelessComponent<Props> = ({ situasjon, valgtForelder }) => {
    const info = getSituasjonForelderSvg(situasjon);
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    {getAntallForeldreISituasjon(situasjon) === 1 && valgtForelder ? (
                        <Foreldrepar forelder1={valgtForelder === Forelder.MOR ? info.mor : info.farMedmor} />
                    ) : (
                        <Foreldrepar
                            forelder1={info.mor}
                            forelder2={info.farMedmor}
                            variant={info.variant}
                            kompakt={true}
                        />
                    )}
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default SituasjonSirkel;
