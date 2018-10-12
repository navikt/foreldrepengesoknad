import moment from 'moment';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import {
    TilgjengeligStønadskonto,
    Uttaksperiode,
    Periodetype,
    StønadskontoType,
    Periode,
    UttaksperiodeBase
} from '../../../types/uttaksplan/periodetyper';
import { Uttaksdagen } from '../Uttaksdagen';
import { Forelder } from 'common/types';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode, Tidsperioden } from '../Tidsperioden';
import { sorterPerioder } from '../Periodene';
import { DateValue } from '../../../types/common';

const ANTALL_DAGER_FORBEHOLDT_MOR_ETTER_FØDSEL = 30;

const ikkeDeltUttakAdopsjonFarMedmor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue
) => {
    famDato = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
    const perioder: Uttaksperiode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.FARMEDMOR,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(famDato, foreldrepengerKonto.dager),
            vedlegg: [],
            ønskerSamtidigUttak: false
        }
    ];
    return perioder;
};

const ikkeDeltUttakAdopsjonMor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue
) => {
    famDato = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
    const perioder: Uttaksperiode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(famDato, foreldrepengerKonto.dager),
            vedlegg: [],
            ønskerSamtidigUttak: false
        }
    ];
    return perioder;
};

const ikkeDeltUttakAdopsjon = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakAdopsjonMor(famDato, foreldrepengerKonto, startdatoPermisjon);
    } else {
        return ikkeDeltUttakAdopsjonFarMedmor(famDato, foreldrepengerKonto, startdatoPermisjon);
    }
};

const ikkeDeltUttakFødselMor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue,
    foreldrePengerFørFødselKonto: TilgjengeligStønadskonto
) => {
    famDato = Uttaksdagen(famDato).denneEllerNeste();
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = startdatoPermisjon ? true : false;

    if (foreldrePengerFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && startdatoPermisjon) {
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(famDato);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(famDato).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.MOR,
                konto: StønadskontoType.Foreldrepenger,
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
            konto: foreldrePengerFørFødselKonto.konto,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(famDato).forrige()
            },
            vedlegg: [],
            ønskerSamtidigUttak: false
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
            vedlegg: [],
            ønskerSamtidigUttak: false
        };

        perioder.push(periodeFørFødsel);
    }

    const ekstraPermisjonFørFødsel = perioder.find(
        (p: UttaksperiodeBase) => p.konto === StønadskontoType.Foreldrepenger
    );

    const antallDagerIForeldrepenger = ekstraPermisjonFørFødsel
        ? getTidsperiode(
              famDato,
              foreldrepengerKonto.dager - Tidsperioden(ekstraPermisjonFørFødsel.tidsperiode).getAntallUttaksdager()
          )
        : getTidsperiode(famDato, foreldrepengerKonto.dager);

    const foreldrepengerPeriode: Periode = {
        id: guid(),
        type: Periodetype.Uttak,
        forelder: Forelder.MOR,
        konto: foreldrepengerKonto.konto,
        tidsperiode: antallDagerIForeldrepenger,
        vedlegg: [],
        ønskerSamtidigUttak: false
    };

    perioder.push(foreldrepengerPeriode);

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødselFarMedmor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue
) => {
    const startDato = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
    const trekkDagerEtterDenneDatoen = Uttaksdagen(Uttaksdagen(famDato).denneEllerNeste()).leggTil(
        ANTALL_DAGER_FORBEHOLDT_MOR_ETTER_FØDSEL - 1
    );

    let oppbrukteDagerPgaSenSøknad = 0;

    if (startDato && moment(trekkDagerEtterDenneDatoen).isBefore(startDato, 'day')) {
        oppbrukteDagerPgaSenSøknad = Uttaksdagen(trekkDagerEtterDenneDatoen).getUttaksdagerFremTilDato(startDato);
    }

    const perioder: Periode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.FARMEDMOR,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(startDato, foreldrepengerKonto.dager - oppbrukteDagerPgaSenSøknad),
            vedlegg: [],
            ønskerSamtidigUttak: false
        }
    ];
    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødsel = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue,
    foreldrePengerFørFødselKonto: TilgjengeligStønadskonto | undefined
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakFødselMor(famDato, foreldrepengerKonto, startdatoPermisjon, foreldrePengerFørFødselKonto!);
    } else {
        return ikkeDeltUttakFødselFarMedmor(famDato, foreldrepengerKonto, startdatoPermisjon);
    }
};

export const ikkeDeltUttak = (
    situasjon: Søkersituasjon,
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: DateValue
) => {
    const foreldrepengerKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Foreldrepenger
    );
    const foreldrePengerFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel
    );

    if (situasjon === Søkersituasjon.ADOPSJON) {
        return ikkeDeltUttakAdopsjon(famDato, erFarEllerMedmor, foreldrepengerKonto!, startdatoPermisjon);
    }

    if (situasjon === Søkersituasjon.FØDSEL) {
        return ikkeDeltUttakFødsel(
            famDato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            startdatoPermisjon,
            foreldrePengerFørFødselKonto
        );
    }

    return [];
};
