import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import TilesList from '../tiles-list/TilesList';

export interface Stønadskontouttak {
    konto: StønadskontoType;
    dager: number;
}

export interface Props {
    uttak: Stønadskontouttak[];
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak }) => (
    <article>
        <Undertittel tag="h1" className="blokk-xs">
            Gjenstående uttak
        </Undertittel>
        <TilesList>{uttak.map((u, idx) => <Kontostatus key={idx} uttak={u} />)}</TilesList>
    </article>
);

export default Uttaksoppsummering;
