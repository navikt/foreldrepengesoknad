import * as React from 'react';
import SykehusIkon from './ikoner/SykehusIkon';
import FerieIkon from './ikoner/FerieIkon';
import UttakIkon from './ikoner/UttakIkon';
import GradertIkon from './ikoner/GradertIkon';
import PlasterIkon from './ikoner/PlasterIkon';
import TerminIkon from './ikoner/TerminIkon';
import ArbeidIkon from './ikoner/ArbeidIkon';
import AdvarselIkon from './ikoner/AdvarselIkon';

export type UttaksplanIkonKeys =
    | 'arbeid'
    | 'ferie'
    | 'gradert'
    | 'sykehus'
    | 'sykdom'
    | 'termin'
    | 'uttak'
    | 'advarsel';

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
