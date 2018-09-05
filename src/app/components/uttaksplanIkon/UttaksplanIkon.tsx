import * as React from 'react';
import SykehusIkon from './ikoner/SykehusIkon';
import FerieIkon from './ikoner/FerieIkon';
import UttakIkon from './ikoner/UttakIkon';
import GradertIkon from './ikoner/GradertIkon';
import PlasterIkon from './ikoner/PlasterIkon';
import TerminIkon from './ikoner/TerminIkon';
import ArbeidIkon from './ikoner/ArbeidIkon';
import AdvarselIkon from './ikoner/AdvarselIkon';

export enum UttaksplanIkonKeys {
    'arbeid' = 'arbeid',
    'ferie' = 'ferie',
    'gradert' = 'gradert',
    'sykehus' = 'sykehus',
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
        case 'gradert':
            return <GradertIkon />;
        case 'sykdom':
            return <PlasterIkon />;
        case 'sykehus':
            return <SykehusIkon />;
        case 'termin':
            return <TerminIkon />;
        case 'advarsel':
            return <AdvarselIkon />;
        default:
            return <UttakIkon />;
    }
};

export default UttaksplanIkon;
