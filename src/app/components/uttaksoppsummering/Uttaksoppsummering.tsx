import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';

export interface Stønadskontouttak {
    konto: StønadskontoType;
    dager: number;
}

export interface Props {
    uttak: Stønadskontouttak[];
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak }) => (
    <article className="uttaksOppsummering">
        <Undertittel tag="h1">GjenståendeUttak</Undertittel>
        <ul>
            {uttak.map((u, idx) => (
                <li key={idx}>
                    <Kontostatus uttak={u} />
                </li>
            ))}
        </ul>
    </article>
);

export default Uttaksoppsummering;
