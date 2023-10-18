import { getAntallForeldreISituasjon, getSituasjonForelderSvg } from 'common/utils/foreldreparSituasjonUtils';
import { Forelder, ForeldreparSituasjon } from 'common/types';
import bemUtils from 'common/utils/bemUtils';
import Foreldrepar from '../foreldrepar/Foreldrepar';
import Sirkelmaske from '../sirkelmaske/Sirkelmaske';

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
