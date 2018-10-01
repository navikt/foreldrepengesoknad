import { Søkersituasjon } from '../../../types/søknad/Søknad';
import {
    TilgjengeligStønadskonto,
    Uttaksperiode,
    Periodetype,
    StønadskontoType,
    Periode
} from '../../../types/uttaksplan/periodetyper';
import { normaliserDato } from 'common/util/datoUtils';
import { Uttaksdagen } from '../Uttaksdagen';
import { Forelder } from 'common/types';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode } from '../Tidsperioden';
import { sorterPerioder } from '../Periodene';

const ikkeDeltUttakAdopsjonFarMedmor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined
) => {
    famDato = normaliserDato(Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste());
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
    startdatoPermisjon: Date | undefined
) => {
    famDato = normaliserDato(Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste());
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
    startdatoPermisjon: Date | undefined
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
    startdatoPermisjon: Date | undefined,
    foreldrePengerFørFødselKonto: TilgjengeligStønadskonto
) => {
    famDato = normaliserDato(Uttaksdagen(famDato).denneEllerNeste());
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = startdatoPermisjon ? true : false;

    if (foreldrePengerFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && startdatoPermisjon) {
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(famDato);
        const startdatoFpFørFødsel = Uttaksdagen(famDato).trekkFra(dagerFørFødsel);

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
            konto: foreldrePengerFørFødselKonto.konto,
            tidsperiode: {} as any,
            vedlegg: [],
            ønskerSamtidigUttak: false
        };

        perioder.push(periodeFørFødsel);
    }

    if (foreldrepengerKonto !== undefined) {
        const foreldrepengerPeriode: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(famDato, foreldrepengerKonto.dager),
            vedlegg: [],
            ønskerSamtidigUttak: false
        };

        perioder.push(foreldrepengerPeriode);
    }

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødselFarMedmor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined
) => {
    const startDato = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();

    const perioder: Periode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.FARMEDMOR,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(startDato, foreldrepengerKonto.dager),
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
    startdatoPermisjon: Date | undefined,
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
    startdatoPermisjon: Date | undefined
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
