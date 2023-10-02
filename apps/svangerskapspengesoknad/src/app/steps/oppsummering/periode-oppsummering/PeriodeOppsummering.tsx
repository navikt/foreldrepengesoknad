import PeriodeVisning from 'app/components/periode-visning/PeriodeVisning';
import { TilretteleggingDTO } from 'app/types/Tilrettelegging';
import { FunctionComponent } from 'react';

interface Props {
    perioder: TilretteleggingDTO[];
}

const PeriodeOppsummering: FunctionComponent<Props> = ({ perioder }) => {
    return perioder.map((periode) => {
        return <PeriodeVisning periode={periode} />;
    });
};

export default PeriodeOppsummering;
