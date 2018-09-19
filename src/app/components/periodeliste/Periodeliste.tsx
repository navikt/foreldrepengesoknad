import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import ToggleItem from '../toggle-item/ToggleItem';
import PeriodeHeader from './PeriodeHeader';
import PeriodeContent from './PeriodeContent';

export interface Props {
    perioder: Periode[];
    navnMor: string;
    navnFarMedmor?: string;
}

import './periodeliste.less';

import { getPeriodeForelderNavn } from '../../util/uttaksplan';

const BEM = BEMHelper('periodeliste');

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, navnMor, navnFarMedmor }) => (
    <div className={BEM.className}>
        {perioder.map((p) => (
            <div className={BEM.element('item')} key={p.id}>
                <ToggleItem
                    expandedHeaderClassName="periodeheader--isOpen"
                    renderHeader={() => (
                        <PeriodeHeader periode={p} foreldernavn={getPeriodeForelderNavn(p, navnMor, navnFarMedmor)} />
                    )}
                    renderContent={() => <PeriodeContent periode={p} />}
                />
            </div>
        ))}
    </div>
);

export default Periodeliste;
