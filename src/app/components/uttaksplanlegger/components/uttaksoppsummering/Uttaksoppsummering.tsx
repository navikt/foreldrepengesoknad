import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import { NavnPåForeldre } from 'common/types';
import { Stønadskontouttak } from 'app/types/uttaksplan/periodetyper';
import TilesList from 'app/components/elementer/tilesList/TilesList';

export interface Props {
    uttak: Stønadskontouttak[];
    navnPåForeldre: NavnPåForeldre;
    tittel: string;
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak, navnPåForeldre, tittel }) => (
    <section>
        <Undertittel tag="h2" className="blokk-xs">
            {tittel}
        </Undertittel>
        <TilesList columns={2}>
            {uttak.map((u, idx) => <Kontostatus key={idx} uttak={u} navnPåForeldre={navnPåForeldre} />)}
        </TilesList>
    </section>
);

export default Uttaksoppsummering;
