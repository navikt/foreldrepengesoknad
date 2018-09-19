import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import TilesList from '../tiles-list/TilesList';
import { Forelder, NavnPåForeldre } from 'common/types';

export interface Stønadskontouttak {
    konto: StønadskontoType;
    dagerGjenstående: number;
    forelder?: Forelder;
}

export interface Props {
    uttak: Stønadskontouttak[];
    navnPåForeldre: NavnPåForeldre;
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak, navnPåForeldre }) => (
    <section>
        <Undertittel tag="h1" className="blokk-xs">
            Gjenstående uttak
        </Undertittel>
        <TilesList>
            {uttak.map((u, idx) => <Kontostatus key={idx} uttak={u} navnPåForeldre={navnPåForeldre} />)}
        </TilesList>
    </section>
);

export default Uttaksoppsummering;
