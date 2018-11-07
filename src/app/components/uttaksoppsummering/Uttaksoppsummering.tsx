import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import TilesList from '../tiles-list/TilesList';
import { Forelder, NavnPåForeldre } from 'common/types';
import { FormattedMessage } from 'react-intl';

export interface Stønadskontouttak {
    konto: StønadskontoType;
    antallDager: number;
    forelder?: Forelder;
}

export interface Props {
    uttak: Stønadskontouttak[];
    navnPåForeldre: NavnPåForeldre;
    gjelderDagerBrukt: boolean;
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak, navnPåForeldre, gjelderDagerBrukt }) => (
    <section>
        <Undertittel tag="h1" className="blokk-xs">
            <FormattedMessage
                id={gjelderDagerBrukt ? 'uttaksoppsummering.forbrukt' : 'uttaksoppsummering.gjenstående'}
            />
        </Undertittel>
        <TilesList>
            {uttak.map((u, idx) => <Kontostatus key={idx} uttak={u} navnPåForeldre={navnPåForeldre} />)}
        </TilesList>
    </section>
);

export default Uttaksoppsummering;
