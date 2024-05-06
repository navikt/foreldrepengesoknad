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
    Periodetype,
    Uttaksdagen,
    Uttaksperiode,
    getAnnenForelderSamtidigUttakPeriode,
    getFamiliehendelsedato,
    isInfoPeriode,
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

const UttaksplanKalender: FunctionComponent<Props> = ({ uttaksplan, erFarEllerMedmor, barn, navnAnnenPart }) => {
    const perioderForVisning = uttaksplan.filter((p) => !isInfoPeriode(p) || p.visPeriodeIPlan);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const periods = perioderForVisning.map((p) => ({
        fom: dayjs(p.tidsperiode.fom).isSame(dayjs(familiehendelsesdato), 'd')
            ? Uttaksdagen(p.tidsperiode.fom).neste().toDateString()
            : dateToISOString(p.tidsperiode.fom),
        tom: dateToISOString(p.tidsperiode.tom),
        color: getKalenderFargeForPeriodeType(p, erFarEllerMedmor, uttaksplan),
    }));

    const indexOfFamiliehendelse = getIndexOfSistePeriodeFørDato(uttaksplan, new Date(familiehendelsesdato)) || 0;
    periods.splice(indexOfFamiliehendelse, 0, {
        fom: familiehendelsesdato,
        tom: familiehendelsesdato,
        color: PeriodeColor.PINK,
    });

    const uniquePeriodColors = [...new Set(periods.map((period) => period.color))];

    const pdfOptionsSave = {
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } as Options;
    const getTargetElement = () => document.getElementById('content-id');

    return (
        <>
            <div id="content-id">
                <UttaksplanLegend uniqueColors={uniquePeriodColors} barn={barn} navnAnnenPart={navnAnnenPart} />
            </div>
            <div id="content-id">
                <Calendar periods={periods} />
            </div>
            <Button
                variant="secondary"
                icon={<DownloadIcon />}
                onClick={() => generatePDF(getTargetElement, pdfOptionsSave)}
            >
                Last ned kalender
            </Button>
        </>
    );
};

export default UttaksplanKalender;
