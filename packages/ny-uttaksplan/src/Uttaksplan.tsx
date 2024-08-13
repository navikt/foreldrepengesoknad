import { FunctionComponent } from 'react';

import '@navikt/ds-css';

import { AnnenForelder, NavnPåForeldre, Periode } from '@navikt/fp-common';

import { Barn } from '../../types';
import PeriodeListe from './components/periode-liste/PeriodeListe';

interface Props {
    uttaksplan: Periode[];
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    barn: Barn;
}

const UttaksplanNy: FunctionComponent<Props> = ({
    uttaksplan,
    familiehendelsedato,
    erFarEllerMedmor,
    navnPåForeldre,
    annenForelder,
    barn,
}) => {
    return (
        <div style={{ padding: '2rem 0' }}>
            <PeriodeListe
                perioder={uttaksplan}
                familiehendelsedato={familiehendelsedato}
                erFarEllerMedmor={erFarEllerMedmor}
                navnPåForeldre={navnPåForeldre}
                annenForelder={annenForelder}
                barn={barn}
            />
        </div>
    );
};

export default UttaksplanNy;
