import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import { NavnPåForeldre } from 'common/types';
import { FormattedMessage } from 'react-intl';
import { Stønadskontouttak } from 'app/types/uttaksplan/periodetyper';
import TilesList from 'app/components/elementer/tilesList/TilesList';

export interface Props {
    uttak: Stønadskontouttak[];
    navnPåForeldre: NavnPåForeldre;
    gjelderDagerBrukt: boolean;
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak, navnPåForeldre, gjelderDagerBrukt }) => (
    <section>
        <Undertittel tag="h2" className="blokk-xs">
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
