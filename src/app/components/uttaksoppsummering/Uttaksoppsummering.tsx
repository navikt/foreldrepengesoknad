import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import TilesList from '../tiles-list/TilesList';
import { Forelder } from 'common/types';

export interface Stønadskontouttak {
    konto: StønadskontoType;
    dagerGjenstående: number;
    forelder?: Forelder;
}

export interface Props {
    uttak: Stønadskontouttak[];
    navnMor: string;
    navnFarMedmor?: string;
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak, navnMor, navnFarMedmor }) => (
    <section>
        <Undertittel tag="h1" className="blokk-xs">
            Gjenstående uttak
        </Undertittel>
        <TilesList>
            {uttak.map((u, idx) => <Kontostatus key={idx} uttak={u} navnMor={navnMor} navnFarMedmor={navnFarMedmor} />)}
        </TilesList>
    </section>
);

export default Uttaksoppsummering;
