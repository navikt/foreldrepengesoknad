import * as React from 'react';

import { InnslagPeriodetype, Tidslinjeinnslag } from './types';
import { Periodetype, Utsettelsesperiode } from '../../types';

import { getInnslagfarge, innslagErFortsettelse } from './tidslinjeUtils';
import Utsettelsesinfo from './innslaginfo/Utsettelsesinfo';
import Periodeinfo from './innslaginfo/Periodeinfo';
import Callout from '../../elements/callout/Callout';

export interface PeriodeinnslagProps {
    innslag: InnslagPeriodetype;
    nesteInnslag?: Tidslinjeinnslag;
    navnForelder1: string;
    navnForelder2: string;
    erSisteInnslag?: boolean;
    onRedigerUtsettelse?: (utsettelse: Utsettelsesperiode) => void;
}

const Periodeinnslag: React.StatelessComponent<PeriodeinnslagProps> = (
    props
) => {
    const { innslag, onRedigerUtsettelse } = props;

    const getInnslaginfo = (): React.ReactNode => {
        return innslag.periode.type === Periodetype.Utsettelse ? (
            <Utsettelsesinfo
                {...props}
                onRedigerUtsettelse={
                    onRedigerUtsettelse
                        ? (i) => onRedigerUtsettelse(i)
                        : undefined
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
