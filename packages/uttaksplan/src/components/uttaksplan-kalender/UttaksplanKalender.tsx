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
import { PeriodeColor } from '@navikt/fp-constants';
import { dateToISOString } from '@navikt/fp-formik';
import { Calendar } from '@navikt/fp-ui';

import { getIndexOfSistePeriodeFørDato } from './../../components/periodeliste/Periodeliste';
import { getForelderFarge, getStønadskontoFarge } from './../../utils/styleUtils';

interface Props {
    uttaksplan: Periode[];
    erFarEllerMedmor: boolean;
    familiehendelsesdato: string;
}

const getKalenderFargeForUttaksperiode = (
    periode: Uttaksperiode | Overføringsperiode,
    uttaksplan: Periode[],
    erFarEllerMedmor: boolean,
): PeriodeColor => {
    const annenForelderSamtidigUttaksperiode = isUttaksperiode(periode)
        ? getAnnenForelderSamtidigUttakPeriode(periode, uttaksplan)
        : undefined;
    if (annenForelderSamtidigUttaksperiode) {
        return erFarEllerMedmor ? PeriodeColor.LIGHTBLUEGREEN : PeriodeColor.LIGHTGREENBLUE;
    }
    if (!annenForelderSamtidigUttaksperiode && isUttaksperiode(periode) && periode.gradert) {
        return erFarEllerMedmor ? PeriodeColor.GREENSTRIPED : PeriodeColor.BLUESTRIPED;
    }
    return getStønadskontoFarge(periode.konto, periode.forelder, erFarEllerMedmor);
};

const getKalenderFargeForInfoperiode = (
    infoType: PeriodeInfoType,
    forelder: Forelder,
    erFarEllerMedmor: boolean,
): PeriodeColor => {
    switch (infoType) {
        case PeriodeInfoType.utsettelseAnnenPart:
            return PeriodeColor.PURPLE;
        case PeriodeInfoType.uttakAnnenPart:
            return getForelderFarge(forelder, erFarEllerMedmor);
        default:
            return PeriodeColor.NONE;
    }
};

const getKalenderFargeForPeriodeType = (
    periode: Periode,
    erFarEllerMedmor: boolean,
    uttaksplan: Periode[],
): PeriodeColor => {
    switch (periode.type) {
        case Periodetype.Utsettelse:
            return PeriodeColor.PURPLE;
        case Periodetype.PeriodeUtenUttak:
            return PeriodeColor.NONE;
        case Periodetype.Hull:
            return PeriodeColor.ORANGE;
        case Periodetype.Overføring:
        case Periodetype.Uttak:
            return getKalenderFargeForUttaksperiode(periode, uttaksplan, erFarEllerMedmor);
        case Periodetype.Opphold:
            return getForelderFarge(periode.forelder, erFarEllerMedmor);
        case Periodetype.Info:
            return getKalenderFargeForInfoperiode(periode.infotype, periode.forelder, erFarEllerMedmor);
        default:
            return PeriodeColor.NONE;
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
        color: PeriodeColor.PINK,
    });

    return <Calendar periods={periods} />;
};

export default UttaksplanKalender;
