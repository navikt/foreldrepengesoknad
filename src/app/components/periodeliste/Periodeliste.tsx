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

const BEM = BEMHelper('periodeliste');

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, navnMor, navnFarMedmor }) => (
    <div className={BEM.className}>
        {perioder.map((p) => (
            <div className={BEM.element('item')} key={p.id}>
                <ToggleItem
                    expandedHeaderClassName="periodeheader--isOpen"
                    renderHeader={() => <PeriodeHeader periode={p} navnMor={navnMor} navnFarMedmor={navnFarMedmor} />}
                    renderContent={() => <PeriodeContent periode={p} />}
                />
            </div>
        ))}
    </div>
);

export default Periodeliste;
