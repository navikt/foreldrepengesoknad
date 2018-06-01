import * as React from 'react';

import { InnslagPeriodetype, Tidslinjeinnslag } from './types';
import { Periodetype, Periode } from '../../types';

import { getInnslagfarge, innslagErFortsettelse } from './tidslinjeUtils';
import Utsettelsesinfo from './innslaginfo/Utsettelsesinfo';
import Periodeinfo from './innslaginfo/Periodeinfo';
import Callout from 'uttaksplan/components/callout/Callout';

export interface PeriodeinnslagProps {
    innslag: InnslagPeriodetype;
    nesteInnslag?: Tidslinjeinnslag;
    navnForelder1: string;
    navnForelder2: string;
    erSisteInnslag?: boolean;
    onRedigerPeriode?: (periode: Periode) => void;
}

const Periodeinnslag: React.StatelessComponent<PeriodeinnslagProps> = (
    props
) => {
    const { innslag, onRedigerPeriode } = props;

    const getInnslaginfo = (): React.ReactNode => {
        return innslag.periode.type === Periodetype.Utsettelse ? (
            <Utsettelsesinfo
                {...props}
                onRedigerPeriode={
                    onRedigerPeriode ? (i) => onRedigerPeriode(i) : undefined
                }
            />
        ) : (
            <Periodeinfo {...props} />
        );
    };

    return (
        <div className="periodeinnslag">
            <Callout
                borderColor={getInnslagfarge(innslag)}
                hideArrow={innslagErFortsettelse(innslag)}>
                {getInnslaginfo()}
            </Callout>
        </div>
    );
};
export default Periodeinnslag;
