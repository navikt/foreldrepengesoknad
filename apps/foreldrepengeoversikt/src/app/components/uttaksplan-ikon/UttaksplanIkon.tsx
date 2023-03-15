import ArbeidIkon from 'assets/ArbeidIkon';
import FerieIkon from 'assets/FerieIkon';
import SykdomIkon from 'assets/SykdomIkon';
import UttakIkon from 'assets/UttakIkon';
import React, { SVGProps } from 'react';

export interface UttaksplanIkonProps extends SVGProps<any> {
    title: string;
}

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

const UttaksplanIkon: React.FunctionComponent<Props> = ({ ikon, title }) => {
    switch (ikon) {
        case 'arbeid':
            return <ArbeidIkon title={title} />;
        case 'ferie':
            return <FerieIkon title={title} />;
        case 'sykdom':
            return <SykdomIkon title={title} />;
        default:
            return <UttakIkon title={title} />;
    }
};

export default UttaksplanIkon;
