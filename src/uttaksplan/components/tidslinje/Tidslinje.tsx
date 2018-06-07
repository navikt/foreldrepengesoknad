import * as React from 'react';
import * as classnames from 'classnames';
import { Tidslinjeinnslag, TidslinjeinnslagType } from './types';
import Tidslinjestrek from './elementer/Tidslinjestrek';
import Periodeinnslag from './Periodeinnslag';
import Hendelseinnslag from './Hendelseinnslag';
import { Utsettelsesperiode, Periodetype } from '../../types';

import './tidslinje.less';

export interface TidslinjeProps {
    innslag: Tidslinjeinnslag[];
    navnForelder1: string;
    navnForelder2: string;
    onRedigerUtsettelse?: (utsettelse: Utsettelsesperiode) => void;
}

const erSisteInnslagForForelder = (
    innslag: Tidslinjeinnslag,
    idx: number,
    alleInnslag: Tidslinjeinnslag[]
): boolean => {
    if (innslag.type === TidslinjeinnslagType.hendelse) {
        return false;
    }
    const innslagForelder = alleInnslag.filter(
        (i) =>
            i.type === TidslinjeinnslagType.periode &&
            i.periode.forelder === innslag.periode.forelder &&
            i.periode.type === Periodetype.Stønadsperiode
    );
    return (
        innslagForelder.findIndex((i) => i === innslag) ===
        innslagForelder.length - 1
    );
};

const Tidslinje: React.StatelessComponent<TidslinjeProps> = ({
    innslag,
    navnForelder1,
    navnForelder2,
    onRedigerUtsettelse
}) => {
    return (
        <div className="tidslinje">
            {innslag.map((i, idx) => {
                if (
                    i.type === TidslinjeinnslagType.hendelse &&
                    i.hendelse === 'permisjonsslutt'
                ) {
                    return null;
                }
                const className = classnames(
                    'tidslinje__innslag',
                    `tidslinje__innslag--${i.type}`
                );
                const nesteInnslag =
                    idx === innslag.length - 1 ? undefined : innslag[idx + 1];
                return (
                    <div className={className} key={idx}>
                        <Tidslinjestrek
                            innslag={i}
                            erSisteInnslagForForelder={erSisteInnslagForForelder(
                                i,
                                idx,
                                innslag
                            )}
                        />
                        {i.type === TidslinjeinnslagType.periode ? (
                            <Periodeinnslag
                                innslag={i}
                                nesteInnslag={nesteInnslag}
                                erSisteInnslag={idx === innslag.length - 1}
                                navnForelder1={navnForelder1}
                                navnForelder2={navnForelder2}
                                onRedigerPeriode={onRedigerUtsettelse}
                            />
                        ) : (
                            <Hendelseinnslag innslag={i} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Tidslinje;
