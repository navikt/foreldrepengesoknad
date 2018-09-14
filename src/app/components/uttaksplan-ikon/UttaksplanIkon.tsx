import * as React from 'react';
import FerieIkon from './ikoner/FerieIkon';
import ArbeidIkon from './ikoner/ArbeidIkon';
import SykdomIkon from './ikoner/SykdomIkon';
import UttakIkon from './ikoner/UttakIkon';
import TerminIkon from './ikoner/TerminIkon';
import AdvarselIkon from './ikoner/AdvarselIkon';

export enum UttaksplanIkonKeys {
    'arbeid' = 'arbeid',
    'ferie' = 'ferie',
    'sykdom' = 'sykdom',
    'termin' = 'termin',
    'uttak' = 'uttak',
    'advarsel' = 'advarsel',
    'feil' = 'feil'
}

export interface Props {
    ikon: UttaksplanIkonKeys;
}

const UttaksplanIkon: React.StatelessComponent<Props> = ({ ikon }) => {
    switch (ikon) {
        case 'arbeid':
            return <ArbeidIkon />;
        case 'ferie':
            return <FerieIkon />;
        case 'sykdom':
            return <SykdomIkon />;
        case 'termin':
            return <TerminIkon />;
        case 'advarsel':
            return <AdvarselIkon />;
        default:
            return <UttakIkon />;
    }
};

export default UttaksplanIkon;
