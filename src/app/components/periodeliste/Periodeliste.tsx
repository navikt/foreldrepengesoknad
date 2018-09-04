import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import ToggleItem from '../toggleItem/ToggleItem';
import PeriodeHeader from './PeriodeHeader';
import PeriodeContent from './PeriodeContent';

export interface Props {
    perioder: Periode[];
}
import './periodeliste.less';

const BEM = BEMHelper('periodeliste');

const Periodeliste: React.StatelessComponent<Props> = ({ perioder }) => (
    <div className={BEM.className}>
        {perioder.map((p, idx) => (
            <div className={BEM.element('item')} key={idx}>
                <ToggleItem
                    renderHeader={() => <PeriodeHeader periode={p} />}
                    renderContent={() => <PeriodeContent periode={p} />}
                />
            </div>
        ))}
    </div>
);

export default Periodeliste;
