import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import ToggleItem from '../toggle-item/ToggleItem';
import PeriodeHeader from './PeriodeHeader';
import PeriodeContent from './PeriodeContent';

export interface Props {
    perioder: Periode[];
    navnForelder1: string;
    navnForelder2?: string;
}

import './periodeliste.less';

import { getPeriodeForelderNavn } from '../../util/uttaksplan';

const BEM = BEMHelper('periodeliste');

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, navnForelder1, navnForelder2 }) => (
    <div className={BEM.className}>
        {perioder.map((p, idx) => (
            <div className={BEM.element('item')} key={idx}>
                <ToggleItem
                    renderHeader={() => (
                        <PeriodeHeader
                            periode={p}
                            foreldernavn={getPeriodeForelderNavn(p, navnForelder1, navnForelder2)}
                        />
                    )}
                    renderContent={() => <PeriodeContent periode={p} />}
                />
            </div>
        ))}
    </div>
);

export default Periodeliste;
