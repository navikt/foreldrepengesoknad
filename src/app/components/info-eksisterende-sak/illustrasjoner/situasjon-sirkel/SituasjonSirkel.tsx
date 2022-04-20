import React from 'react';
import { Forelder } from 'app/types/Forelder';
import { bemUtils } from '@navikt/fp-common';
import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import Sirkelmaske from 'app/components/sirkelmaske/Sirkelmaske';
import { getAntallForeldreISituasjon, getSituasjonForelderSvg } from 'app/utils/foreldreparSituasjonUtils';
import Foreldrepar from 'app/components/foreldrepar/Foreldrepar';

import './situasjonSirkel.less';

interface Props {
    situasjon: ForeldreparSituasjon;
    valgtForelder?: Forelder;
}

const SituasjonSirkel: React.FunctionComponent<Props> = ({ situasjon, valgtForelder }) => {
    const info = getSituasjonForelderSvg(situasjon);
    const bem = bemUtils('situasjonSirkel');

    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    {getAntallForeldreISituasjon(situasjon) === 1 && valgtForelder ? (
                        <Foreldrepar forelder1={valgtForelder === Forelder.mor ? info.mor : info.farMedmor} />
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
