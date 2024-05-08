import {
    BandageIcon,
    Buildings3Icon,
    ExclamationmarkTriangleFillIcon,
    InformationSquareIcon,
    ParasolBeachIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';
import { SVGProps } from 'react';

import UttakIkon from '../../assets/UttakIkon';

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
            return <Buildings3Icon title={title} width={32} height={32} />;
        case 'ferie':
            return <ParasolBeachIcon title={title} width={32} height={32} />;
        case 'sykdom':
            return <BandageIcon title={title} width={32} height={32} />;
        case 'info':
            return <InformationSquareIcon />;
        case 'advarsel':
            return <ExclamationmarkTriangleFillIcon />;
        case 'feil':
            return <XMarkOctagonFillIcon />;
        default:
            return <UttakIkon title={title} />;
    }
};

export default UttaksplanIkon;
