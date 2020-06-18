import * as React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { Søknadsinfo } from 'app/selectors/types';
import { getPeriodeTittel } from 'app/util/uttaksplan';
import { formaterDato } from 'common/util/datoUtils';

import './infoEksisterendeSakPerioder.less';

interface InfoEksisterendeSakPerioderProps {
    perioder: Periode[];
    søknadsinfo: Søknadsinfo;
    navnForOverskrift?: string;
}

const InfoEksisterendeSakPerioder: React.StatelessComponent<InfoEksisterendeSakPerioderProps> = ({
    perioder,
    søknadsinfo,
    navnForOverskrift,
}) => {
    const intl = useIntl();
    const dateFormat = 'DD. MMM YYYY';
    const bem = BEMHelper('infoEksisterendeSakPerioder');
    return (
        <>
            {navnForOverskrift && (
                <FormattedMessage
                    id="eksisterendeSak.label.annenPartsPlan"
                    values={{
                        navn: navnForOverskrift,
                    }}
                />
            )}
            <ol className={bem.element('list')}>
                {perioder.map((periode) => {
                    return (
                        <li key={guid()}>
                            <FormattedMessage
                                id="eksisterendeSak.listeElement.periode"
                                values={{
                                    fom: formaterDato(periode.tidsperiode.fom, dateFormat),
                                    tom: formaterDato(periode.tidsperiode.tom, dateFormat),
                                    beskrivelse: getPeriodeTittel(intl, periode, søknadsinfo.navn.navnPåForeldre),
                                    b: (msg: any) => <b>{msg}</b>,
                                }}
                            />
                        </li>
                    );
                })}
            </ol>
        </>
    );
};

export default InfoEksisterendeSakPerioder;
