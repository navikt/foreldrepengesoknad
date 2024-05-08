import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import generatePDF, { Margin, Options, Resolution } from 'react-to-pdf';

import { Button } from '@navikt/ds-react';

import {
    Barn,
    Forelder,
    Overføringsperiode,
    Periode,
    PeriodeInfoType,
    PeriodeUtenUttak,
    Periodetype,
    Utsettelsesperiode,
    Uttaksdagen,
    Uttaksperiode,
    getAnnenForelderSamtidigUttakPeriode,
    getFamiliehendelsedato,
    isForeldrepengerFørFødselUttaksperiode,
    isFødtBarn,
    isInfoPeriode,
    isUfødtBarn,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '@navikt/fp-common';
import { PeriodeColor } from '@navikt/fp-constants';
import { dateToISOString } from '@navikt/fp-formik';
import { Calendar } from '@navikt/fp-ui';

import { getIndexOfSistePeriodeFørDato } from './../../components/periodeliste/Periodeliste';
import { getForelderFarge, getStønadskontoFarge } from './../../utils/styleUtils';
import UttaksplanLegend from './UttaksplanLegend';

interface Props {
    uttaksplan: Periode[];
    erFarEllerMedmor: boolean;
    barn: Barn;
    navnAnnenPart: string;
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
    if (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin) {
        return PeriodeColor.ORANGE;
    }
    return getStønadskontoFarge(periode.konto, periode.forelder, erFarEllerMedmor);
};

const getKalenderFargeForPeriodeUtenUttak = (periode: PeriodeUtenUttak, barn: Barn): PeriodeColor => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFødsel = isFødtBarn(barn) || isUfødtBarn(barn);
    const treUkerFørFamhendelse = dayjs(familiehendelsesdato).subtract(3, 'weeks');
    if (erFødsel && dayjs(periode.tidsperiode.tom).isBetween(familiehendelsesdato, treUkerFørFamhendelse, 'd')) {
        return PeriodeColor.ORANGE;
    }
    return PeriodeColor.NONE;
};

const getKalenderFargeForInfoperiode = (
    infoType: PeriodeInfoType,
    forelder: Forelder,
    erFarEllerMedmor: boolean,
): PeriodeColor => {
    switch (infoType) {
        case PeriodeInfoType.utsettelseAnnenPart:
            return erFarEllerMedmor ? PeriodeColor.BLUEOUTLINE : PeriodeColor.GREENOUTLINE;
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
    barn: Barn,
): PeriodeColor => {
    switch (periode.type) {
        case Periodetype.Utsettelse:
            return periode.forelder === Forelder.farMedmor ? PeriodeColor.GREENOUTLINE : PeriodeColor.BLUEOUTLINE;
        case Periodetype.PeriodeUtenUttak:
            return getKalenderFargeForPeriodeUtenUttak(periode, barn);
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

const UttaksplanKalender: FunctionComponent<Props> = ({ uttaksplan, erFarEllerMedmor, barn, navnAnnenPart }) => {
    const perioderForVisning = uttaksplan.filter((p) => !isInfoPeriode(p) || p.visPeriodeIPlan);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const periods = perioderForVisning.map((p) => ({
        fom: dayjs(p.tidsperiode.fom).isSame(dayjs(familiehendelsesdato), 'd')
            ? Uttaksdagen(p.tidsperiode.fom).neste().toDateString()
            : dateToISOString(p.tidsperiode.fom),
        tom: dateToISOString(p.tidsperiode.tom),
        color: getKalenderFargeForPeriodeType(p, erFarEllerMedmor, uttaksplan, barn),
    }));

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(uttaksplan, new Date(familiehendelsesdato)) || 0;
    periods.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: PeriodeColor.PINK,
    });

    const unikePeriodColors = [...new Set(periods.map((period) => period.color))];
    const utsettelser = uttaksplan.filter((p) => isUtsettelsesperiode(p)) as Utsettelsesperiode[];
    const unikeUtsettelseÅrsaker = [...new Set(utsettelser.map((u) => u.årsak))];

    const pdfOptionsSave = {
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } as Options;
    const getTargetElement = () => document.getElementById('print-content');

    return (
        <>
            <div id="print-content">
                <UttaksplanLegend
                    uniqueColors={unikePeriodColors}
                    barn={barn}
                    navnAnnenPart={navnAnnenPart}
                    unikeUtsettelseÅrsaker={unikeUtsettelseÅrsaker}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
                <Calendar periods={periods} />
            </div>
            <Button
                variant="tertiary"
                icon={<DownloadIcon />}
                onClick={() => generatePDF(getTargetElement, pdfOptionsSave)}
            >
                Last ned kalender
            </Button>
        </>
    );
};

export default UttaksplanKalender;
