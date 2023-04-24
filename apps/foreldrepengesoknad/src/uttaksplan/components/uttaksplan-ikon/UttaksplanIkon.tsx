import { SVGProps } from 'react';
import ArbeidIkon from 'uttaksplan/assets/ArbeidIkon';
import FerieIkon from 'uttaksplan/assets/FerieIkon';
import SykdomIkon from 'uttaksplan/assets/SykdomIkon';
import TerminIkon from 'uttaksplan/assets/TerminIkon';
import UttakIkon from 'uttaksplan/assets/UttakIkon';
import { InformationIcon, XMarkOctagonFillIcon, ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';

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
        case 'termin':
            return <TerminIkon title={title} />;
        case 'info':
            return <InformationIcon />;
        case 'advarsel':
            return <ExclamationmarkTriangleFillIcon />;
        case 'feil':
            return <XMarkOctagonFillIcon />;
        default:
            return <UttakIkon title={title} />;
    }
};

export default UttaksplanIkon;
