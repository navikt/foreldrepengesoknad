import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';

export interface Props {
    periode: Periode;
}
import './periodecontent.less';

const BEM = BEMHelper('periodecontent');

const PeriodeContent: React.StatelessComponent<Props> = (props) => <div className={BEM.className}>Content</div>;

export default PeriodeContent;
