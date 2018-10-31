import { Søkersituasjon } from '../../../types/søknad/Søknad';
import {
    TilgjengeligStønadskonto,
    Periode,
    StønadskontoType,
    Periodetype,
    UttaksperiodeBase
} from '../../../types/uttaksplan/periodetyper';
import { Uttaksdagen } from '../Uttaksdagen';
import { guid } from 'nav-frontend-js-utils';
import { Forelder } from 'common/types';
import { getTidsperiode, Tidsperioden } from '../Tidsperioden';
import { sorterPerioder } from '../Periodene';
import { DateValue } from '../../../types/common';

const deltUttakAdopsjonMor = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: DateValue,
    fellesperiodeukerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined
): Periode[] => {
    if (harAnnenForelderSøktFP !== true) {
        const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
        const perioder: Periode[] = [];
        const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
            (konto) => konto.konto === StønadskontoType.Mødrekvote
        );
        let currentTomDate: Date = førsteUttaksdag;

        if (mkKonto !== undefined) {
            const periodeMødrekvote: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.MOR,
                konto: StønadskontoType.Mødrekvote,
                tidsperiode: getTidsperiode(currentTomDate, mkKonto.dager),
                ønskerSamtidigUttak: false,
                gradert: false
            };

            currentTomDate = Uttaksdagen(periodeMødrekvote.tidsperiode.tom).neste();

            perioder.push(periodeMødrekvote);
        }

        if (fellesperiodeukerMor !== undefined && fellesperiodeukerMor > 0) {
            const periodeFellesperiodeMor: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.MOR,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(currentTomDate, fellesperiodeukerMor * 5),
                ønskerSamtidigUttak: false,
                gradert: false
            };

            perioder.push(periodeFellesperiodeMor);
        }

        return perioder.sort(sorterPerioder);
    } else {
        return [];
    }
};

const deltUttakAdopsjonFarMedmor = () => {
    return [];
};

const deltUttakAdopsjon = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: DateValue,
    fellesperiodeukerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined
) => {
    if (!erFarEllerMedmor) {
        return deltUttakAdopsjonMor(
            famDato,
            tilgjengeligeStønadskontoer,
            startdatoPermisjon,
            fellesperiodeukerMor,
            harAnnenForelderSøktFP
        );
    } else {
        return deltUttakAdopsjonFarMedmor();
    }
};

const deltUttakFødselMor = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    ønsketStartdatoPermisjon: DateValue,
    fellesperiodeukerMor: number | undefined
): Periode[] => {
    const førsteUttaksdag = Uttaksdagen(famDato).denneEllerNeste();
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = ønsketStartdatoPermisjon ? true : false;
    const fpFørFødselKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Mødrekvote
    );
    let currentTomDate: Date = førsteUttaksdag;
    if (fpFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && ønsketStartdatoPermisjon) {
        const startdatoPermisjon = Uttaksdagen(ønsketStartdatoPermisjon).denneEllerNeste();
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(currentTomDate);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.MOR,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(startdatoPermisjon, dagerFørFødsel - 15),
                vedlegg: []
            };

            perioder.push(ekstraPeriodeFørFødsel);
        }

        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(currentTomDate).forrige()
            }
        };

        perioder.push(periodeFørFødsel);
    } else {
        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            skalIkkeHaUttakFørTermin: true,
            tidsperiode: {} as any,
            vedlegg: []
        };
        perioder.push(periodeFørFødsel);
    }

    if (mkKonto !== undefined) {
        const periodeMødrekvote: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getTidsperiode(currentTomDate, mkKonto.dager),
            ønskerSamtidigUttak: false,
            gradert: false
        };

        currentTomDate = Uttaksdagen(periodeMødrekvote.tidsperiode.tom).neste();

        perioder.push(periodeMødrekvote);
    }

    if (fellesperiodeukerMor !== undefined && fellesperiodeukerMor > 0) {
        const ekstraPermisjonFørFødsel = perioder.find(
            (p: UttaksperiodeBase) => p.konto === StønadskontoType.Fellesperiode
        );

        let trekkEkstraPermisjonDager = 0;
        if (ekstraPermisjonFørFødsel) {
            trekkEkstraPermisjonDager = Tidsperioden(ekstraPermisjonFørFødsel.tidsperiode).getAntallUttaksdager();
        }

        if (fellesperiodeukerMor * 5 - trekkEkstraPermisjonDager > 0) {
            const periodeFellesperiodeMor: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.MOR,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: getTidsperiode(currentTomDate, fellesperiodeukerMor * 5 - trekkEkstraPermisjonDager),
                ønskerSamtidigUttak: false,
                gradert: false
            };

            perioder.push(periodeFellesperiodeMor);
        }
    }

    return perioder.sort(sorterPerioder);
};

const deltUttakFødselFarMedmor = () => {
    return [];
};

const deltUttakFødsel = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: DateValue,
    fellesperiodeukerMor: number | undefined
) => {
    if (!erFarEllerMedmor) {
        return deltUttakFødselMor(famDato, tilgjengeligeStønadskontoer, startdatoPermisjon, fellesperiodeukerMor);
    } else {
        return deltUttakFødselFarMedmor();
    }
};

export const deltUttak = (
    situasjon: Søkersituasjon,
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: DateValue,
    fellesperiodeukerMor: number | undefined,
    harAnnenForelderSøktFP: boolean | undefined
) => {
    if (situasjon === Søkersituasjon.ADOPSJON) {
        return deltUttakAdopsjon(
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdatoPermisjon,
            fellesperiodeukerMor,
            harAnnenForelderSøktFP
        );
    }

    if (situasjon === Søkersituasjon.FØDSEL) {
        return deltUttakFødsel(
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdatoPermisjon,
            fellesperiodeukerMor
        );
    }

    return [];
};
