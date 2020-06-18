import { Søkersituasjon } from '../../../types/søknad/Søknad';
import {
    TilgjengeligStønadskonto,
    Uttaksperiode,
    Periodetype,
    StønadskontoType,
    Periode,
    UttaksperiodeBase,
} from '../../../types/uttaksplan/periodetyper';
import { Uttaksdagen } from '../Uttaksdagen';
import { Forelder } from 'common/types';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode, Tidsperioden } from '../Tidsperioden';
import { sorterPerioder } from '../Periodene';
import { DateValue } from '../../../types/common';

const ikkeDeltUttakAdopsjonFarMedmor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: TilgjengeligStønadskonto | undefined
) => {
    const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
    const perioder: Uttaksperiode[] = [];

    if (erMorUfør !== true) {
        const periode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(førsteUttaksdag, foreldrepengerKonto.dager),
            vedlegg: [],
            ønskerSamtidigUttak: false,
            gradert: false,
        };

        perioder.push(periode);
    } else {
        const aktivitetsFriPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.AktivitetsfriKvote,
            tidsperiode: getTidsperiode(førsteUttaksdag, aktivitetsfriKvote!.dager),
            vedlegg: [],
            ønskerSamtidigUttak: false,
            gradert: false,
            harIkkeAktivitetskrav: true,
        };

        perioder.push(aktivitetsFriPeriode);

        const aktivitetskravPeriode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Foreldrepenger,
            tidsperiode: getTidsperiode(
                Uttaksdagen(aktivitetsFriPeriode.tidsperiode.tom).neste(),
                foreldrepengerKonto.dager
            ),
            vedlegg: [],
            ønskerSamtidigUttak: false,
            gradert: false,
        };

        perioder.push(aktivitetskravPeriode);
    }

    return perioder;
};

const ikkeDeltUttakAdopsjonMor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue
) => {
    const førsteUttaksdag = Uttaksdagen(startdatoPermisjon || famDato).denneEllerNeste();
    const perioder: Uttaksperiode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(førsteUttaksdag, foreldrepengerKonto.dager),
            vedlegg: [],
            ønskerSamtidigUttak: false,
            gradert: false,
        },
    ];
    return perioder;
};

const ikkeDeltUttakAdopsjon = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue,
    erMorUfør: boolean | undefined,
    aktivitetsfriKvote: TilgjengeligStønadskonto | undefined
) => {
    if (!erFarEllerMedmor) {
        return ikkeDeltUttakAdopsjonMor(famDato, foreldrepengerKonto, startdatoPermisjon);
    } else {
        return ikkeDeltUttakAdopsjonFarMedmor(
            famDato,
            foreldrepengerKonto,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote
        );
    }
};

const ikkeDeltUttakFødselMor = (
    famDato: Date,
    foreldrepengerKonto: TilgjengeligStønadskonto,
    startdatoPermisjon: DateValue,
    foreldrePengerFørFødselKonto: TilgjengeligStønadskonto
) => {
    const førsteUttaksdag = Uttaksdagen(famDato).denneEllerNeste();
    const perioder: Periode[] = [];
    const skalHaForeldrePengerFørFødsel = startdatoPermisjon ? true : false;

    if (foreldrePengerFørFødselKonto !== undefined && skalHaForeldrePengerFørFødsel && startdatoPermisjon) {
        const dagerFørFødsel = Uttaksdagen(startdatoPermisjon).getUttaksdagerFremTilDato(førsteUttaksdag);
        const merEnnTreUkerPermisjonFørFødsel = dagerFørFødsel > 15;
        const startdatoFpFørFødsel = Uttaksdagen(førsteUttaksdag).trekkFra(
            merEnnTreUkerPermisjonFørFødsel ? 15 : dagerFørFødsel
        );

        if (merEnnTreUkerPermisjonFørFødsel) {
            const ekstraPeriodeFørFødsel: Periode = {
                id: guid(),
                type: Periodetype.Uttak,
                forelder: Forelder.mor,
                konto: StønadskontoType.Foreldrepenger,
                tidsperiode: getTidsperiode(startdatoPermisjon, dagerFørFødsel - 15),
                vedlegg: [],
                ønskerSamtidigUttak: false,
            };

            perioder.push(ekstraPeriodeFørFødsel);
        }

        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: foreldrePengerFørFødselKonto.konto,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(førsteUttaksdag).forrige(),
            },
            vedlegg: [],
            ønskerSamtidigUttak: false,
        };

        perioder.push(periodeFørFødsel);
    } else {
        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.mor,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            skalIkkeHaUttakFørTermin: true,
            tidsperiode: {} as any,
            vedlegg: [],
            ønskerSamtidigUttak: false,
        };

        perioder.push(periodeFørFødsel);
    }

    const ekstraPermisjonFørFødsel = perioder.find(
        (p: UttaksperiodeBase) => p.konto === StønadskontoType.Foreldrepenger
    );

    const antallDagerIForeldrepenger = ekstraPermisjonFørFødsel
        ? getTidsperiode(
              førsteUttaksdag,
              foreldrepengerKonto.dager - Tidsperioden(ekstraPermisjonFørFødsel.tidsperiode).getAntallUttaksdager()
          )
        : getTidsperiode(førsteUttaksdag, foreldrepengerKonto.dager);

    const foreldrepengerPeriode: Periode = {
        id: guid(),
        type: Periodetype.Uttak,
        forelder: Forelder.mor,
        konto: foreldrepengerKonto.konto,
        tidsperiode: antallDagerIForeldrepenger,
        vedlegg: [],
        ønskerSamtidigUttak: false,
        gradert: false,
    };

    perioder.push(foreldrepengerPeriode);

    return perioder.sort(sorterPerioder);
};

const ikkeDeltUttakFødselFarMedmor = () => {
    return [];
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
        return ikkeDeltUttakFødselFarMedmor();
    }
};

export const ikkeDeltUttak = (
    situasjon: Søkersituasjon,
    famDato: Date,
    erFarEllerMedmor: boolean,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    startdatoPermisjon: DateValue,
    erMorUfør: boolean | undefined
) => {
    const foreldrepengerKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Foreldrepenger
    );
    const foreldrePengerFørFødselKonto = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    const aktivitetsfriKvote = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.AktivitetsfriKvote
    );

    if (situasjon === Søkersituasjon.ADOPSJON) {
        return ikkeDeltUttakAdopsjon(
            famDato,
            erFarEllerMedmor,
            foreldrepengerKonto!,
            startdatoPermisjon,
            erMorUfør,
            aktivitetsfriKvote
        );
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
