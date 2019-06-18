import * as React from 'react';
import { InjectedIntlProps, InjectedIntl, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { Søknadsinfo } from 'app/selectors/types';
import { getPeriodeTittel } from 'app/util/uttaksplan';

import './infoEkisterendeSakPerioder.less';

interface InfoEksisterendeSakPerioderProps {
    perioder: Periode[];
    søknadsinfo: Søknadsinfo;
}

const InfoEksisterendeSakPerioder: React.StatelessComponent<InfoEksisterendeSakPerioderProps & InjectedIntlProps> = ({
    perioder,
    søknadsinfo,
    intl
}) => {
    const bem = BEMHelper('infoEkisterendeSakPerioder');
    return (
        <>
            <FormattedHTMLMessage
                id="ekisterendeSak.label.annenPartsPlan"
                values={{
                    navn: søknadsinfo.navn.annenForelder.navn
                }}
            />
            <ol className={bem.element('list')}>
                {perioder.map((periode) => {
                    return (
                        <li key={guid()}>
                            <FormattedHTMLMessage
                                id="ekisterendeSak.listeElement.periode"
                                values={{
                                    fom: periode.tidsperiode.fom.toDateString(),
                                    tom: periode.tidsperiode.tom.toDateString(),
                                    beskrivelse: getPeriodeTittel(intl, periode, søknadsinfo.navn.navnPåForeldre)
                                }}
                            />
                        </li>
                    );
                })}
            </ol>
        </>
    );
};

export default injectIntl(InfoEksisterendeSakPerioder);
