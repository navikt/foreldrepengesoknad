import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';

import './periodelisteItemMarkør.less';

export interface Props {
    periode: Periode;
}

const bem = BEMHelper('periodelisteItemMarkor');

const PeriodelisteItemMarkør: React.StatelessComponent<Props> = ({ periode }) => {
    const gradert = periode.type === Periodetype.Uttak && periode.gradert;
    return (
        <div
            className={classnames(
                bem.className,
                bem.modifier(getPeriodeFarge(periode)),
                gradert ? `${bem.modifier(getPeriodeFarge(periode))}--gradert` : undefined
            )}
        />
    );
};
export default PeriodelisteItemMarkør;
