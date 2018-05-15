import * as React from 'react';
import { Tidsperiode } from '../../../types';
import TidsperiodeTekst from './TidsperiodeTekst';
import RedigerInnslagKnapp from './RedigerInnslagKnapp';
import Varighet from './Varighet';
import { getAntallUttaksdagerITidsperiode } from '../../../utils/uttaksdagerUtils';
import { InnslagEkstrainfo } from '../types';
import UtvidetInformasjon from '../../../elements/utvidetInformasjon/UtvidetInformasjon';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface Props {
    children: React.ReactNode;
    tidsperiode?: Tidsperiode;
    ekstrainfo?: InnslagEkstrainfo;
    trekkFraFeriedager?: boolean;
    onRediger?: () => void;
}

const InnslagLayout: React.StatelessComponent<Props & InjectedIntlProps> = ({
    tidsperiode,
    ekstrainfo,
    onRediger,
    intl,
    trekkFraFeriedager,
    children
}) => (
    <div className="innslagLayout">
        <div className="periodeinnslag__topp">
            <div className="periodeinnslag__topp__venstre">{children}</div>
            <div className="periodeinnslag__topp__hoyre">
                {tidsperiode && (
                    <span className="tidslinje__varighet">
                        <Varighet
                            dager={getAntallUttaksdagerITidsperiode(
                                tidsperiode,
                                trekkFraFeriedager
                            )}
                        />
                    </span>
                )}
                {onRediger && (
                    <div className="periodeinnslag__rediger">
                        <RedigerInnslagKnapp onClick={() => onRediger()} />
                    </div>
                )}
            </div>
        </div>
        {tidsperiode && (
            <div className="periodeinnslag__dato">
                <TidsperiodeTekst
                    tidsperiode={tidsperiode}
                    visSluttdato={true}
                    visVarighet={true}
                />
            </div>
        )}
        {ekstrainfo && (
            <div className="periodeinnslag__ekstrainfo">
                <UtvidetInformasjon
                    apneLabel={intl.formatMessage({
                        id: 'uttaksplan.tidslinje.visdetaljer'
                    })}
                    lukkLabel={intl.formatMessage({
                        id: 'uttaksplan.tidslinje.skjuldetaljer'
                    })}>
                    <div className="blokkPad-xxs">{ekstrainfo.tekst}</div>
                </UtvidetInformasjon>
            </div>
        )}
    </div>
);

export default injectIntl(InnslagLayout);
