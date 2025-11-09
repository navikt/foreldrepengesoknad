import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { NavnPåForeldre, Situasjon } from '@navikt/fp-common';
import { BrukerRolleSak_fpoversikt, KontoTypeUttak_fpoversikt } from '@navikt/fp-types';

import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';
import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

interface Props {
    konto: KontoTypeUttak;
    forelder?: BrukerRolleSak_fpoversikt;
    gradert?: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    situasjon?: Situasjon;
    erAleneOmOmsorg?: boolean;
    harMidlertidigOmsorg?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const StønadskontoIkon: FunctionComponent<Props> = ({
    konto,
    forelder,
    gradert,
    navnPåForeldre,
    harMidlertidigOmsorg,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();
    return (
        <IconBox
            color={getUttaksperiodeFarge(konto, forelder, erFarEllerMedmor, harMidlertidigOmsorg)}
            stripes={gradert}
        >
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg)}
            />
        </IconBox>
    );
};

const getKontoFarge = (konto: KontoTypeUttak_fpoversikt, erFarEllerMedmor: boolean): PeriodColor => {
    switch (konto) {
        case 'FEDREKVOTE':
        case 'AKTIVITETSFRI_KVOTE':
            return erFarEllerMedmor ? PeriodColor.GREEN : PeriodColor.LIGHTGREEN;
        case 'FORELDREPENGER_FØR_FØDSEL':
        case 'MØDREKVOTE':
            return erFarEllerMedmor ? PeriodColor.LIGHTBLUE : PeriodColor.BLUE;
        case 'FORELDREPENGER':
            return erFarEllerMedmor ? PeriodColor.GREEN : PeriodColor.BLUE;
        case 'FELLESPERIODE':
            return erFarEllerMedmor ? PeriodColor.LIGHTBLUEGREEN : PeriodColor.LIGHTGREENBLUE;
        default:
            return PeriodColor.NONE;
    }
};

const getUttaksperiodeFarge = (
    konto: KontoTypeUttak_fpoversikt,
    forelder: BrukerRolleSak_fpoversikt | undefined,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
): PeriodColor => {
    if (harMidlertidigOmsorg) {
        return erFarEllerMedmor ? PeriodColor.GREEN : PeriodColor.BLUE;
    }

    if (forelder === undefined) {
        return getKontoFarge(konto, erFarEllerMedmor);
    }
    return getForelderFarge(forelder, erFarEllerMedmor);
};

const getForelderFarge = (forelder: BrukerRolleSak_fpoversikt, erFarEllerMedmor: boolean): PeriodColor => {
    if (forelder === 'MOR') {
        return erFarEllerMedmor ? PeriodColor.LIGHTBLUE : PeriodColor.BLUE;
    }
    return erFarEllerMedmor ? PeriodColor.GREEN : PeriodColor.LIGHTGREEN;
};

// Duplikat til bruk i denne pakka som skal slettast
export enum PeriodColor {
    NONE = 'NONE',
    PINK = 'PINK',
    PURPLE = 'PURPLE',
    LIGHTBLUE = 'LIGHTBLUE',
    BLUE = 'BLUE',
    DARKBLUE = 'DARKBLUE',
    GREEN = 'GREEN',
    LIGHTGREEN = 'LIGHTGREEN',
    GRAY = 'GRAY',
    BLACK = 'BLACK',
    BLACKOUTLINE = 'BLACKOUTLINE',
    LIGHTBLUEGREEN = 'LIGHTBLUEGREEN',
    LIGHTGREENBLUE = 'LIGHTGREENBLUE',
    GREENSTRIPED = 'GREENSTRIPED',
    BLUESTRIPED = 'BLUESTRIPED',
    GREENOUTLINE = 'GREENOUTLINE',
    BLUEOUTLINE = 'BLUEOUTLINE',
}

export const getUtsettelseFarge = (forelder: BrukerRolleSak_fpoversikt): PeriodColor => {
    return forelder === 'FAR_MEDMOR' ? PeriodColor.GREENOUTLINE : PeriodColor.BLUEOUTLINE;
};

// eslint-disable-next-line import/no-default-export
export default StønadskontoIkon;
