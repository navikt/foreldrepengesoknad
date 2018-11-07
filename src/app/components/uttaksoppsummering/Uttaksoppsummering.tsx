import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Undertittel } from 'nav-frontend-typografi';
import Kontostatus from './Kontostatus';
import TilesList from '../tiles-list/TilesList';
import { Forelder, NavnPåForeldre } from 'common/types';
import { FormattedMessage } from 'react-intl';
import { SøkerRolle } from '../../types/søknad/Søknad';
import { getErSøkerFarEllerMedmor } from '../../util/domain/personUtil';
import { getErDeltUttak } from '../../util/uttaksplan/forslag/util';

export interface Stønadskontouttak {
    konto: StønadskontoType;
    dagerGjenstående: number;
    forelder?: Forelder;
}

export interface Props {
    uttak: Stønadskontouttak[];
    navnPåForeldre: NavnPåForeldre;
    rolle: SøkerRolle;
}

const getTittel = (uttak: Stønadskontouttak[], rolle: SøkerRolle): string => {
    const deltUttak = getErDeltUttak(uttak);

    if (deltUttak && getErSøkerFarEllerMedmor(rolle)) {
        return 'uttaksoppsummering.forbrukt';
    }

    return 'uttaksoppsummering.gjenstående';
};

const Uttaksoppsummering: React.StatelessComponent<Props> = ({ uttak, navnPåForeldre, rolle }) => (
    <section>
        <Undertittel tag="h1" className="blokk-xs">
            <FormattedMessage id={getTittel(uttak, rolle)} />
        </Undertittel>
        <TilesList>
            {uttak.map((u, idx) => <Kontostatus key={idx} uttak={u} navnPåForeldre={navnPåForeldre} />)}
        </TilesList>
    </section>
);

export default Uttaksoppsummering;
