import * as React from 'react';
import SituasjonForeldrepar from '../../situasjonForeldrepar/SituasjonForeldrepar';
import { Situasjon } from 'app/components/foreldrepar/foreldreparTypes';
import { Forelder } from 'common/types';
import BEMHelper from 'common/util/bem';
import Sirkelmaske from 'common/components/sirkelmaske/Sirkelmaske';

import './situasjonSirkel.less';

interface Props {
    situasjon: Situasjon;
    valgtForelder?: Forelder;
}

const bem = BEMHelper('situasjonSirkel');

const SituasjonSirkel: React.StatelessComponent<Props> = ({ situasjon, valgtForelder }) => {
    return (
        <div className={bem.className}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <SituasjonForeldrepar situasjon={situasjon} kompakt={true} valgtForelder={valgtForelder} />
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default SituasjonSirkel;
