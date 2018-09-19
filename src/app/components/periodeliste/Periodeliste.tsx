import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import ToggleItem from '../toggle-item/ToggleItem';
import PeriodeHeader from './PeriodeHeader';
import PeriodeContent from './PeriodeContent';

export interface Props {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
}

import './periodeliste.less';
import { NavnPåForeldre } from 'common/types';

const BEM = BEMHelper('periodeliste');

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, navnPåForeldre }) => (
    <div className={BEM.className}>
        {perioder.map((p) => (
            <div className={BEM.element('item')} key={p.id}>
                <ToggleItem
                    expandedHeaderClassName="periodeheader--isOpen"
                    renderHeader={() => <PeriodeHeader periode={p} navnPåForeldre={navnPåForeldre} />}
                    renderContent={() => <PeriodeContent periode={p} />}
                />
            </div>
        ))}
    </div>
);

export default Periodeliste;
