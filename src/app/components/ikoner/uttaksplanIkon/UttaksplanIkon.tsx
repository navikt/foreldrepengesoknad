import * as React from 'react';
import FerieIkon from './ikoner/FerieIkon';
import ArbeidIkon from './ikoner/ArbeidIkon';
import SykdomIkon from './ikoner/SykdomIkon';
import UttakIkon from './ikoner/UttakIkon';
import TerminIkon from './ikoner/TerminIkon';
import Ikon from 'nav-frontend-ikoner-assets';

export enum UttaksplanIkonKeys {
    'arbeid' = 'arbeid',
    'ferie' = 'ferie',
    'sykdom' = 'sykdom',
    'termin' = 'termin',
    'uttak' = 'uttak',
    'info' = 'info',
    'advarsel' = 'advarsel',
    'feil' = 'feil',
}

export interface Props {
    ikon: UttaksplanIkonKeys;
    title: string;
}

const UttaksplanIkon: React.StatelessComponent<Props> = ({ ikon, title }) => {
    switch (ikon) {
        case 'arbeid':
            return <ArbeidIkon title={title} />;
        case 'ferie':
            return <FerieIkon title={title} />;
        case 'sykdom':
            return <SykdomIkon title={title} />;
        case 'termin':
            return <TerminIkon title={title} />;
        case 'info':
            return <Ikon kind="info-sirkel-fyll" size="1.5rem" />;
        case 'advarsel':
            return <Ikon kind="advarsel-sirkel-fyll" size="1.5rem" />;
        case 'feil':
            return <Ikon kind="feil-sirkel-fyll" size="1.5rem" />;
        default:
            return <UttakIkon title={title} />;
    }
};

export default UttaksplanIkon;
