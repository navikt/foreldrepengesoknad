import * as React from 'react';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';

import './periodecontent.less';

export interface Props {
    periode: Periode;
}

const bem = BEMHelper('periodecontent');

const PeriodeContent: React.StatelessComponent<Props> = ({ periode, children }) => (
    <div className={classnames(bem.className, bem.modifier(periode.type), bem.modifier(getPeriodeFarge(periode)))}>
        {children}
    </div>
);

export default PeriodeContent;
