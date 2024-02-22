import { FunctionComponent } from 'react';

import { Barn } from 'app/types/Barn';
import { TilretteleggingPeriode } from 'app/types/Tilrettelegging';
import { getKanHaSvpFremTilTreUkerFørTermin } from 'app/utils/dateUtils';

import PeriodeVisning from './PeriodeVisning';

interface Props {
    perioder: TilretteleggingPeriode[];
    sisteDagForSvangerskapspenger: string;
    barn: Barn;
}

const PeriodeOppsummering: FunctionComponent<Props> = ({ perioder, sisteDagForSvangerskapspenger, barn }) => {
    const kanHaSvpFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barn);
    return perioder.map((periode, index) => {
        return (
            <PeriodeVisning
                key={index}
                periode={periode}
                sisteDagForSvangerskapspenger={sisteDagForSvangerskapspenger}
                kanHaSvpFremTilTreUkerFørTermin={kanHaSvpFremTilTreUkerFørTermin}
            />
        );
    });
};

export default PeriodeOppsummering;
