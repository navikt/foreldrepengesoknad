import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as classnames from 'classnames';
import { Periode } from 'uttaksplan/types';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

export interface OwnProps {
    perioder: Periode[];
    uttaksgrunnlag: Uttaksgrunnlag;
}

import './uttak.less';

type Props = OwnProps & InjectedIntlProps;

interface Uttak {
    navn: string;
    dager: number;
    overforbruk?: boolean;
}

const FordelingUttaksplan: React.StatelessComponent<Props> = ({
    perioder,
    uttaksgrunnlag
}) => {
    const { søker, annenForelder } = uttaksgrunnlag;
    const uttak: Uttak[] = [];

    if (annenForelder && annenForelder.skalHaForeldrepenger) {
        const tilgjengeligForSøker = 0;

        uttak.push({
            navn: søker.fornavn,
            dager: tilgjengeligForSøker
        });
        uttak.push({
            navn: annenForelder.fornavn,
            dager: 0
        });
        uttak.push({
            navn: 'Fellesdel',
            dager: 0
        });
    } else {
        uttak.push({
            navn: søker.fornavn,
            dager: 0
        });
    }

    return (
        <div className="uttak">
            {uttak.map((u, idx) => (
                <div
                    key={idx}
                    className={classnames('uttak__konto', {
                        'uttak__konto--overforbrukt': u.overforbruk
                    })}>
                    <h2 className="uttak__navn">{u.navn}</h2>
                    <div className="uttak__dager">{u.dager}</div>
                    <div className="uttak_post">
                        dag{u.dager !== 1 ? 'er' : ''} igjen
                    </div>
                </div>
            ))}
        </div>
    );
};
export default injectIntl(FordelingUttaksplan);
