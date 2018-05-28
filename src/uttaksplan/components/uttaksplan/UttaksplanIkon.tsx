import * as React from 'react';
import SykehusIkon from 'uttaksplan/components/uttaksplan/ikoner/SykehusIkon';
import FerieIkon from 'uttaksplan/components/uttaksplan/ikoner/FerieIkon';
import UttakIkon from 'uttaksplan/components/uttaksplan/ikoner/UttakIkon';
import GradertIkon from 'uttaksplan/components/uttaksplan/ikoner/GradertIkon';
import PlasterIkon from 'uttaksplan/components/uttaksplan/ikoner/PlasterIkon';
import TerminIkon from 'uttaksplan/components/uttaksplan/ikoner/TerminIkon';
import ArbeidIkon from 'uttaksplan/components/uttaksplan/ikoner/ArbeidIkon';
import AdvarselIkon from 'uttaksplan/components/uttaksplan/ikoner/AdvarselIkon';

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
