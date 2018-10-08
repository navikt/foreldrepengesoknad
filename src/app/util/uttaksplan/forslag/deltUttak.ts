import { Søkersituasjon } from '../../../types/søknad/Søknad';
import {
    TilgjengeligStønadskonto,
    Periode,
    StønadskontoType,
    Periodetype,
    UttaksperiodeBase
} from '../../../types/uttaksplan/periodetyper';
import { normaliserDato } from 'common/util/datoUtils';
import { Uttaksdagen } from '../Uttaksdagen';
import { guid } from 'nav-frontend-js-utils';
import { Forelder } from 'common/types';
import { getTidsperiode, Tidsperioden } from '../Tidsperioden';
import { sorterPerioder } from '../Periodene';

const deltUttakAdopsjonMor = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined
): Periode[] => {
    const familiehendelsedato = normaliserDato(Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste());
    const perioder: Periode[] = [];
    const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Mødrekvote
    );
    let currentTomDate: Date = familiehendelsedato;

    if (mkKonto !== undefined) {
        const periodeMødrekvote: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getTidsperiode(currentTomDate, mkKonto.dager)
        };

        currentTomDate = Uttaksdagen(currentTomDate).leggTil(mkKonto.dager);

        perioder.push(periodeMødrekvote);
    }

    if (fellesperiodeukerMor !== undefined && fellesperiodeukerMor > 0) {
        const periodeFellesperiodeMor: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: getTidsperiode(Uttaksdagen(currentTomDate).neste(), fellesperiodeukerMor * 5)
        };

        perioder.push(periodeFellesperiodeMor);
    }

    return perioder.sort(sorterPerioder);
};

const deltUttakAdopsjonFarMedmor = () => {
    return [];
};

const deltUttakAdopsjon = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined
) => {
    if (!erFarEllerMedmor) {
        return deltUttakAdopsjonMor(famDato, tilgjengeligeStønadskontoer, startdatoPermisjon, fellesperiodeukerMor);
    } else {
        return deltUttakAdopsjonFarMedmor();
    }
};

const deltUttakFødselMor = (
    famDato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined
): Periode[] => {
    const familiehendelsedato = normaliserDato(Uttaksdagen(famDato).denneEllerNeste());
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = startdatoPermisjon ? true : false;
    const fpFørFødselKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Mødrekvote
    );
    let currentTomDate: Date = familiehendelsedato;

    if (fpFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && startdatoPermisjon) {
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(currentTomDate);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(famDato).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.MOR,
                konto: StønadskontoType.Fellesperiode,
                tidsperiode: {
                    fom: startdatoPermisjon,
                    tom: Uttaksdagen(startdatoPermisjon).leggTil(dagerFørFødsel - 16)
                },
                vedlegg: [],
                ønskerSamtidigUttak: false
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
            tidsperiode: getTidsperiode(currentTomDate, mkKonto.dager)
        };

        currentTomDate = Uttaksdagen(currentTomDate).leggTil(mkKonto.dager);

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

        const periodeFellesperiodeMor: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: getTidsperiode(
                Uttaksdagen(currentTomDate).denneEllerNeste(),
                fellesperiodeukerMor * 5 - trekkEkstraPermisjonDager
            )
        };

        perioder.push(periodeFellesperiodeMor);
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
    startdatoPermisjon: Date | undefined,
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
    startdatoPermisjon: Date | undefined,
    fellesperiodeukerMor: number | undefined
) => {
    if (situasjon === Søkersituasjon.ADOPSJON) {
        return deltUttakAdopsjon(
            famDato,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            startdatoPermisjon,
            fellesperiodeukerMor
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
