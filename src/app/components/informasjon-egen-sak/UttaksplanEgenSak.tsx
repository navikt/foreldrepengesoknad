import * as React from 'react';
import BEMHelper from 'common/util/bem';
import { SakForEndring } from '../../types/søknad/SakForEndring';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { formaterDato } from 'common/util/datoUtils';
import mapSaksperioderTilUttaksperioder from '../../util/sakForEndring/mapSaksperioderTilUttaksperioder';
import { sorterPerioder } from '../../util/uttaksplan/Periodene';
import { getPeriodeTittel } from '../../util/uttaksplan';
import { Søknadsinfo } from '../../selectors/types';

import './uttaksplanEgenSak.less';

interface OwnProps {
    sak: SakForEndring;
    søknadsinfo: Søknadsinfo;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('uttaksplanEgenSak');
const datoformat = 'DD. MMM YYYY';

const UttaksplanEgenSak: React.StatelessComponent<Props> = ({ sak, søknadsinfo, intl }) => {
    const perioder = mapSaksperioderTilUttaksperioder(sak.saksperioder, sak.grunnlag);
    return (
        <ol className={bem.className}>
            {perioder.sort(sorterPerioder).map((periode, index) => (
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
