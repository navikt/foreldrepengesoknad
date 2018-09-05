import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import TilesList from '../tiles-list/TilesList';
import { Forelder } from 'common/types';

export interface Stønadskontouttak {
    konto: StønadskontoType;
    dagerGjennstående: number;
    forelder?: Forelder;
}

export interface Props {
    uttak: Stønadskontouttak[];
    navnForelder1: string;
    navnForelder2?: string;
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak, navnForelder1, navnForelder2 }) => (
    <section>
        <Undertittel tag="h1" className="blokk-xs">
            Gjenstående uttak
        </Undertittel>
        <TilesList>
            {uttak.map((u, idx) => (
                <Kontostatus key={idx} uttak={u} navnForelder1={navnForelder1} navnForelder2={navnForelder2} />
            ))}
        </TilesList>
    </section>
);

export default Uttaksoppsummering;
