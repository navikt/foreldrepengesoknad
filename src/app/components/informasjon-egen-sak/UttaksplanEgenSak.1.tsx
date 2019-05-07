import * as React from 'react';
import BEMHelper from 'common/util/bem';
import { Saksperiode } from '../../types/søknad/SakForEndring';
import { sortTidsperiodeFom } from '../../util/uttaksplan/Tidsperiodene';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { formaterDato } from 'common/util/datoUtils';

import './uttaksplanEgenSak.less';
import SaksperiodeInfo from './SaksperiodeInfo';

interface OwnProps {
    perioder: Saksperiode[];
}

type Props = OwnProps & InjectedIntlProps;

const sorterPeriodePåStartdato = (p1: Saksperiode, p2: Saksperiode): number => {
    return sortTidsperiodeFom(p1.tidsperiode, p2.tidsperiode);
};

const bem = BEMHelper('uttaksplanEgenSak');
const datoformat = 'DD. MMM YYYY';

const UttaksplanEgenSak: React.StatelessComponent<Props> = ({ perioder, intl }) => {
    return (
        <ol className={bem.className}>
            {perioder.sort(sorterPeriodePåStartdato).map((periode, index) => (
                <li key={index}>
                    <div className={bem.element('periode')}>
                        <strong className={bem.element('tidsperiode')}>
                            {formaterDato(periode.tidsperiode.fom, datoformat)} -{' '}
                            {formaterDato(periode.tidsperiode.tom, datoformat)}:
                        </strong>
                        <div className={bem.element('info')} />
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default injectIntl(UttaksplanEgenSak);
