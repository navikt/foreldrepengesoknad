import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';

export interface Props {
    periode: Periode;
}
import './periodeheader.less';

const BEM = BEMHelper('periodeheader');

const PeriodeHeader: React.StatelessComponent<Props> = (props) => <div className={BEM.className}>PeriodeHeader</div>;

export default PeriodeHeader;
