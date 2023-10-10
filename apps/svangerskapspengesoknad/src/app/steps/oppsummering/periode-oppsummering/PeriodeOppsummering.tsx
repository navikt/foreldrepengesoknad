import PeriodeVisning from 'app/components/periode-visning/PeriodeVisning';
import { TilretteleggingPeriode } from 'app/types/Tilrettelegging';
import { FunctionComponent } from 'react';

interface Props {
    perioder: TilretteleggingPeriode[];
    sisteDagForSvangerskapspenger: Date;
}

const PeriodeOppsummering: FunctionComponent<Props> = ({ perioder, sisteDagForSvangerskapspenger }) => {
    return perioder.map((periode) => {
        return <PeriodeVisning periode={periode} sisteDagForSvangerskapspenger={sisteDagForSvangerskapspenger} />;
    });
};

export default PeriodeOppsummering;
