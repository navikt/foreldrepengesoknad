import * as React from 'react';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';

export interface Props {
    periode: Periode;
}
import './periodecontent.less';
import EndrePeriodeForm from '../endre-periode-form/EndrePeriodeForm';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';

const bem = BEMHelper('periodecontent');

const PeriodeContent: React.StatelessComponent<Props> = ({ periode }) => (
    <div className={classnames(bem.className, bem.modifier(periode.type), bem.modifier(getPeriodeFarge(periode)))}>
        <EndrePeriodeForm periode={periode} />
    </div>
);

export default PeriodeContent;
