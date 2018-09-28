import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { TilgjengeligStønadskonto, Uttaksperiode, Periodetype } from '../../../types/uttaksplan/periodetyper';
import { normaliserDato } from 'common/util/datoUtils';
import { Uttaksdagen } from '../Uttaksdagen';
import { Forelder } from 'common/types';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode } from '../Tidsperioden';

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

const ikkeDeltUttakFødsel = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: TilgjengeligStønadskonto
) => {
    return [];
};

export const ikkeDeltUttak = (
    situasjon: Søkersituasjon,
    famDato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: Date | undefined
) => {
    if (situasjon === Søkersituasjon.ADOPSJON) {
        return ikkeDeltUttakAdopsjon(famDato, erFarEllerMedmor, foreldrepengerKonto, startdatoPermisjon);
    }

    if (situasjon === Søkersituasjon.FØDSEL) {
        return ikkeDeltUttakFødsel(famDato, erFarEllerMedmor, foreldrepengerKonto);
    }

    return [];
};
