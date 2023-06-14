import { FunctionComponent } from 'react';
import { OppsummeringIkonType } from 'app/types/OppsummeringIkonType';
import MorGravidIkon from 'app/icons/MorGravidIkon';
import FlaskeIkon from 'app/icons/FlaskeIkon';
import KoffertIkon from 'app/icons/KoffertIkon';
import KalenderIkon from 'app/icons/KalenderIkon';
import PassIkon from 'app/icons/PassIkon';

interface Props {
    type: OppsummeringIkonType;
    className?: string;
}

const OppsummeringIkon: FunctionComponent<Props> = ({ type, className }) => {
    switch (type) {
        case 'termin':
            return <MorGravidIkon className={className} />;
        case 'barn':
            return <FlaskeIkon className={className} />;
        case 'arbeidsforhold':
            return <KoffertIkon className={className} />;
        case 'tilrettelegging':
            return <KalenderIkon className={className} />;
        case 'medlemskap':
            return <PassIkon className={className} />;
        default:
            return null;
    }
};

export default OppsummeringIkon;
