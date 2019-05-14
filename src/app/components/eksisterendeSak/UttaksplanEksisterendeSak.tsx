import * as React from 'react';
import BEMHelper from 'common/util/bem';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { formaterDato } from 'common/util/datoUtils';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';
import { getPeriodeTittel } from '../../util/uttaksplan';
import { Søknadsinfo } from '../../selectors/types';
import { Periode } from '../../types/uttaksplan/periodetyper';

import './uttaksplanEksisterendeSak.less';

interface OwnProps {
    uttaksplan: Periode[];
    søknadsinfo: Søknadsinfo;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('uttaksplanEksisterendeSak');
const datoformat = 'DD. MMM YYYY';

const UttaksplanEgenSak: React.StatelessComponent<Props> = ({ uttaksplan, søknadsinfo, intl }) => {
    return (
        <ol className={bem.block}>
            {uttaksplan.sort(sorterPerioder).map((periode, index) => (
                <li key={index}>
                    <div className={bem.element('periode')}>
                        <strong className={bem.element('tidsperiode')}>
                            {formaterDato(periode.tidsperiode.fom, datoformat)}
                            <span className={bem.child('tidsperiode').element('sep')}>&mdash;</span>
                            {formaterDato(periode.tidsperiode.tom, datoformat)}
                        </strong>
                        <div className={bem.element('info')}>
                            {getPeriodeTittel(intl, periode, søknadsinfo.navn.navnPåForeldre)}
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default injectIntl(UttaksplanEgenSak);
