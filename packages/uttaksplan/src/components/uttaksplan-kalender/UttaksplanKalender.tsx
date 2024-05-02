import { FunctionComponent } from 'react';

import {
    Forelder,
    Overføringsperiode,
    Periode,
    PeriodeInfoType,
    Periodetype,
    Uttaksperiode,
    getAnnenForelderSamtidigUttakPeriode,
    isInfoPeriode,
    isUttaksperiode,
} from '@navikt/fp-common';
import { dateToISOString } from '@navikt/fp-formik';
import { Calendar, DayColor } from '@navikt/fp-ui';

import { getIndexOfSistePeriodeFørDato } from './../../components/periodeliste/Periodeliste';
import { UttaksplanColor } from './../../types/UttaksplanColor';
import { getForelderFarge, getStønadskontoFarge } from './../../utils/styleUtils';

interface Props {
    uttaksplan: Periode[];
    erFarEllerMedmor: boolean;
    familiehendelsesdato: string;
}

const mapUttaksplanFargeTilDayColor = (uttaksplanFarge: UttaksplanColor) => {
    switch (uttaksplanFarge) {
        case UttaksplanColor.blue:
            return DayColor.BLUE;
        case UttaksplanColor.lightBlue:
            return DayColor.LIGHTBLUE;
        case UttaksplanColor.green:
            return DayColor.DARKGREEN;
        case UttaksplanColor.lightGreen:
            return DayColor.GREEN;
        case UttaksplanColor.purple:
            return DayColor.PURPLE;
        default:
            return DayColor.NONE;
    }
};

const getKalenderFargeForUttaksperiode = (
    periode: Uttaksperiode | Overføringsperiode,
    uttaksplan: Periode[],
    erFarEllerMedmor: boolean,
): DayColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, uttaksplan)
        : undefined;
    if (annenForelderSamtidigUttaksperiode) {
        return erFarEllerMedmor ? DayColor.LIGHTBLUEDARKGREEN : DayColor.GREENBLUE;
    }
    if (isUttaksperiode(periode) && periode.gradert) {
        return erFarEllerMedmor ? DayColor.DARKGREENGREY : DayColor.BLUEGREY;
    }
    const uttaksplanFarge = getStønadskontoFarge(periode.konto, periode.forelder, erFarEllerMedmor);
    return mapUttaksplanFargeTilDayColor(uttaksplanFarge);
};

const getKalenderFargeForInfoperiode = (
    infoType: PeriodeInfoType,
    forelder: Forelder,
    erFarEllerMedmor: boolean,
): DayColor => {
    switch (infoType) {
        case PeriodeInfoType.utsettelseAnnenPart:
            return DayColor.PURPLE;
        case PeriodeInfoType.uttakAnnenPart:
            return mapUttaksplanFargeTilDayColor(getForelderFarge(forelder, erFarEllerMedmor));
        default:
            return DayColor.NONE;
    }
};

const getKalenderFargeForPeriodeType = (
    periode: Periode,
    erFarEllerMedmor: boolean,
    uttaksplan: Periode[],
): DayColor => {
    switch (periode.type) {
        case Periodetype.Utsettelse:
            return DayColor.PURPLE;
        case Periodetype.PeriodeUtenUttak:
            return DayColor.NONE;
        case Periodetype.Hull:
            return DayColor.ORANGE;
        case Periodetype.Overføring:
        case Periodetype.Uttak:
            return getKalenderFargeForUttaksperiode(periode, uttaksplan, erFarEllerMedmor);
        case Periodetype.Opphold:
            return mapUttaksplanFargeTilDayColor(getForelderFarge(periode.forelder, erFarEllerMedmor));
        case Periodetype.Info:
            return getKalenderFargeForInfoperiode(periode.infotype, periode.forelder, erFarEllerMedmor);
        default:
            return DayColor.NONE;
    }
};

const UttaksplanKalender: FunctionComponent<Props> = ({ uttaksplan, erFarEllerMedmor, familiehendelsesdato }) => {
    const perioderForVisning = uttaksplan.filter((p) => !isInfoPeriode(p) || p.visPeriodeIPlan);
    const periods = perioderForVisning.map((p) => ({
        fom: dateToISOString(p.tidsperiode.fom),
        tom: dateToISOString(p.tidsperiode.tom),
        color: getKalenderFargeForPeriodeType(p, erFarEllerMedmor, uttaksplan),
    }));

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(uttaksplan, new Date(familiehendelsesdato)) || 0;
    periods.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: DayColor.PINK,
    });

    return <Calendar periods={periods} />;
};

export default UttaksplanKalender;
