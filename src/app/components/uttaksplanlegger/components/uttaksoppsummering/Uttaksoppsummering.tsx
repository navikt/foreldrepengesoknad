import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import { NavnPåForeldre } from 'common/types';
import TilesList from 'app/components/elementer/tilesList/TilesList';
import { Uttaksstatus } from 'app/util/uttaksplan/uttaksstatus';
import { FormattedMessage } from 'react-intl';

export interface Props {
    uttaksstatus: Uttaksstatus;
    navnPåForeldre: NavnPåForeldre;
    erDeltUttak: boolean;
    erEndringssøknad: boolean;
}

const Uttaksoppsummering: React.StatelessComponent<Props> = ({
    uttaksstatus,
    navnPåForeldre,
    erDeltUttak,
    erEndringssøknad,
}) => (
    <section>
        <Undertittel tag="h2" className="blokk-xs">
            {
                <FormattedMessage
                    id={
                        uttaksstatus.gjelderDagerBrukt
                            ? 'oversiktBrukteDager.tittel.kontoer.brukteDager'
                            : 'oversiktBrukteDager.tittel.kontoer.ikkeBrukteDager'
                    }
                    values={{ antall: erDeltUttak ? 2 : 1 }}
                />
            }
        </Undertittel>
        <TilesList columns={2}>
            {uttaksstatus.uttak.map((u, idx) => (
                <Kontostatus key={idx} uttak={u} navnPåForeldre={navnPåForeldre} erEndringssøknad={erEndringssøknad} />
            ))}
        </TilesList>
    </section>
);

export default Uttaksoppsummering;
